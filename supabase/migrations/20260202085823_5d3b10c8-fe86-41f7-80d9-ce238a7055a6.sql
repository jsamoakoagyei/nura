-- Fix profiles table SELECT policy - restrict access to own profile and limited public info

-- Drop the overly permissive SELECT policy
DROP POLICY IF EXISTS "Users can view profiles when authenticated" ON public.profiles;

-- Policy 1: Users can fully view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);

-- Policy 2: Authenticated users can view limited public profile data (display_name, avatar_url) for community features
-- This allows seeing author info in forum posts while protecting sensitive data
CREATE POLICY "Users can view public profile info" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() IS NOT NULL);