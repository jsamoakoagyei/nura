-- Enable RLS on profiles_public view so only authenticated users can read it
ALTER VIEW public.profiles_public SET (security_invoker = true);

-- Note: Views with security_invoker use the calling user's permissions,
-- so we need a policy on the underlying profiles table or a direct policy.
-- Since profiles_public is a view, we add a policy-like check via security_barrier.
-- Actually, for views we need to handle this differently.
-- Let's create a security barrier view instead.

-- Drop the existing view and recreate as security barrier with auth check
DROP VIEW IF EXISTS public.profiles_public;

CREATE VIEW public.profiles_public 
WITH (security_barrier = true, security_invoker = true)
AS
SELECT 
  user_id,
  display_name,
  avatar_url
FROM public.profiles
WHERE auth.uid() IS NOT NULL;