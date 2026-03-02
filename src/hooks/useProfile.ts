import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { displayNameSchema, validateAvatarFile, sanitizeText } from "@/lib/validation";

export function useProfile() {
  const [displayName, setDisplayName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [nameError, setNameError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("display_name, avatar_url")
          .eq("user_id", user.id)
          .single();

        // PGRST116 means "no rows found" — this is expected for brand-new users
        // who signed up but haven't set up a profile yet. We treat it as a
        // non-error and let them fill in the form from scratch.
        if (error && error.code !== "PGRST116") throw error;

        if (data) {
          setDisplayName(data.display_name || "");
          setAvatarUrl(data.avatar_url);
        }
      } catch (error: any) {
        if (import.meta.env.DEV) {
          console.error("Error fetching profile:", error.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (user) fetchProfile();
  }, [user]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const validationError = validateAvatarFile(file);
    if (validationError) {
      toast({ title: "Invalid file", description: validationError, variant: "destructive" });
      return;
    }

    setIsUploading(true);

    try {
      if (avatarUrl) {
        const oldPath = avatarUrl.split("/").slice(-2).join("/");
        await supabase.storage.from("avatars").remove([oldPath]);
      }

      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/avatar.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath);

      // Append a cache-busting timestamp so the CDN serves the freshly uploaded
      // image immediately. Without this, the CDN would return the cached
      // previous avatar until the cache TTL expires.
      const newAvatarUrl = `${urlData.publicUrl}?t=${Date.now()}`;

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: newAvatarUrl })
        .eq("user_id", user.id);

      if (updateError) throw updateError;

      setAvatarUrl(newAvatarUrl);
      toast({ title: "Avatar updated!", description: "Your profile picture has been changed." });
    } catch (error: any) {
      toast({ title: "Upload failed", description: error.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    if (displayName) {
      const result = displayNameSchema.safeParse(displayName);
      if (!result.success) {
        setNameError(result.error.issues[0].message);
        return;
      }
    }

    setNameError(null);
    setIsSaving(true);

    const sanitizedName = displayName ? sanitizeText(displayName) : null;

    try {
      // upsert with onConflict: "user_id" is used instead of a plain update
      // because the profile row may not exist yet — e.g. if the auth callback
      // that creates it (AuthContext) hasn't completed, or if the user was
      // created via an OAuth flow that skipped profile seeding.
      const { error } = await supabase
        .from("profiles")
        .upsert(
          { user_id: user.id, display_name: sanitizedName || null, avatar_url: avatarUrl },
          { onConflict: "user_id" }
        );

      if (error) throw error;

      toast({ title: "Profile saved!", description: "Your changes have been saved." });
    } catch (error: any) {
      toast({ title: "Save failed", description: error.message || "Please try again.", variant: "destructive" });
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    if (displayName) {
      return displayName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  return {
    displayName,
    setDisplayName,
    avatarUrl,
    isLoading,
    isSaving,
    isUploading,
    nameError,
    setNameError,
    fileInputRef,
    user,
    authLoading,
    handleAvatarClick,
    handleFileChange,
    handleSave,
    getInitials,
  };
}
