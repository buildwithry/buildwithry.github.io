# Claude Code Prompt: Instantly.ai → GoHighLevel n8n Demo

Paste this whole brief into a Claude Code session (this repo or a fresh one) to (re)generate the workflow. It's self-contained — no other context from this repo's chat history is required.

## Goal

Produce a single, valid, **importable n8n workflow JSON file** that automates this: when a lead sends a positive/interested reply to an Instantly.ai cold-email campaign, the workflow should automatically:

1. Receive the event from Instantly.ai
2. Upsert the lead as a Contact in GoHighLevel (create if new, update if existing, matched by email)
3. Add a tag to the contact (e.g. `Instantly - Interested`)
4. Create an Opportunity in a GHL pipeline/stage so the sales team can work it
5. Send a Slack (or email) notification alerting a rep that a hot lead just replied

This is for a portfolio case study — the workflow needs to look clean when screenshotted in the n8n editor, so include Sticky Note nodes annotating each stage in plain English (mirror the annotation style of a typical n8n screenshot: short labels above/below each node group explaining what it does).

## Verify these live before finalizing — do not guess

API/schema details drift over time and were only partially confirmed via docs search as of 2026-07. Re-verify before writing the final JSON:

- **Instantly.ai trigger**: Instantly classifies reply sentiment server-side and fires distinct lead-status webhook events — `lead_interested`, `lead_meeting_booked`, `lead_not_interested`, `lead_out_of_office`, `lead_wrong_person`, etc. — rather than putting a sentiment field on the generic `reply_received` event. **Trigger this workflow on `lead_interested`** (optionally also `lead_meeting_booked`). Fetch `developer.instantly.ai/api/v2/webhookevent` and the webhook events guide to confirm the exact payload field names for `lead_interested` (expect something like `lead_email`, `campaign_id`, `campaign_name`, `workspace` based on the sibling `reply_received` event, but confirm live) before mapping fields in the HTTP Request nodes.
- **GoHighLevel v2**: base URL `https://services.leadconnectorhq.com`, auth header `Authorization: Bearer <token>` **plus** required `Version: 2021-07-28` header, `Content-Type: application/json`. Endpoints to use:
  - `POST /contacts/upsert` — upsert by email
  - `POST /contacts/:contactId/tags` — add tag
  - `POST /opportunities/` — create opportunity (needs `pipelineId`, `pipelineStageId`, `locationId`, `contactId`, `name`, `status`)
  Fetch `marketplace.gohighlevel.com/docs` (not the deprecated `highlevel.stoplight.io`) to confirm exact request bodies before finalizing — GHL has changed required fields across versions.
- **n8n JSON schema**: confirm current `typeVersion` numbers for `n8n-nodes-base.httpRequest`, `.if`, `.slack`, `.set`, `.stickyNote` rather than assuming — using a stale typeVersion can cause subtle import/parameter-mapping issues. Reasonable current defaults to sanity-check: HTTP Request v4.2, IF v2, Slack v2.3.

## Workflow structure to build

```
Webhook (lead_interested)
  → IF: lead email present? (defensive check)
      → true: HTTP Request "Upsert GHL Contact" (POST /contacts/upsert)
          → HTTP Request "Tag Contact" (POST /contacts/:contactId/tags, tag: "Instantly - Interested")
              → HTTP Request "Create Opportunity" (POST /opportunities/)
                  → Slack "Notify Sales Rep" (post to e.g. #hot-leads: "🔥 {{lead_email}} replied interested to {{campaign_name}} — opportunity created in GHL")
      → false: NoOp / dead-end (malformed payload, nothing to do)
```

Add a Sticky Note above each stage explaining it in one line (Trigger / Validate / Upsert Contact / Tag / Create Opportunity / Notify).

## Output requirements

- A single valid n8n workflow JSON: top-level `name`, `nodes` (array), `connections` (object keyed by source node name), `active: false`, `settings`. Each node needs `id`, `name`, `type`, `typeVersion`, `position`, `parameters`.
- **Never embed real secrets.** Use placeholder credential references only (e.g. a credential named `GHL API (Header Auth)` referenced by n8n's normal credential-linking mechanism, not a literal API key string in `parameters`).
- Validate the JSON parses correctly (e.g. `node -e "JSON.parse(require('fs').readFileSync('file.json'))"`) before finishing — a workflow that fails to import is a wasted round-trip.
- Also produce a short case-study content block matching this exact schema (used in this portfolio's `src/components/portfolio/Projects.tsx`), so it can be dropped straight into a new case study once the real workflow is built and screenshotted in n8n:

```
title: string
description: string          // one line: "<Client type>: <what it does>"
technologies: string[]
features: string[]           // 3-4 short bullet results
category: string
client: string
problem: string              // 1-2 sentences
solution: string              // 1-3 sentences, plain English
platform: string             // e.g. "n8n + GoHighLevel + Instantly"
detailedWorkflow: string[]   // numbered plain-English steps, matches the node chain above
```

## Save location

- `n8n-workflows/instantly-to-ghl-positive-reply.json` — the workflow
- `n8n-workflows/instantly-to-ghl-positive-reply.case-study.md` — the case-study content block

## Not in scope

Don't touch `Projects.tsx` or push anything live yet. That's a follow-up step once the workflow has been imported into a real n8n instance, activated, and screenshotted — the screenshot (not this generated JSON) becomes the portfolio thumbnail.
