import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { ROUTES } from "@/lib/constants";

const emailSchema = z.string().email("Please enter a valid email address");
const passwordSchema = z.string().min(6, "Password must be at least 6 characters");

export function useAuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate(ROUTES.COMMUNITY);
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
          // Supabase returns generic error strings rather than error codes for
          // auth failures. We string-match known messages to provide actionable,
          // user-friendly feedback instead of exposing raw backend errors.
          if (error.message.includes("Invalid login credentials")) {
            toast({ title: "Login failed", description: "Invalid email or password. Please try again.", variant: "destructive" });
          } else if (error.message.includes("Email not confirmed")) {
            toast({ title: "Email not verified", description: "Please check your email and click the confirmation link.", variant: "destructive" });
          } else {
            throw error;
          }
          return;
        }

        toast({ title: "Welcome back!", description: "You've successfully signed in." });
        navigate(ROUTES.COMMUNITY);
      } else {
        // emailRedirectTo tells the auth service where to send users after they
        // click the email confirmation link. Without this, the confirmation flow
        // would drop users on a default page instead of returning them to our app.
        const redirectUrl = `${window.location.origin}${ROUTES.COMMUNITY}`;

        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: redirectUrl,
            data: { display_name: displayName || undefined },
          },
        });

        if (error) {
          if (error.message.includes("User already registered")) {
            toast({ title: "Account exists", description: "An account with this email already exists. Try signing in instead.", variant: "destructive" });
          } else {
            throw error;
          }
          return;
        }

        toast({ title: "Check your email", description: "We've sent you a confirmation link to verify your account." });
      }
    } catch (error: any) {
      toast({ title: "Something went wrong", description: error.message || "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });

      if (error) {
        toast({ title: "Google sign-in failed", description: error.message || "Please try again.", variant: "destructive" });
      }
    } catch (error: any) {
      toast({ title: "Something went wrong", description: error.message || "Please try again later.", variant: "destructive" });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
  };

  const clearEmailError = () => {
    if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const clearPasswordError = () => {
    if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }));
  };

  return {
    isLogin,
    email,
    setEmail,
    password,
    setPassword,
    displayName,
    setDisplayName,
    showPassword,
    setShowPassword,
    isSubmitting,
    isGoogleLoading,
    errors,
    handleSubmit,
    handleGoogleSignIn,
    toggleMode,
    clearEmailError,
    clearPasswordError,
  };
}
