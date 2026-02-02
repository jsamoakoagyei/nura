-- Restrict direct SELECT access to forum_posts base table
-- Users should access posts through the secure view that hides user_id for anonymous posts

-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Posts are viewable by everyone if not hidden" ON public.forum_posts;

-- Create a restrictive policy that only allows:
-- 1. Post owners to see their own posts
-- 2. Moderators/admins to see all posts (for moderation)
-- Direct public access is denied - use forum_posts_secure view instead
CREATE POLICY "Users can view their own posts or moderators can view all"
ON public.forum_posts
FOR SELECT
USING (
  auth.uid() = user_id 
  OR has_role(auth.uid(), 'moderator'::app_role) 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Similarly restrict forum_comments base table
DROP POLICY IF EXISTS "Comments are viewable by everyone if not hidden" ON public.forum_comments;

CREATE POLICY "Users can view their own comments or moderators can view all"
ON public.forum_comments
FOR SELECT
USING (
  auth.uid() = user_id 
  OR has_role(auth.uid(), 'moderator'::app_role) 
  OR has_role(auth.uid(), 'admin'::app_role)
);

-- Grant SELECT on secure views to anon role for public forum access
GRANT SELECT ON public.forum_posts_secure TO anon;
GRANT SELECT ON public.forum_comments_secure TO anon;