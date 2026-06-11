-- Fix critical security vulnerability: Enable RLS on project_relation table
-- and restrict access based on user permissions

-- Enable Row Level Security on project_relation table
ALTER TABLE public.project_relation ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own project relationships
CREATE POLICY "Users can view their own project relationships"
ON public.project_relation
FOR SELECT
TO authenticated
USING (userId = auth.uid());

-- Create policy to allow project owners/admins to view all relationships for their projects
CREATE POLICY "Project owners can view all project relationships"
ON public.project_relation
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr.projectId = project_relation.projectId
    AND pr.userId = auth.uid()
    AND pr.role IN ('owner', 'admin')
  )
);

-- Create policy to allow project owners/admins to insert new project relationships
CREATE POLICY "Project owners can add project relationships"
ON public.project_relation
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr.projectId = project_relation.projectId
    AND pr.userId = auth.uid()
    AND pr.role IN ('owner', 'admin')
  )
);

-- Create policy to allow project owners/admins to update project relationships
CREATE POLICY "Project owners can update project relationships"
ON public.project_relation
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr.projectId = project_relation.projectId
    AND pr.userId = auth.uid()
    AND pr.role IN ('owner', 'admin')
  )
);

-- Create policy to allow project owners/admins to delete project relationships
CREATE POLICY "Project owners can delete project relationships"
ON public.project_relation
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr.projectId = project_relation.projectId
    AND pr.userId = auth.uid()
    AND pr.role IN ('owner', 'admin')
  )
);

-- Create policy to allow users to delete their own project relationships (leave project)
CREATE POLICY "Users can remove themselves from projects"
ON public.project_relation
FOR DELETE
TO authenticated
USING (userId = auth.uid());