-- ============================================
-- FIX 1: Add server-side input validation via CHECK constraints
-- ============================================

-- Add length constraints to forum_posts
ALTER TABLE public.forum_posts
ADD CONSTRAINT forum_posts_title_length CHECK (length(title) <= 200),
ADD CONSTRAINT forum_posts_content_length CHECK (length(content) <= 10000);

-- Add length constraints to forum_comments
ALTER TABLE public.forum_comments
ADD CONSTRAINT forum_comments_content_length CHECK (length(content) <= 5000);

-- Add length constraint to profiles display_name
ALTER TABLE public.profiles
ADD CONSTRAINT profiles_display_name_length CHECK (display_name IS NULL OR length(display_name) <= 50);

-- ============================================
-- FIX 2: Create secure views that hide user_id for anonymous posts/comments
-- ============================================

-- Create secure view for forum posts that hides user_id when anonymous
CREATE OR REPLACE VIEW public.forum_posts_secure AS
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

-- Create secure view for forum comments that hides user_id when anonymous
CREATE OR REPLACE VIEW public.forum_comments_secure AS
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