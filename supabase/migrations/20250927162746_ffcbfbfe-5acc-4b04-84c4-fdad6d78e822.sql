-- CRITICAL SECURITY FIX: Enable RLS on all public tables
-- This migration addresses the "RLS Disabled in Public" security vulnerability

-- =============================================================================
-- CRITICAL TABLES WITH SENSITIVE DATA - ENABLE RLS FIRST
-- =============================================================================

-- 1. PROJECT TABLE - Contains user email addresses (prevents email harvesting)
ALTER TABLE public.project ENABLE ROW LEVEL SECURITY;

-- Allow users to view projects they are members of
CREATE POLICY "Users can view their projects"
ON public.project
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = project.id
    AND pr."userId" = auth.uid()
  )
);

-- Allow project owners/admins to update projects
CREATE POLICY "Project owners can update projects"
ON public.project
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = project.id
    AND pr."userId" = auth.uid()
    AND pr.role IN ('owner', 'admin')
  )
);

-- Allow project owners/admins to delete projects  
CREATE POLICY "Project owners can delete projects"
ON public.project
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = project.id
    AND pr."userId" = auth.uid()
    AND pr.role = 'owner'
  )
);

-- Allow authenticated users to create new projects
CREATE POLICY "Authenticated users can create projects"
ON public.project
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 2. CREDENTIALS_ENTITY - Contains encrypted OAuth tokens and sensitive credentials
ALTER TABLE public.credentials_entity ENABLE ROW LEVEL SECURITY;

-- Only allow admins to access credentials for now (can be refined later)
CREATE POLICY "Admins can manage credentials"
ON public.credentials_entity
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- 3. WORKFLOW_ENTITY - Contains business automation workflows
ALTER TABLE public.workflow_entity ENABLE ROW LEVEL SECURITY;

-- Allow users to view workflows in their projects
CREATE POLICY "Users can view project workflows"
ON public.workflow_entity
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE sw."workflowId" = workflow_entity.id
    AND pr."userId" = auth.uid()
  )
);

-- Allow workflow owners/editors to update workflows
CREATE POLICY "Workflow editors can update workflows"
ON public.workflow_entity
FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE sw."workflowId" = workflow_entity.id
    AND pr."userId" = auth.uid()
    AND (pr.role IN ('owner', 'admin') OR sw.role IN ('owner', 'editor'))
  )
);

-- Allow workflow owners to delete workflows
CREATE POLICY "Workflow owners can delete workflows"
ON public.workflow_entity
FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.shared_workflow sw
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE sw."workflowId" = workflow_entity.id
    AND pr."userId" = auth.uid()
    AND (pr.role = 'owner' OR sw.role = 'owner')
  )
);

-- Allow authenticated users to create workflows
CREATE POLICY "Authenticated users can create workflows"
ON public.workflow_entity
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. USER_API_KEYS - Contains user API keys
ALTER TABLE public.user_api_keys ENABLE ROW LEVEL SECURITY;

-- Users can only access their own API keys
CREATE POLICY "Users can manage their own API keys"
ON public.user_api_keys
FOR ALL
TO authenticated
USING ("userId" = auth.uid())
WITH CHECK ("userId" = auth.uid());

-- 5. SETTINGS - System configuration (admin only)
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Only admins can access system settings
CREATE POLICY "Admins can manage settings"
ON public.settings
FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- =============================================================================
-- WORKFLOW EXECUTION AND DATA TABLES
-- =============================================================================

-- EXECUTION_ENTITY - Workflow execution records
ALTER TABLE public.execution_entity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view executions of their workflows"
ON public.execution_entity
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.workflow_entity w
    JOIN public.shared_workflow sw ON sw."workflowId" = w.id
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE w.id = execution_entity."workflowId"
    AND pr."userId" = auth.uid()
  )
);

-- EXECUTION_DATA - Contains execution data
ALTER TABLE public.execution_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view execution data of their workflows"
ON public.execution_data
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.execution_entity ee
    JOIN public.workflow_entity w ON w.id = ee."workflowId"
    JOIN public.shared_workflow sw ON sw."workflowId" = w.id
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE ee.id = execution_data."executionId"
    AND pr."userId" = auth.uid()
  )
);

-- EXECUTION_ANNOTATIONS - Execution annotations
ALTER TABLE public.execution_annotations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage annotations of their executions"
ON public.execution_annotations
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.execution_entity ee
    JOIN public.workflow_entity w ON w.id = ee."workflowId"
    JOIN public.shared_workflow sw ON sw."workflowId" = w.id
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE ee.id = execution_annotations."executionId"
    AND pr."userId" = auth.uid()
  )
);

-- EXECUTION_METADATA - Execution metadata
ALTER TABLE public.execution_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view execution metadata of their workflows"
ON public.execution_metadata
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.execution_entity ee
    JOIN public.workflow_entity w ON w.id = ee."workflowId"
    JOIN public.shared_workflow sw ON sw."workflowId" = w.id
    JOIN public.project_relation pr ON pr."projectId" = sw."projectId"
    WHERE ee.id = execution_metadata."executionId"
    AND pr."userId" = auth.uid()
  )
);

-- =============================================================================
-- FOLDER AND ORGANIZATION TABLES
-- =============================================================================

-- FOLDER - Project folders
ALTER TABLE public.folder ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage folders in their projects"
ON public.folder
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = folder."projectId"
    AND pr."userId" = auth.uid()
  )
);

-- TAG_ENTITY - Tags for organization
ALTER TABLE public.tag_entity ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to manage tags (can be refined per project later)
CREATE POLICY "Authenticated users can manage tags"
ON public.tag_entity
FOR ALL
TO authenticated
USING (true);

-- =============================================================================
-- SHARING AND PERMISSIONS TABLES
-- =============================================================================

-- SHARED_CREDENTIALS - Credential sharing permissions
ALTER TABLE public.shared_credentials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view shared credentials in their projects"
ON public.shared_credentials
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = shared_credentials."projectId"
    AND pr."userId" = auth.uid()
  )
);

CREATE POLICY "Project owners can manage shared credentials"
ON public.shared_credentials
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = shared_credentials."projectId"
    AND pr."userId" = auth.uid()
    AND pr.role IN ('owner', 'admin')
  )
);

-- SHARED_WORKFLOW - Workflow sharing permissions
ALTER TABLE public.shared_workflow ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view shared workflows in their projects"
ON public.shared_workflow
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = shared_workflow."projectId"
    AND pr."userId" = auth.uid()
  )
);

CREATE POLICY "Project owners can manage shared workflows"
ON public.shared_workflow
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 
    FROM public.project_relation pr
    WHERE pr."projectId" = shared_workflow."projectId"
    AND pr."userId" = auth.uid()
    AND pr.role IN ('owner', 'admin')
  )
);

-- =============================================================================
-- REMAINING TABLES - ENABLE RLS WITH BASIC POLICIES
-- =============================================================================

-- Tables that can be accessed by authenticated users (refined access can be added later)
ALTER TABLE public.annotation_tag_entity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.execution_annotation_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.folder_tag ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.variables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.processed_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_entity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflow_statistics ENABLE ROW LEVEL SECURITY;

-- Basic authenticated user policies for less sensitive tables
CREATE POLICY "Authenticated users can access annotation tags"
ON public.annotation_tag_entity FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access execution annotation tags"
ON public.execution_annotation_tags FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access folder tags"
ON public.folder_tag FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access workflow tags"
ON public.workflows_tags FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access variables"
ON public.variables FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access processed data"
ON public.processed_data FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access webhooks"
ON public.webhook_entity FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access workflow history"
ON public.workflow_history FOR ALL TO authenticated USING (true);

CREATE POLICY "Authenticated users can access workflow statistics"
ON public.workflow_statistics FOR ALL TO authenticated USING (true);

-- =============================================================================
-- SYSTEM AND READONLY TABLES
-- =============================================================================

-- Admin-only access for system tables
ALTER TABLE public.insights_by_period ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights_metadata ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.insights_raw ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installed_nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.installed_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_case_execution ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_run ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_destinations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can access insights by period"
ON public.insights_by_period FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can access insights metadata"
ON public.insights_metadata FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can access insights raw data"
ON public.insights_raw FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can access installed nodes"
ON public.installed_nodes FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can access installed packages"
ON public.installed_packages FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can access test executions"
ON public.test_case_execution FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can access test runs"
ON public.test_run FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can access event destinations"
ON public.event_destinations FOR ALL TO authenticated USING (public.is_admin(auth.uid()));

-- Tables that should remain system-only (no user access needed)
ALTER TABLE public.auth_identity ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auth_provider_sync_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invalid_auth_token ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.migrations ENABLE ROW LEVEL SECURITY;

-- No policies needed for these - they should be system-only
-- This effectively blocks all user access while keeping RLS enabled