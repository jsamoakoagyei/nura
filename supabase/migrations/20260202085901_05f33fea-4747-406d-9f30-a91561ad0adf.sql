-- Fix: Drop the permissive policy and implement proper access control

-- Drop the overly permissive policy we just created
DROP POLICY IF EXISTS "Users can view public profile info" ON public.profiles;

-- Create a secure view for public profile info (only display_name and avatar_url needed for community features)
CREATE OR REPLACE VIEW public.profiles_public
WITH (security_invoker = true) AS
SELECT 
  user_id,
  display_name,
  avatar_url
FROM public.profiles;

-- Grant access to the view for authenticated users
GRANT SELECT ON public.profiles_public TO authenticated;