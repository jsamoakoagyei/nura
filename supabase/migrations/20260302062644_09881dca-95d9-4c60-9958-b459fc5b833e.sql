-- Recreate profiles_public without security_invoker so it can read all profiles
-- (the view itself only exposes safe public fields: user_id, display_name, avatar_url)
DROP VIEW IF EXISTS public.profiles_public;

CREATE VIEW public.profiles_public 
WITH (security_barrier = true)
AS
SELECT 
  user_id,
  display_name,
  avatar_url
FROM public.profiles;