-- Fix SECURITY DEFINER view warnings by using security_invoker
-- This ensures the views use the querying user's RLS policies

-- Drop and recreate views with security_invoker = true
DROP VIEW IF EXISTS public.forum_posts_secure;
DROP VIEW IF EXISTS public.forum_comments_secure;

-- Create secure view for forum posts with security_invoker
CREATE VIEW public.forum_posts_secure
WITH (security_invoker = true)
AS
SELECT
  id,
  category_id,
  title,
  content,
  CASE WHEN is_anonymous THEN NULL ELSE user_id END AS user_id,
  is_anonymous,
  is_pinned,
  is_hidden,
  likes_count,
  comments_count,
  created_at,
  updated_at
FROM public.forum_posts;

-- Create secure view for forum comments with security_invoker
CREATE VIEW public.forum_comments_secure
WITH (security_invoker = true)
AS
SELECT
  id,
  post_id,
  content,
  CASE WHEN is_anonymous THEN NULL ELSE user_id END AS user_id,
  is_anonymous,
  is_hidden,
  likes_count,
  created_at,
  updated_at
FROM public.forum_comments;

-- Grant SELECT on views to authenticated users
GRANT SELECT ON public.forum_posts_secure TO authenticated;
GRANT SELECT ON public.forum_comments_secure TO authenticated;

-- Grant SELECT on views to anon for public forum access
GRANT SELECT ON public.forum_posts_secure TO anon;