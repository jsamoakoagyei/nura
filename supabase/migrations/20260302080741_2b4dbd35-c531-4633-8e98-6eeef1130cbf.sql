
-- Recreate profiles_public view with security_invoker = true
-- so it respects the querying user's permissions (RLS) instead of the view owner's
CREATE OR REPLACE VIEW public.profiles_public
WITH (security_invoker = true)
AS
SELECT user_id, display_name, avatar_url
FROM profiles;
