# Project Research Summary

**Project:** Sustainability Reporting Assessment Platform
**Domain:** React SPA — structured educational assessment with multi-framework forms, live preview, and PDF export
**Researched:** 2026-02-24
**Confidence:** HIGH

## Executive Summary

This is an MBA-level educational platform that guides students through applying five distinct sustainability reporting frameworks (GRI, ISSB, CSRD, ESRS, SBTi) to a shared fictional company case study. The product sits at a niche intersection with no direct competitors: it borrows structured form patterns from enterprise ESG software (Persefoni, Sweep) and assessment patterns from educational tools (Gradescope) but serves neither purpose in its existing form. The correct mental model is a framework-accurate document authoring tool — the core value is not the submission artifact (PDF) but the process of mapping case study data through each framework's distinct conceptual logic.

The recommended approach is a pure client-side React SPA with no backend: React 19 + Vite 7 + TypeScript 5.5 for the application shell; react-hook-form + Zod 4 for form management with per-framework Zod schemas as the single source of truth; Zustand with localStorage persistence for state; shadcn/ui + Tailwind CSS v4 for the UI; and @react-pdf/renderer for PDF generation. The architecture is feature-module based — each of the 5 frameworks lives in its own directory with its own schema, form, preview, and PDF template, sharing only generic UI primitives and field components. This is the right call: the 5 frameworks are structurally distinct enough that parameterizing them from a shared template will produce framework-inaccurate output that undermines the educational purpose.

The dominant risk is framework accuracy failure — building technically functional forms that map incorrectly to real disclosure requirements. This is not a technical risk; it is a content design risk. The form schemas must be designed by someone with domain knowledge of each framework (the instructor), not inferred from surface-level theme similarity. A secondary risk is student data loss: with no backend and 150+ fields per complete set of modules, localStorage persistence with navigation guards must be implemented from the first commit, not bolted on later. Both risks are fully preventable with the right build order: schema design and persistence infrastructure in Phase 1, before any form components are written.

---

## Key Findings

### Recommended Stack

The stack is fully settled with no meaningful ambiguity. Every technology choice has official documentation, confirmed version compatibility with React 19, and avoids known footguns for this use case.

**Core technologies:**
- **React 19 + Vite 7 + TypeScript 5.5** — application foundation — Vite 7 for near-instant HMR; TypeScript strict mode required by Zod 4; React 19 supported by all stack libraries
- **react-hook-form 7.71 + Zod 4 + @hookform/resolvers 5** — form engine — uncontrolled inputs prevent re-render storms on 50+ field forms; Zod schemas are the single source of truth for field types, validation, and TypeScript types
- **Zustand 5 with persist middleware** — application state and localStorage persistence — store-per-module factory pattern prevents cross-module state corruption
- **shadcn/ui + Tailwind CSS v4 + Radix UI** — UI component layer — code-owned components (no dependency lock-in), WAI-ARIA accessibility out of the box, corporate-appropriate aesthetic
- **@react-pdf/renderer 4.3** — PDF generation — React-native JSX PDF components, searchable text output, React 19 supported since v4.1.0; NOT interchangeable with the HTML live preview (separate rendering pipelines)
- **React Router 7.5** — client-side routing — library mode for SPA; covers the ~6 routes needed
- **Vitest + @testing-library/react** — testing — native Vite integration, Jest-compatible API

**Critical version note:** Node.js 20.19+ or 22.12+ required (Node 18 EOL). Zod 4 requires TypeScript strict mode. Both are must-configure items in project setup.

See `.planning/research/STACK.md` for full alternatives analysis.

---

### Expected Features

The platform has a clear P1 launch set (the platform is non-functional without these), a P2 post-validation set (meaningfully improves the experience), and a set of explicitly excluded features. The anti-features list is important: automated grading, auth, backend, mobile layout, and AI writing assistance are all deliberate exclusions, not oversights.

**Must have (table stakes — P1 launch):**
- **5-module dashboard** — entry point, all frameworks accessible simultaneously, no progressive unlock
- **Structured assessment forms for all 5 frameworks** — ~150-250 total fields, framework-accurate field labels using disclosure reference codes (e.g., "GRI 305-1", "ESRS E1-6"), each framework independently designed
- **Live report preview** — split-pane real-time rendering of form data into framework-formatted report layout; core learning mechanism
- **PDF export** — framework-accurate downloadable report; the submission artifact
- **Reference material per module** — practitioner-focused framework guides, comparative lens, interview-ready differentiation; static instructor-authored content
- **Example component per module** — annotated real-world report excerpts showing "what good looks like"
- **Form data persistence (localStorage autosave)** — debounced saves, session recovery prompt, navigation guards; non-negotiable with 150+ fields and no backend
- **Case study data component** — PwC case study accessible from any module without losing form context
- **Professional/corporate UI** — MBA audience expects enterprise-grade aesthetics

**Should have (differentiators — P2 post-validation):**
- **JSON export + instructor review view (side-by-side)** — much more powerful than PDF comparison; instructor imports student JSON to render in the same framework templates
- **Completion progress tracking** — progress bars per section and per module on dashboard
- **Inline field-level guidance** — contextual help text and validation per field; instructor-defined after first cohort reveals where students struggle
- **Cross-framework comparison view** — maps equivalent disclosures (e.g., "climate governance") across all 5 frameworks; highest pedagogical value, highest complexity

**Defer (v2+):**
- Framework structure visualization (interactive diagrams)
- Full keyboard navigation / accessibility audit
- Print-optimized CSS
- Multi-case-study support
- Authentication

See `.planning/research/FEATURES.md` for full feature dependency graph and prioritization matrix.

---

### Architecture Approach

The architecture is feature-module based with a clean shared layer. Each of the 5 frameworks is a self-contained directory (`modules/gri/`, `modules/issb/`, etc.) containing its own Zod schema, assessment form, live preview, PDF template, reference content, and examples. Modules import from `shared/` (generic form field components, preview primitives, PDF building blocks, hooks) but never import from each other. This boundary is load-bearing: cross-module imports would couple framework implementations and make independent schema evolution impossible.

**Major components:**

1. **Module Schema (Zod)** — single source of truth: drives form generation, TypeScript types, validation, preview rendering, and PDF generation for each framework
2. **Assessment Form (react-hook-form + Zod)** — uncontrolled input form organized into section-level sub-components; syncs to Zustand store on change (debounced)
3. **Live Preview (useWatch-driven)** — reads form state via `useWatch` hook (isolated re-renders, not `watch`); renders HTML report approximation in real time
4. **PDF Template (@react-pdf/renderer)** — separate rendering pipeline from HTML preview; produces framework-accurate downloadable PDF; triggered on-demand, not on every keystroke
5. **Zustand Store (per-module factory)** — persists form data to localStorage under unique key per framework; canonical data source for PDF export and session recovery
6. **Application Shell (React Router)** — routes between 5 module pages, dashboard, and instructor review view
7. **Instructor Review View** — consumes JSON export from student; renders student submission alongside ideal report in same framework templates (read-only, no write access to module stores)

**Key patterns:**
- `useWatch` (not `watch`) for preview — prevents form-wide re-renders on every keystroke
- `createModuleStore` factory — 5 independent Zustand stores, 5 independent localStorage keys
- Dual renderer (HTML preview + PDF) — accept two separate rendering pipelines; share data types, not components
- Schema-first — design Zod schemas before writing form components

**Build order:** Types/schemas → Zustand stores → shared UI primitives → one complete GRI module end-to-end → replicate remaining 4 modules → instructor review view.

See `.planning/research/ARCHITECTURE.md` for full data flow diagrams, anti-patterns, and integration boundaries.

---

### Critical Pitfalls

1. **Framework structure conflation** — Building one generic form parameterized for all 5 frameworks. The 5 frameworks have fundamentally different structures (GRI: modular disclosure numbers + Content Index; ISSB: 4 TCFD pillars; ESRS: double materiality + 12 topical standards; SBTi: target-setting methodology, not a reporting framework). Design 5 independent Zod schemas from the start. Retrofitting is a full rewrite.

2. **Generic PDF output** — Using one PDF template with the framework name swapped in the header. Each framework has distinct report formatting conventions (GRI requires a Content Index table; ISSB follows TCFD pillar structure; SBTi is a target submission document, not a narrative report). Collect 3-5 real published reports per framework and validate PDF templates with the instructor before implementation.

3. **Missing data persistence** — Treating "no backend" as "no persistence" and losing student work to tab closure or in-app navigation. Implement three-layer protection from Phase 1: debounced localStorage autosave, `beforeunload` navigation guard, and session recovery prompt on module load.

4. **CSRD/ESRS confusion** — Building two modules that students cannot differentiate. CSRD is the EU law (who must report, when, assurance requirements); ESRS is the technical standards that implement CSRD (how to report, specific data points). Design CSRD module around directive-level context and materiality assessment; ESRS module around specific disclosure requirements. Cross-reference explicitly in both modules' reference content.

5. **Instructor review designed for 1 student** — Building a two-panel layout that works for one demo submission but is unusable for reviewing 30 students across 5 frameworks. Design section-level navigation (jump to a specific disclosure), framework-specific anchoring (show disclosure reference codes prominently), and student-switching without returning to dashboard.

See `.planning/research/PITFALLS.md` for performance traps, UX pitfalls, security considerations, and a "looks done but isn't" verification checklist.

---

## Implications for Roadmap

Research converges on a 6-phase build order that strictly follows the dependency chain discovered across all 4 research files.

### Phase 1: Foundation — Schemas, Persistence, and Shell

**Rationale:** Everything else depends on this phase. Zod schemas drive forms, previews, and PDFs — they must be correct before any of those are built. Persistence infrastructure must be in place from the first form field, not retrofitted. The application shell provides the routing skeleton that all subsequent phases populate. This phase is entirely about de-risking: locking in framework-accurate schema design and data protection before investing in UI.

**Delivers:** TypeScript type definitions, 5 Zod form schemas (validated against official framework documentation), Zustand store factory with localStorage persistence, navigation guards (`beforeunload` + React Router `useBlocker`), application shell with routing, and shared UI primitives (Button, Card, Tabs, Layout).

**Addresses:** Dashboard (shell), form data persistence, professional UI (design tokens and layout)

**Avoids:** Framework conflation (Pitfall 1), data loss (Pitfall 3), CSRD/ESRS confusion (Pitfall 4 — resolved at content architecture level)

**Research flag:** This phase requires instructor involvement to validate schema accuracy. The Zod schemas are technical implementations of framework domain knowledge that the developer likely does not possess independently. Plan a schema review checkpoint with the instructor before moving to Phase 2.

---

### Phase 2: Form Engine and First Module (GRI)

**Rationale:** Build one complete module end-to-end before replicating across 4 others. GRI is the recommended starting point (most established framework, most published example reports, clearest disclosure numbering system). Building GRI first validates all shared form component patterns (field types, section collapsing, inline guidance, completion tracking logic) before they are replicated 4 more times. The cost of a wrong pattern in Phase 2 is 1 module; in Phase 5 it would be 5.

**Delivers:** Shared form field components (TextInput, TextArea, Select, FieldGroup, NumericInput), useAutoSave hook (RHF-to-Zustand sync, debounced), GRI assessment form organized into section-level sub-components matching GRI's Universal/Sector/Topic Standards structure, GRI live preview via `useWatch`, auto-save indicator in UI.

**Uses:** react-hook-form + Zod + @hookform/resolvers, Zustand persist middleware, shadcn/ui form components

**Implements:** Assessment Form component, Live Preview (useWatch pattern), Module Page (tab orchestrator)

**Avoids:** Monolithic form anti-pattern (break into section sub-components), `watch` re-render anti-pattern (use `useWatch`), synchronous localStorage writes (debounce 300-500ms)

---

### Phase 3: Reference Content and Examples (All 5 Frameworks)

**Rationale:** Reference content and examples are static instructor-authored content that does not depend on form completion. Building this in parallel with (or immediately after) Phase 2 means students can use the reference material while the remaining framework forms are being built in Phase 4. This phase also produces the "ideal report" content that will power both the examples component and the instructor review view — designing them together avoids duplication.

**Delivers:** Reference panel component (collapsible/tabbed, scannable), example component with annotated report excerpts and callout markers, static content for all 5 modules (instructor-provided), case study data component (shared across all modules), CSRD/ESRS relationship explanation explicit in UI.

**Addresses:** Reference material per module (P1), example component per module (P1), case study data component (P1), CSRD/ESRS confusion (Pitfall 4 — resolved in UX copy)

**Research flag:** Content quality in this phase depends on instructor-provided material. Development can scaffold the components; actual content requires the instructor's domain expertise. Plan a content handoff milestone.

---

### Phase 4: PDF Pipeline and GRI PDF Template

**Rationale:** PDF is built after the form (Phase 2) and preview (Phase 2) because it is an on-demand artifact, not a real-time surface. HTML preview validates the data model; PDF templates are built against proven data shapes. GRI first for the same reason as Phase 2: validates the PDF template pattern and shared PDF primitives before replicating. Collect and study real published GRI reports before writing any PDF component code.

**Delivers:** Shared @react-pdf/renderer primitives (PdfHeader, PdfSection, PdfTable — flexbox-based, no HTML rowspan/colspan assumptions), usePdfExport hook (generation + download trigger), GRI PDF template with GRI Content Index table and section numbering matching real GRI report conventions, auto-generated filenames (`GRI_Report_2026.pdf`).

**Uses:** @react-pdf/renderer 4.3

**Implements:** PDF Generator component, dual-renderer pattern (accept separate HTML and PDF trees)

**Avoids:** Screenshot-based PDF (never — use @react-pdf/renderer), shared HTML/PDF components (anti-pattern — separate trees), PDF generation on every keystroke (triggered on-demand only), PDF table layout failures (test with maximum-length content early)

---

### Phase 5: Remaining 4 Modules (ISSB, CSRD, ESRS, SBTi)

**Rationale:** With Phase 2 having validated all shared patterns and Phase 4 having validated the PDF pipeline, the remaining 4 modules are horizontal replication against established patterns. Each module follows the same structure: schema (already designed in Phase 1) → assessment form → live preview → PDF template. The risk in this phase is framework-specific accuracy, not technical patterns. Each module's form sections must use exact framework terminology and disclosure reference codes.

**Delivers:** Assessment forms, live previews, and PDF templates for ISSB (four TCFD pillars), CSRD (directive context + double materiality assessment), ESRS (ESRS 2 General Disclosures + materiality-gated topical standards), and SBTi (target-setting inputs — base year, scope coverage, reduction pathway — NOT a narrative reporting form).

**Key module-specific requirements:**
- ISSB: four-pillar structure; no mandatory report structure imposed (companies choose format)
- CSRD: materiality assessment process as primary form logic
- ESRS: materiality-gating logic — topical disclosures (E1-E5, S1-S4, G1) shown conditionally based on materiality determination; 2025 "quick fix" cut 57% of mandatory data points — use current ESRS set
- SBTi: target submission form (near-term criteria v5.3), not narrative report

**Avoids:** Treating SBTi as a reporting module (Pitfall 1 sub-case), ESRS showing all possible topical disclosures as mandatory (Pitfall checklist item)

---

### Phase 6: Instructor Review View and JSON Export (P2)

**Rationale:** Instructor review depends on all 5 modules having stable form schemas (the structured data must support section-level access). JSON export is the data transport mechanism — export as structured schema-typed JSON (not opaque blob), enabling the instructor view to render any student's submission in the same framework templates. Building last ensures the review view is designed around the final data model, not a premature snapshot of it.

**Delivers:** JSON export per module (full form data as typed JSON), instructor review page (side-by-side: student submission vs. ideal report), section-level navigation within review view (jump to specific disclosure without full-page scroll), student-switching for same framework, submission review progress tracking, framework-specific disclosure reference anchoring in review UI.

**Addresses:** Instructor review view (P2), JSON export (P2), unusable instructor review (Pitfall 5)

**Avoids:** Student data stored as opaque blobs (ensures structured JSON from Phase 1 data model), ideal answers exposed in student-facing bundle (ideal answers loaded only in instructor-facing route or separate deployment)

---

### Phase Ordering Rationale

- **Schemas before forms** (Phase 1 before Phase 2): Every downstream artifact depends on schema correctness. A wrong schema in Phase 2 cascades into wrong forms, wrong previews, wrong PDFs, and wrong instructor review data.
- **One module end-to-end before replicating** (Phase 2/4 GRI before Phase 5): Validates all shared patterns at low cost before 4x replication.
- **Content in Phase 3** (parallel to or after Phase 2): Static content does not block form development but should precede first student use.
- **PDF after preview** (Phase 4 after Phase 2): Preview validates the data model cheaply; PDF templates are built against proven data shapes.
- **Instructor view last** (Phase 6 after Phase 5): Must be designed against the final, stable data model from all 5 modules.

---

### Research Flags

**Phases needing deeper research during planning:**

- **Phase 1 (Schema design):** Requires framework domain expertise for each of the 5 schemas. The developer needs either the instructor's field-level input or access to published framework documentation. Plan a structured schema review process. Specific risk: ESRS schema may need to be revisited if the 2025 "quick fix" revision changes which data points are mandatory.

- **Phase 4/5 (PDF templates):** Each framework's PDF template requires studying real published reports before writing code. Sources: GRI Reports Database (public), KPMG ISSB Illustrative Disclosures (Oct 2025 edition), EFRAG ESRS examples, SBTi target submission examples. Allocate time for this research before implementation begins.

- **Phase 5 (ESRS materiality gating):** The conditional disclosure logic (show topical standards only if material) is the most complex form logic in the project. May need dedicated research into how to implement conditional schema validation with Zod and react-hook-form.

**Phases with standard patterns (skip research-phase):**

- **Phase 2 (Form engine):** react-hook-form + Zod + shadcn/ui patterns are thoroughly documented with official guides. The shared form component patterns are well-established.

- **Phase 3 (Reference/content):** Static content display is standard React. No novel technical patterns.

- **Phase 6 (Instructor review):** Split-panel layout with JSON import is standard React. Section navigation is well-documented. No novel patterns.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions confirmed with official sources; compatibility matrix verified; no open questions |
| Features | MEDIUM-HIGH | Table stakes and anti-features are clear; framework-specific field counts (~150-250 total) are estimates that require instructor validation |
| Architecture | HIGH | Patterns are well-documented; data flow is clearly defined; build order validated against dependency chain; anti-patterns explicitly identified |
| Pitfalls | MEDIUM-HIGH | Technical pitfalls verified against library issue trackers and official docs; domain pitfalls (framework accuracy) rely on official standards body documentation which is authoritative but dense |

**Overall confidence:** HIGH

### Gaps to Address

- **Framework field schemas:** The actual field definitions for each framework's Zod schema cannot be completed without the instructor's input on which disclosures to include, what the field labels should be, and what the case study data contains. This is the single largest open item and a blocking dependency for Phase 1 completion.

- **ESRS 2025 scope:** The ESRS "quick fix" revision (effective 2026 reporting) cut mandatory data points by 57%. The platform must target the post-revision ESRS set. Confirm with the instructor which ESRS version this cohort will apply.

- **Ideal report content:** The instructor review view and examples component both require "ideal report" answers for the case study. This content does not exist yet and must be authored by the instructor. Plan this as a content deliverable separate from the technical build.

- **Case study data structure:** The PwC case study data that all 5 modules reference has not been documented in structured form. Different frameworks require different data transformations from the same source (GRI needs impact-materiality data; ISSB needs financial-materiality data; SBTi needs emissions data in specific scope categories). This must be mapped explicitly before schema design.

- **PDF table layout for @react-pdf/renderer:** No rowspan/colspan support in react-pdf. Complex tables (e.g., GRI Content Index) require custom flexbox-based table components or a third-party library (`@ag-media/react-pdf-table`). Allocate spike time in Phase 4.

---

## Sources

### Primary (HIGH confidence)

- [shadcn/ui Vite Installation](https://ui.shadcn.com/docs/installation/vite) — official Vite + React + shadcn/ui setup
- [React Hook Form](https://react-hook-form.com/) — v7.71 current, official documentation
- [Zod Official Docs](https://zod.dev/) — Zod 4 stable, TypeScript 5.5+ required
- [@react-pdf/renderer Compatibility](https://react-pdf.org/compatibility) — React 19 compatibility matrix
- [Zustand npm](https://www.npmjs.com/package/zustand) — v5.0.11, 20M weekly downloads
- [Vite Releases](https://vite.dev/releases) — v7.3.1, Node 20.19+ required
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4) — Oxide engine, zero-config
- [GRI Universal Standards](https://www.globalreporting.org/standards/) — GRI structure and disclosure requirements
- [IFRS S1/S2 Introduction](https://www.ifrs.org/sustainability/knowledge-hub/) — ISSB official structure
- [KPMG ISSB Illustrative Disclosures (Oct 2025)](https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/ifrg/2025/isg-2025-issb-ifs.pdf) — ISSB report format reference
- [SBTi Corporate Near-Term Criteria v5.3](https://files.sciencebasedtargets.org/production/files/SBTi-criteria.pdf) — SBTi target-setting structure
- [React Hook Form useWatch docs](https://react-hook-form.com/docs/usewatch) — useWatch vs watch performance
- [Zustand persist middleware](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md) — localStorage persistence

### Secondary (MEDIUM confidence)

- [EFRAG ESRS Knowledge Hub](https://knowledgehub.efrag.org/) — ESRS structure and 2025 revisions
- [Amended ESRS: What Changed for 2026](https://www.coolset.com/academy/the-amended-esrs-what-has-changed-and-what-it-means-for-2026-csrd-reporting) — 57% data point reduction
- [React Architecture Patterns and Best Practices (2025)](https://www.geeksforgeeks.org/reactjs/react-architecture-pattern-and-best-practices/) — general React architecture
- [react-pdf Table Layout Issues](https://github.com/diegomura/react-pdf/issues/3002) — rowspan/colspan limitations confirmed in GitHub issues
- [react-pdf Page Break Issues](https://github.com/diegomura/react-pdf/issues/2378) — dynamic component page break handling
- [Client-Side PDF Performance Improvement](https://dev.to/karanjanthe/how-we-improved-our-client-side-pdf-generation-by-5x-3n69) — PDF generation performance patterns
- [Preventing Data Loss in Web Forms](https://innolitics.com/articles/web-form-warn-on-nav/) — navigation guard patterns
- [State Management 2025](https://makersden.io/blog/react-state-management-in-2025) — Zustand vs Jotai vs Redux
- [PDF Libraries Comparison](https://dmitriiboikov.com/posts/2025/01/pdf-generation-comarison/) — jsPDF vs @react-pdf/renderer benchmarks

---

*Research completed: 2026-02-24*
*Ready for roadmap: yes*
