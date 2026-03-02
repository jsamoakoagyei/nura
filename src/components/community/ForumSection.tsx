import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, AlertCircle, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { PostList } from "./PostList";
import { CreatePostDialog } from "./CreatePostDialog";
import { Skeleton } from "@/components/ui/skeleton";

interface ForumSectionProps {
  categoryId: string | null;
  onBack: () => void;
}

export function ForumSection({ categoryId, onBack }: ForumSectionProps) {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { user } = useAuth();

  const { data: category, isLoading: categoryLoading, isError, refetch } = useQuery({
    queryKey: ["forum-category", categoryId],
    queryFn: async () => {
      if (!categoryId) return null;
      const { data, error } = await supabase
        .from("forum_categories")
        .select("*")
        .eq("id", categoryId)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: !!categoryId,
  });

  if (!categoryId) {
    return null;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={categoryId}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="mt-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="rounded-xl min-w-[44px] min-h-[44px]"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              {categoryLoading ? (
                <Skeleton className="h-8 w-48" />
              ) : isError ? (
                <p className="text-destructive font-medium">Failed to load</p>
              ) : (
                <h2 className="font-serif text-2xl font-semibold text-foreground">
                  {category?.name}
                </h2>
              )}
              {category?.description && (
                <p className="text-sm text-muted-foreground">{category.description}</p>
              )}
            </div>
          </div>

          <Button
            onClick={() => {
              if (!user) {
                window.location.href = "/auth";
              } else {
                setIsCreateOpen(true);
              }
            }}
            className="gap-2 min-h-[44px]"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">New Post</span>
          </Button>
        </div>

        {/* Error state */}
        {isError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
              Couldn't load this category
            </h3>
            <p className="text-muted-foreground mb-6">
              Something went wrong. Please try again.
            </p>
            <div className="flex items-center justify-center gap-3">
              <Button onClick={onBack} variant="outline">
                Go Back
              </Button>
              <Button onClick={() => refetch()} className="gap-2">
                <RefreshCw className="w-4 h-4" />
                Retry
              </Button>
            </div>
          </motion.div>
        )}

        {/* Posts */}
        {!isError && <PostList categoryId={categoryId} />}

        {/* Create Post Dialog */}
        {user && (
          <CreatePostDialog
            open={isCreateOpen}
            onOpenChange={setIsCreateOpen}
            categoryId={categoryId}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
