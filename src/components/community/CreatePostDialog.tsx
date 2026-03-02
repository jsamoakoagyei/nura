import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { postTitleSchema, postContentSchema } from "@/lib/validation";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string;
}

export function CreatePostDialog({ open, onOpenChange, categoryId }: CreatePostDialogProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({});

  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createPost = useMutation({
    mutationFn: async ({ sanitizedTitle, sanitizedContent }: { sanitizedTitle: string; sanitizedContent: string }) => {
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("forum_posts").insert({
        category_id: categoryId,
        user_id: user.id,
        title: sanitizedTitle,
        content: sanitizedContent,
        is_anonymous: isAnonymous,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      toast({
        title: "Post created!",
        description: "Your post has been published.",
      });
      queryClient.invalidateQueries({ queryKey: ["forum-posts", categoryId] });
      onOpenChange(false);
      setTitle("");
      setContent("");
      setIsAnonymous(false);
      setErrors({});
    },
    onError: (error: any) => {
      toast({
        title: "Error creating post",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const titleResult = postTitleSchema.safeParse(title);
    const contentResult = postContentSchema.safeParse(content);

    const newErrors: { title?: string; content?: string } = {};
    if (!titleResult.success) newErrors.title = titleResult.error.issues[0].message;
    if (!contentResult.success) newErrors.content = contentResult.error.issues[0].message;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    createPost.mutate({
      sanitizedTitle: titleResult.data!,
      sanitizedContent: contentResult.data!,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Create a post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="title">Title</Label>
              <span className="text-xs text-muted-foreground">{title.length}/200</span>
            </div>
            <Input
              id="title"
              placeholder="What's on your mind?"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              maxLength={200}
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Content</Label>
              <span className="text-xs text-muted-foreground">{content.length}/10,000</span>
            </div>
            <Textarea
              id="content"
              placeholder="Share your thoughts, questions, or experiences..."
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                if (errors.content) setErrors((prev) => ({ ...prev, content: undefined }));
              }}
              rows={6}
              maxLength={10000}
              className="resize-none"
            />
            {errors.content && (
              <p className="text-sm text-destructive">{errors.content}</p>
            )}
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="space-y-0.5">
              <Label htmlFor="anonymous">Post anonymously</Label>
              <p className="text-sm text-muted-foreground">
                Your name won't be shown
              </p>
            </div>
            <Switch
              id="anonymous"
              checked={isAnonymous}
              onCheckedChange={setIsAnonymous}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={createPost.isPending}>
              {createPost.isPending ? "Posting..." : "Post"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
