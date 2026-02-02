-- Drop the existing overly permissive SELECT policy
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;

-- Create a new policy that restricts SELECT to authenticated users only
CREATE POLICY "Users can view profiles when authenticated"
ON public.profiles
FOR SELECT
TO authenticated
USING (auth.uid() IS NOT NULL);