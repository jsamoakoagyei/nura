-- Views don't support RLS directly, so we control access via permissions
-- First revoke all access, then grant only to authenticated users

-- Revoke access from anonymous users
REVOKE ALL ON public.profiles_public FROM anon;

-- Ensure authenticated users can still access the view
GRANT SELECT ON public.profiles_public TO authenticated;