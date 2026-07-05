
DROP POLICY IF EXISTS "Allow anon read appointments" ON public.appointments;
DROP POLICY IF EXISTS "anon read" ON public.appointments;
DROP POLICY IF EXISTS "Allow anon read contacts" ON public.contacts;
DROP POLICY IF EXISTS "anon read" ON public.contacts;
DROP POLICY IF EXISTS "Allow anon read ghl_users" ON public.ghl_users;
DROP POLICY IF EXISTS "Allow anon read opportunities" ON public.opportunities;
DROP POLICY IF EXISTS "anon read" ON public.opportunities;
DROP POLICY IF EXISTS "Allow anon read pipeline_stages" ON public.pipeline_stages;
DROP POLICY IF EXISTS "anon read" ON public.pipeline_stages;
DROP POLICY IF EXISTS "Allow anon read pipelines" ON public.pipelines;

DROP POLICY IF EXISTS "Users can view their own profile" ON public."user";
DROP POLICY IF EXISTS "Users can update their own profile" ON public."user";
DROP POLICY IF EXISTS "Admins can manage all users" ON public."user";

CREATE POLICY "Users can view their own profile" ON public."user"
  FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public."user"
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

CREATE POLICY "Admins can manage all users" ON public."user"
  FOR ALL TO authenticated USING (public.is_admin(auth.uid())) WITH CHECK (public.is_admin(auth.uid()));

CREATE OR REPLACE FUNCTION public.prevent_user_privilege_escalation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF public.is_admin(auth.uid()) THEN
    RETURN NEW;
  END IF;
  IF NEW.role IS DISTINCT FROM OLD.role
     OR NEW.disabled IS DISTINCT FROM OLD.disabled
     OR NEW."mfaEnabled" IS DISTINCT FROM OLD."mfaEnabled"
     OR NEW.password IS DISTINCT FROM OLD.password
     OR NEW.email IS DISTINCT FROM OLD.email THEN
    RAISE EXCEPTION 'Not allowed to modify privileged user fields';
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_prevent_user_privilege_escalation ON public."user";
CREATE TRIGGER trg_prevent_user_privilege_escalation
BEFORE UPDATE ON public."user"
FOR EACH ROW EXECUTE FUNCTION public.prevent_user_privilege_escalation();

DROP POLICY IF EXISTS "Authenticated users can access processed data" ON public.processed_data;
CREATE POLICY "Users can access processed data of their workflows"
ON public.processed_data FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE sw."workflowId"::text = processed_data."workflowId"::text
      AND pr."userId" = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE sw."workflowId"::text = processed_data."workflowId"::text
      AND pr."userId" = auth.uid()
  )
);

DROP POLICY IF EXISTS "Authenticated users can access variables" ON public.variables;
CREATE POLICY "Admins can manage variables"
ON public.variables FOR ALL TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "Authenticated users can access webhooks" ON public.webhook_entity;
CREATE POLICY "Users can access webhooks of their workflows"
ON public.webhook_entity FOR ALL TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE sw."workflowId"::text = webhook_entity."workflowId"::text
      AND pr."userId" = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE sw."workflowId"::text = webhook_entity."workflowId"::text
      AND pr."userId" = auth.uid()
  )
);

DROP POLICY IF EXISTS "Authenticated users can create workflows" ON public.workflow_entity;
CREATE POLICY "Project members can create workflows"
ON public.workflow_entity FOR INSERT TO authenticated
WITH CHECK (
  EXISTS (SELECT 1 FROM public.project_relation pr WHERE pr."userId" = auth.uid())
);

DROP POLICY IF EXISTS "Admins can manage credentials" ON public.credentials_entity;
CREATE POLICY "Admins can manage credentials"
ON public.credentials_entity FOR ALL TO authenticated
USING (public.is_admin(auth.uid()))
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can read form submissions"
ON public.form_submissions FOR SELECT TO authenticated
USING (public.is_admin(auth.uid()));

ALTER FUNCTION public.user_locations() SET search_path = public;
ALTER FUNCTION public.get_daily_bookings() SET search_path = public;
ALTER FUNCTION public.get_book_rate_summary(text, timestamptz, timestamptz) SET search_path = public;
ALTER FUNCTION public.get_book_rate_timeseries(text, timestamptz, timestamptz, text) SET search_path = public;

REVOKE EXECUTE ON FUNCTION public.is_admin(uuid) FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.user_locations() FROM anon, public;
GRANT EXECUTE ON FUNCTION public.is_admin(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.user_locations() TO authenticated;
