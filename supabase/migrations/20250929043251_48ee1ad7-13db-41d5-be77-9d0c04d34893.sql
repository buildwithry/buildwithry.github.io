-- Fix workflow_history table RLS policy to restrict access to workflow owners
-- Remove the overly permissive existing policy
DROP POLICY IF EXISTS "Authenticated users can access workflow history" ON public.workflow_history;

-- Create a restrictive policy that only allows access to workflow history 
-- for workflows that the user owns through project membership
CREATE POLICY "Users can access workflow history of their own workflows" 
ON public.workflow_history 
FOR ALL 
USING (
  EXISTS (
    SELECT 1
    FROM workflow_entity w
    JOIN shared_workflow sw ON sw."workflowId" = w.id
    JOIN project_relation pr ON pr."projectId" = sw."projectId"
    WHERE w.id = workflow_history."workflowId"
      AND pr."userId" = auth.uid()
  )
);