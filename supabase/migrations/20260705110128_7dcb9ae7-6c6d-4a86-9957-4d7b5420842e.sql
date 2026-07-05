
-- 1) user table: revoke sensitive columns from authenticated (column-level security)
REVOKE SELECT ON public."user" FROM authenticated;
GRANT SELECT ("id", "email", "firstName", "lastName", "createdAt", "updatedAt", "settings", "disabled", "mfaEnabled", "role", "lastActiveAt") ON public."user" TO authenticated;

REVOKE UPDATE ON public."user" FROM authenticated;
GRANT UPDATE ("firstName", "lastName", "settings", "personalizationAnswers") ON public."user" TO authenticated;

-- 2) workflow_statistics: restrict to workflows user has project access to
DROP POLICY IF EXISTS "Authenticated users can access workflow statistics" ON public.workflow_statistics;

CREATE POLICY "Users can view workflow statistics for their workflows"
ON public.workflow_statistics
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId"::text = sw."projectId"::text
    WHERE sw."workflowId"::text = workflow_statistics."workflowId"::text
      AND pr."userId" = auth.uid()
  )
);

CREATE POLICY "Workflow editors can modify workflow statistics"
ON public.workflow_statistics
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId"::text = sw."projectId"::text
    WHERE sw."workflowId"::text = workflow_statistics."workflowId"::text
      AND pr."userId" = auth.uid()
      AND ((pr.role)::text = ANY (ARRAY['owner','admin']))
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId"::text = sw."projectId"::text
    WHERE sw."workflowId"::text = workflow_statistics."workflowId"::text
      AND pr."userId" = auth.uid()
      AND ((pr.role)::text = ANY (ARRAY['owner','admin']))
  )
);

-- 3) auth_identity: allow users to view their own linked identities
CREATE POLICY "Users can view their own linked identities"
ON public.auth_identity
FOR SELECT
TO authenticated
USING ("userId" = auth.uid());

-- 4) sync_events: document service_role-only intent with restrictive policies denying auth/anon
CREATE POLICY "Deny all access to authenticated users"
ON public.sync_events
AS RESTRICTIVE
FOR ALL
TO authenticated, anon
USING (false)
WITH CHECK (false);

COMMENT ON TABLE public.sync_events IS 'Service-role only. Written by edge functions/webhooks. RLS denies all access to authenticated and anon roles.';

-- 5) workflow_history: restrict policy from public to authenticated
DROP POLICY IF EXISTS "Users can access workflow history of their own workflows" ON public.workflow_history;

CREATE POLICY "Users can access workflow history of their own workflows"
ON public.workflow_history
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM public.workflow_entity w
    JOIN public.shared_workflow sw ON sw."workflowId"::text = w.id::text
    JOIN public.project_relation pr ON pr."projectId"::text = sw."projectId"::text
    WHERE w.id::text = workflow_history."workflowId"::text
      AND pr."userId" = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.workflow_entity w
    JOIN public.shared_workflow sw ON sw."workflowId"::text = w.id::text
    JOIN public.project_relation pr ON pr."projectId"::text = sw."projectId"::text
    WHERE w.id::text = workflow_history."workflowId"::text
      AND pr."userId" = auth.uid()
  )
);
