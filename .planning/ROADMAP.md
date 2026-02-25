# Roadmap: Sustainability Reporting Assessment Platform

## Overview

Build a React SPA where MBA students translate a PwC case study into framework-accurate sustainability reports across 5 standards. The build follows a schema-first, one-module-then-replicate strategy: foundation and dashboard first, then a complete GRI module end-to-end (form + validation + preview + PDF) to prove all patterns, then replicate across the remaining 4 frameworks, and finally add cross-framework content that ties everything together.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation and Application Shell** - React/Vite/TypeScript project with dashboard, routing, theme, and shared UI primitives
- [ ] **Phase 2: GRI Module End-to-End** - Complete GRI module proving all patterns: schema-accurate form, Zod validation, live preview, and PDF export
- [ ] **Phase 3: Remaining Four Modules** - ISSB, CSRD, ESRS, and SBTi modules replicating proven patterns with framework-specific schemas
- [ ] **Phase 4: Cross-Framework Content and Comparison** - Framework differentiator quick-reference and cross-framework comparison view

## Phase Details

### Phase 1: Foundation and Application Shell
**Goal**: Students see a polished, professional dashboard with 5 framework cards and can navigate to any module page
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves the application locally with hot reload working
  2. Dashboard displays 5 framework cards (GRI, ISSB, CSRD, ESRS, SBTi) and clicking any card navigates to that module's page
  3. The visual theme is corporate-polished -- professional typography, clean layout, muted sustainability color palette -- not a default template look
  4. Shared UI primitives (Button, Card, Tabs, form field components) are available and styled consistently
**Plans**: 2 plans

Plans:
- [x] 01-01-PLAN.md -- Project scaffold (Vite + React + TypeScript + Tailwind v4 + shadcn/ui) and forest/earth theme foundation
- [x] 01-02-PLAN.md -- Dashboard UI with 5 framework cards, routing, persistent nav, module pages with two-panel skeleton

### Phase 2: GRI Module End-to-End
**Goal**: Students can complete the GRI assessment -- filling in a framework-accurate form, seeing their report take shape in real-time, and downloading a professional PDF
**Depends on**: Phase 1
**Requirements**: FORM-01, FORM-06, FORM-07, ACCU-01, OUT-01
**Success Criteria** (what must be TRUE):
  1. GRI form presents structured sections mirroring GRI Universal Standards (GRI 1, 2, 3 + Topic Standards) with correct disclosure labels and reference codes
  2. Form validates required fields and framework-specific rules, showing clear error messages when validation fails
  3. Live preview panel updates in real-time as the student types, rendering a framework-formatted report layout
  4. Student can download a professionally formatted PDF report that mirrors real GRI report conventions including a Content Index
  5. Form data persists to localStorage so students can close the browser and resume where they left off
**Plans**: TBD

Plans:
- [ ] 02-01: TBD
- [ ] 02-02: TBD
- [ ] 02-03: TBD

### Phase 3: Remaining Four Modules
**Goal**: Students can complete assessments for ISSB, CSRD, ESRS, and SBTi with the same quality and accuracy as the GRI module
**Depends on**: Phase 2
**Requirements**: FORM-02, FORM-03, FORM-04, FORM-05, ACCU-02, ACCU-03, ACCU-04, ACCU-05
**Success Criteria** (what must be TRUE):
  1. ISSB form follows the four-pillar TCFD structure (Governance, Strategy, Risk Management, Metrics and Targets) with correct IFRS S1/S2 disclosure references
  2. CSRD form presents directive-level reporting context and a double materiality assessment process, clearly distinct from the ESRS module
  3. ESRS form implements materiality-gated topical disclosures (E1-E5, S1-S4, G1) -- only material topics show their disclosure sections -- with ESRS 2 General Disclosures always present
  4. SBTi form captures target-setting inputs (base year, scope coverage, reduction pathway) as a submission form rather than a narrative report
  5. Each module produces a downloadable PDF matching that framework's real report conventions, and each module's data persists independently in localStorage
**Plans**: TBD

Plans:
- [ ] 03-01: TBD
- [ ] 03-02: TBD
- [ ] 03-03: TBD
- [ ] 03-04: TBD

### Phase 4: Cross-Framework Content and Comparison
**Goal**: Students can compare how the same case study data maps across different frameworks, reinforcing understanding of each framework's distinct lens
**Depends on**: Phase 3
**Requirements**: CONT-01, OUT-02
**Success Criteria** (what must be TRUE):
  1. A framework differentiator quick-reference is accessible from the dashboard or within any module, comparing all 5 frameworks side-by-side on purpose, audience, structure, and key terms
  2. A cross-framework comparison view shows how the same case study data points appear under different framework requirements, making overlaps and distinctions visible
**Plans**: TBD

Plans:
- [ ] 04-01: TBD
- [ ] 04-02: TBD

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation and Application Shell | 2/2 | Complete | 2026-02-24 |
| 2. GRI Module End-to-End | 0/3 | Not started | - |
| 3. Remaining Four Modules | 0/4 | Not started | - |
| 4. Cross-Framework Content and Comparison | 0/2 | Not started | - |
