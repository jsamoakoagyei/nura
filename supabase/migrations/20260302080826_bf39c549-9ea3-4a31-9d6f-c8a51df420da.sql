
-- Allow all authenticated users to read any profile via profiles_public view.
-- This is needed because profiles_public (now security_invoker) respects RLS,
-- but the existing policy only lets users see their own profile.
-- Forum features require reading other users' display names and avatars.
CREATE POLICY "Authenticated users can view any profile via public view"
ON public.profiles
FOR SELECT
USING (auth.uid() IS NOT NULL);
