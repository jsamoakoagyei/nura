import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Drawer } from "vaul";
import { formatDistanceToNow } from "date-fns";
import { Heart, MessageCircle, User, Clock, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

interface PostDetailDrawerProps {
  postId: string | null;
  onClose: () => void;
}

interface Comment {
  id: string;
  content: string;
  is_anonymous: boolean;
  likes_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string | null;
  } | null;
}

export function PostDetailDrawer({ postId, onClose }: PostDetailDrawerProps) {
  const [newComment, setNewComment] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: ["forum-post", postId],
    queryFn: async () => {
      if (!postId) return null;
      
      const { data: postData, error } = await supabase
        .from("forum_posts")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) throw error;

      // Fetch profile if not anonymous
      let profile = null;
      if (!postData.is_anonymous) {
        const { data: profileData } = await supabase
          .from("profiles")
          .select("display_name")
          .eq("user_id", postData.user_id)
          .single();
        profile = profileData;
      }

      return { ...postData, profiles: profile };
    },
    enabled: !!postId,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: ["forum-comments", postId],
    queryFn: async () => {
      if (!postId) return [];
      
      const { data: commentsData, error } = await supabase
        .from("forum_comments")
        .select("*")
        .eq("post_id", postId)
        .eq("is_hidden", false)
        .order("created_at", { ascending: true });

      if (error) throw error;

      // Fetch profiles for non-anonymous comments
      const userIds = commentsData
        .filter((c) => !c.is_anonymous)
        .map((c) => c.user_id);

      let profilesMap: Record<string, { display_name: string | null }> = {};
      
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from("profiles")
          .select("user_id, display_name")
          .in("user_id", userIds);

        if (profilesData) {
          profilesMap = profilesData.reduce((acc, p) => {
            acc[p.user_id] = { display_name: p.display_name };
            return acc;
          }, {} as Record<string, { display_name: string | null }>);
        }
      }

      return commentsData.map((comment) => ({
        ...comment,
        profiles: profilesMap[comment.user_id] || null,
      })) as Comment[];
    },
    enabled: !!postId,
  });

  const { data: hasLiked } = useQuery({
    queryKey: ["forum-post-liked", postId, user?.id],
    queryFn: async () => {
      if (!postId || !user) return false;
      const { data } = await supabase
        .from("forum_post_likes")
        .select("id")
        .eq("post_id", postId)
        .eq("user_id", user.id)
        .single();
      return !!data;
    },
    enabled: !!postId && !!user,
  });

  const toggleLike = useMutation({
    mutationFn: async () => {
      if (!user || !postId) throw new Error("Not authenticated");

      if (hasLiked) {
        await supabase
          .from("forum_post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", user.id);
      } else {
        await supabase.from("forum_post_likes").insert({
          post_id: postId,
          user_id: user.id,
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum-post", postId] });
      queryClient.invalidateQueries({ queryKey: ["forum-post-liked", postId, user?.id] });
      queryClient.invalidateQueries({ queryKey: ["forum-posts"] });
    },
  });

  const addComment = useMutation({
    mutationFn: async () => {
      if (!user || !postId) throw new Error("Not authenticated");

      const { error } = await supabase.from("forum_comments").insert({
        post_id: postId,
        user_id: user.id,
        content: newComment.trim(),
        is_anonymous: isAnonymous,
      });

      if (error) throw error;
    },
    onSuccess: () => {
      setNewComment("");
      queryClient.invalidateQueries({ queryKey: ["forum-comments", postId] });
      queryClient.invalidateQueries({ queryKey: ["forum-post", postId] });
      queryClient.invalidateQueries({ queryKey: ["forum-posts"] });
      toast({
        title: "Comment added!",
        description: "Your comment has been posted.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add comment.",
        variant: "destructive",
      });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    if (!user) {
      window.location.href = "/auth";
      return;
    }
    
    addComment.mutate();
  };

  return (
    <Drawer.Root open={!!postId} onOpenChange={(open) => !open && onClose()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50" />
        <Drawer.Content className="bg-background flex flex-col fixed bottom-0 left-0 right-0 max-h-[90vh] rounded-t-3xl z-50">
          <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-muted my-4" />
          
          <div className="flex-1 overflow-y-auto px-6 pb-6">
            {postLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-32 w-full" />
              </div>
            ) : post ? (
              <>
                {/* Post Header */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <User className="w-4 h-4" />
                    <span>
                      {post.is_anonymous
                        ? "Anonymous"
                        : post.profiles?.display_name || "Member"}
                    </span>
                    <span>•</span>
                    <Clock className="w-3 h-3" />
                    <span>
                      {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                    </span>
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
                    {post.title}
                  </h2>
                  <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-4 py-4 border-y border-border">
                  <Button
                    variant={hasLiked ? "default" : "outline"}
                    size="sm"
                    onClick={() => {
                      if (!user) {
                        window.location.href = "/auth";
                        return;
                      }
                      toggleLike.mutate();
                    }}
                    className="gap-2"
                  >
                    <Heart className={`w-4 h-4 ${hasLiked ? "fill-current" : ""}`} />
                    {post.likes_count}
                  </Button>
                  <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <MessageCircle className="w-4 h-4" />
                    {post.comments_count} comments
                  </span>
                </div>

                {/* Comments Section */}
                <div className="mt-6">
                  <h3 className="font-serif text-lg font-semibold mb-4">Comments</h3>
                  
                  {commentsLoading ? (
                    <div className="space-y-4">
                      {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-20 w-full" />
                      ))}
                    </div>
                  ) : comments?.length ? (
                    <div className="space-y-4">
                      {comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="bg-muted/50 rounded-xl p-4"
                        >
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <User className="w-3 h-3" />
                            <span>
                              {comment.is_anonymous
                                ? "Anonymous"
                                : comment.profiles?.display_name || "Member"}
                            </span>
                            <span>•</span>
                            <span>
                              {formatDistanceToNow(new Date(comment.created_at), {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                          <p className="text-foreground">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-muted-foreground py-8">
                      No comments yet. Be the first to respond!
                    </p>
                  )}
                </div>

                {/* Add Comment Form */}
                <form onSubmit={handleSubmitComment} className="mt-6 space-y-4">
                  <Textarea
                    placeholder={user ? "Write a comment..." : "Sign in to comment"}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={3}
                    disabled={!user}
                    className="resize-none"
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        id="comment-anonymous"
                        checked={isAnonymous}
                        onCheckedChange={setIsAnonymous}
                        disabled={!user}
                      />
                      <Label htmlFor="comment-anonymous" className="text-sm">
                        Post anonymously
                      </Label>
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={!newComment.trim() || addComment.isPending}
                      className="gap-2"
                    >
                      <Send className="w-4 h-4" />
                      {addComment.isPending ? "Posting..." : "Comment"}
                    </Button>
                  </div>
                </form>
              </>
            ) : null}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
