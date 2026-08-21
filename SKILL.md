---
name: my-dashboard-makes-me-proud
description: Unified metrics dashboard for the MARKETING 4.0 funnel — reads clicks, leads, and purchases from the same Supabase the other pieces write, applies the 7/30/90 calendar-filled metrics contract (absence is never zero), and renders the answer to "which channel sold?". Use when setting up, extending, or generating the consolidated metrics dashboard (socket 9) for a marketing system built with the pack.
---

# Unified metrics dashboard

The MEASURE layer of the MARKETING 4.0 pack. It does not generate traffic, convert, or nurture: it reads what the other pieces already write — clicks from tracklink, leads from the LP intake, purchases with origin — and renders the business answers. Today this role is "the owner's spreadsheet" (socket 9); this skill turns that spreadsheet into a generated dashboard.

## Modes

- **Full setup** — default when asked to install the dashboard for a pack owner.
- **Daily report** — regenerate the dashboard screens from current data.
- **Single screen** — render only one screen (e.g. funnel, channels, health).

## Global hard rules (apply to every stage)

1. **Read-only.** The dashboard never writes to the owner's database. No DDL, no DML — SELECT only, via owner-approved service-role RPCs.
2. **Absence is never zero.** A day without data is an explicit empty day — never a silent 0 that reads as failure.
3. **Calendar-filled windows.** Every aggregate compares the same 7/30/90 calendar-filled windows, not trailing event counts.
4. **Anti-fabrication.** The dashboard renders only what the database holds. A number the data cannot support is omitted, never estimated.
5. **Metrics never block delivery.** A dashboard failure is reported to the owner with the failing query; it never touches the funnel (clicks, leads, emails keep flowing).
6. **Admin access only.** Dashboard data is owner-only (deny-all RLS; service-role RPCs only).

## Stage 1 — Connect

Discover the owner's Supabase connection — the same project the other pieces already use. Prefer the credentials the pack setup already recorded in the workspace `.env`. Never place `service_role` keys in client-side code; the dashboard reads through owner-approved RPCs.

**The RPC boundary:** the read RPCs are created by the pack setup (wizard), never by the dashboard — this skill is read-only by contract. Stage 1 validates that they exist and lists the missing ones for the owner, instead of creating them or assuming they are there.

**Output contract:**
- A verified read path to the owner's Supabase project (URL + anon/service key placement stated).
- The read RPCs validated against the owner's schema; any missing RPC reported by name (the owner reruns the pack setup to add them).
- The list of tables the dashboard will read: `tracking_links`/clicks, `leads`, `purchases` — the exact names found in the owner's schema, never assumed.
- A stated refusal if any required table is missing: the dashboard reports the gap instead of inventing columns.

## Stage 2 — Metrics

Apply the metrics contract on top of the connected data.

**Output contract:**
- **7/30/90 windows** — clicks, leads, and purchases aggregated over calendar-filled windows of 7, 30, and 90 days. Every window is filled explicitly; a day with no events is an empty day.
- **Funnel** — click → lead → purchase with first/last origin from `firstTrackingClickId`. Revenue attribution follows the funnel rules: abandonment and reminder events are the revenue signals, never fabricated ones.
- **Channel answers** — per `utm_source`: which channel sold, which is dying (window over window), and which piece produced each event.

## Stage 3 — Render

Generate the dashboard screens from the Stage 2 numbers.

**Output contract:**
- A static, dependency-free set of HTML screens the owner opens in a browser — no deploy required for the demo.
- Every number on screen is traceable to a query the owner can rerun.
- A "missing data" section lists what the database cannot answer yet (the anti-fabrication residue), instead of showing invented numbers.
