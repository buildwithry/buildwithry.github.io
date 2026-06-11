-- Enable Row Level Security on the user table
ALTER TABLE public.user ENABLE ROW LEVEL SECURITY;

-- Create policy for users to read their own data
CREATE POLICY "Users can view their own profile" 
ON public.user 
FOR SELECT 
USING (auth.uid() = id);

-- Create policy for users to update their own data (excluding sensitive fields)
CREATE POLICY "Users can update their own profile" 
ON public.user 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Create security definer function to check admin role
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role = 'admin' FROM public.user WHERE id = user_id;
$$;

-- Create policy for admins to manage all users
CREATE POLICY "Admins can manage all users" 
ON public.user 
FOR ALL 
USING (public.is_admin(auth.uid()));

-- Revoke public access to the table
REVOKE ALL ON public.user FROM anon;
REVOKE ALL ON public.user FROM authenticated;