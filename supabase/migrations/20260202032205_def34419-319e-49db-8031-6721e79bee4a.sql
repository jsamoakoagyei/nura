-- Fix: Revoke anonymous access to secure views
-- The forum requires authentication to view posts/comments
-- Views with security_invoker=true will use the caller's RLS permissions on base tables

-- Revoke anonymous access - only authenticated users should access forum content
REVOKE SELECT ON public.forum_posts_secure FROM anon;
REVOKE SELECT ON public.forum_comments_secure FROM anon;

-- Ensure authenticated users still have access
GRANT SELECT ON public.forum_posts_secure TO authenticated;
GRANT SELECT ON public.forum_comments_secure TO authenticated;