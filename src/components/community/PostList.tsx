import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { MessageCircle, Heart, Clock, User } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { PostDetailDrawer } from "./PostDetailDrawer";

interface Post {
  id: string;
  title: string;
  content: string;
  is_anonymous: boolean;
  is_pinned: boolean;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name: string | null;
  } | null;
}

interface PostListProps {
  categoryId: string;
}

export function PostList({ categoryId }: PostListProps) {
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

  const { data: posts, isLoading } = useQuery({
    queryKey: ["forum-posts", categoryId],
    queryFn: async () => {
      // Fetch posts
      const { data: postsData, error: postsError } = await supabase
        .from("forum_posts")
        .select("*")
        .eq("category_id", categoryId)
        .eq("is_hidden", false)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false });

      if (postsError) throw postsError;

      // Fetch profiles for non-anonymous posts
      const userIds = postsData
        .filter((p) => !p.is_anonymous)
        .map((p) => p.user_id);

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

      return postsData.map((post) => ({
        ...post,
        profiles: profilesMap[post.user_id] || null,
      })) as Post[];
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-16"
      >
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <MessageCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
          No posts yet
        </h3>
        <p className="text-muted-foreground">
          Be the first to start a conversation!
        </p>
      </motion.div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedPostId(post.id)}
            className="group bg-card rounded-2xl border border-border p-5 
              hover:shadow-lg hover:border-primary/20 transition-all duration-300 cursor-pointer"
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                {post.is_pinned && (
                  <Badge variant="secondary" className="text-xs">
                    Pinned
                  </Badge>
                )}
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <User className="w-3 h-3" />
                  {post.is_anonymous
                    ? "Anonymous"
                    : post.profiles?.display_name || "Member"}
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {formatDistanceToNow(new Date(post.created_at), { addSuffix: true })}
                </span>
              </div>
            </div>

            {/* Content */}
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2 
              group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-muted-foreground line-clamp-2 mb-4">
              {post.content}
            </p>

            {/* Footer */}
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Heart className="w-4 h-4" />
                {post.likes_count}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MessageCircle className="w-4 h-4" />
                {post.comments_count}
              </span>
            </div>
          </motion.article>
        ))}
      </div>

      <PostDetailDrawer
        postId={selectedPostId}
        onClose={() => setSelectedPostId(null)}
      />
    </>
  );
}
