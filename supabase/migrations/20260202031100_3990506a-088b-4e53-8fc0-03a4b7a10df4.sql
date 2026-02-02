-- Fix RLS policies to allow forum functionality while protecting privacy
-- The secure views (forum_posts_secure, forum_comments_secure) are used for reading
-- Base tables need policies that work with the security_invoker views

-- Drop the overly restrictive policies
DROP POLICY IF EXISTS "Users can view their own posts or moderators can view all" ON public.forum_posts;
DROP POLICY IF EXISTS "Users can view their own comments or moderators can view all" ON public.forum_comments;

-- Create policies that allow the secure views to work properly
-- The views have security_invoker=true, so they use the caller's RLS permissions
CREATE POLICY "Authenticated users can view non-hidden posts"
ON public.forum_posts
FOR SELECT
USING (
  (auth.uid() IS NOT NULL AND is_hidden = false)
  OR auth.uid() = user_id
  OR has_role(auth.uid(), 'moderator'::app_role)
  OR has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Authenticated users can view non-hidden comments"
ON public.forum_comments
FOR SELECT
USING (
  (auth.uid() IS NOT NULL AND is_hidden = false)
  OR auth.uid() = user_id
  OR has_role(auth.uid(), 'moderator'::app_role)
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Restrict likes tables to authenticated users only (hide from anonymous)
DROP POLICY IF EXISTS "Post likes are viewable by everyone" ON public.forum_post_likes;
DROP POLICY IF EXISTS "Comment likes are viewable by everyone" ON public.forum_comment_likes;

CREATE POLICY "Authenticated users can view post likes"
ON public.forum_post_likes
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Authenticated users can view comment likes"
ON public.forum_comment_likes
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);