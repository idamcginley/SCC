# Feature Research

**Domain:** Sustainability reporting assessment/education platform (MBA-level, 5 frameworks, structured form input, PDF export, instructor review)
**Researched:** 2026-02-24
**Confidence:** MEDIUM-HIGH (framework structures well-documented; educational assessment patterns well-established; niche intersection of ESG reporting + education is underserved, so feature landscape derives from both domains independently)

---

## Feature Landscape

### Table Stakes (Users Expect These)

These are non-negotiable. Without them, the platform is unusable for its stated purpose: students producing framework-accurate reports and instructors reviewing them.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **5-module dashboard with clear navigation** | Students need to find and access each framework module (GRI, ISSB, CSRD, ESRS, SBTi) without confusion. This is the front door. | LOW | Simple card/grid layout. All modules visible and accessible from start (no progressive unlock). Status indicators showing completion progress per module are a natural extension. |
| **Structured assessment forms mirroring actual disclosure requirements** | The entire pedagogical value depends on students filling in fields that map 1:1 to real framework sections. Generic free-text defeats the purpose. GRI has ~30 General Disclosures organized into 5 sections; ISSB uses Governance/Strategy/Risk Management/Metrics & Targets pillars; ESRS has cross-cutting (ESRS 1, ESRS 2) plus 10 topical standards; SBTi requires Scope 1/2/3 emissions data, base year, target year, and methodology. | HIGH | This is the hardest feature. Each framework has a different structure, different field types (text, numeric, dropdowns, date pickers), and different validation requirements. Must be framework-accurate, not approximated. Expect ~150-250 total fields across all 5 modules. Requires deep content expertise from the instructor to define the field schema for each framework. |
| **Live preview of framework-formatted report** | Students need to see what their report will look like as they fill in fields -- this is how they learn what a proper disclosure looks like. "Fill field, see result" creates immediate feedback loops. Reporting software universally offers preview. | MEDIUM | Split-pane or toggleable preview that renders form inputs into a formatted report layout. Each framework's preview must match that framework's actual report structure (GRI Content Index format, ISSB four-pillar layout, ESRS disclosure requirement format, SBTi target summary format). Must update in real-time as fields change. |
| **PDF export of completed report** | The deliverable. Students download a professional, framework-formatted PDF to submit. This is what the instructor reviews. Without export, there is no assessment artifact. | MEDIUM | Use @react-pdf/renderer for React-native PDF generation. Each framework needs its own PDF template matching real-world report formatting. Must include proper headers, section numbering, disclosure reference codes, and professional typography. |
| **Reference material component per module** | Students need open-book access to framework-specific guidance, key definitions, disclosure requirement explanations, and practitioner-focused context. PROJECT.md specifies: practitioner-focused, comparative lens, interview-ready differentiation. | MEDIUM | Collapsible/tabbed reference panel within each module. Content is static (instructor-authored), but presentation must be scannable -- not a wall of text. Key elements: framework overview, disclosure requirement descriptions, materiality approach, key terminology, and how this framework differs from the others. |
| **Example component per module** | Students need to see what "good" looks like before producing their own work. Completed report excerpts, annotated samples with callouts, and cross-framework comparisons. | MEDIUM | Could be a separate tab or expandable section within each module. Annotated examples with callout markers explaining why specific disclosures are structured a certain way. Must show real (or realistic) report excerpts, not abstract descriptions. |
| **Instructor review view: side-by-side student vs. ideal** | The instructor's core workflow. Must display the student's submitted report next to the ideal/model report for that framework, enabling visual comparison. Without this, the instructor reverts to manually opening two documents side by side. | MEDIUM | Two-panel layout: student submission on left, ideal report on right. Both rendered in the same framework-formatted layout for visual consistency. Instructor needs to be able to load any student's export and compare it. The ideal report is instructor-authored and stored as reference data. |
| **Form data persistence (autosave to localStorage)** | Students working through ~150+ fields across 5 modules cannot lose their work to an accidental tab close or browser crash. No backend means localStorage is the persistence layer. | LOW | Use react-hook-form with react-hook-form-persist or a custom usePersistedState hook. Debounced saves (300ms). Clear indication of save status. Per-module storage keys. ~5MB localStorage limit is ample for form text data. |
| **Single case study context accessible across all modules** | The PwC case study data (company profile, financials, emissions data, workforce data, governance structure) must be accessible from within any module, since all 5 frameworks report on the same fictional company. | LOW | Persistent sidebar, modal, or dedicated tab showing case study data. Must be available from any module without navigating away from the form. Case study content is static, instructor-provided. |
| **Professional/corporate UI aesthetic** | PROJECT.md specifies "corporate polished" and "presentation-ready." MBA students and instructor expect a platform that looks like enterprise software, not a homework app. | MEDIUM | Clean typography, consistent spacing, professional color palette (think Bloomberg Terminal meets Figma -- dark blues, whites, subtle accents). Component library like shadcn/ui or Radix provides the polish without custom design work. |

### Differentiators (Competitive Advantage)

These features are not expected in a basic assessment tool but would meaningfully elevate the platform. They align with the core value proposition of framework-accurate, cross-framework sustainability education.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Cross-framework comparison view** | The unique pedagogical insight of this course is that students apply 5 different frameworks to the SAME company. A comparison view showing how the same data point (e.g., GHG emissions) is disclosed differently under GRI vs. ISSB vs. ESRS vs. SBTi makes this insight visceral. No existing ESG software targets this educational cross-walk. | HIGH | Matrix or side-by-side view showing equivalent disclosures across frameworks. Maps to the GRI-ESRS Interoperability Index concept but applied educationally. Requires a data model that knows which fields across frameworks address the same underlying topic (e.g., "climate governance" appears in GRI 2-12, ISSB S2 Governance, ESRS E1 GOV-3, and SBTi methodology). |
| **Framework structure visualization** | Interactive diagram showing the hierarchy and structure of each framework (GRI's Universal/Sector/Topic Standards tree, ESRS's cross-cutting + topical standards, ISSB's four pillars, SBTi's scope-based target flow). Helps students understand the architecture before filling in fields. | MEDIUM | Could be a simple interactive tree/accordion or a more visual diagram. Not just a table of contents -- a navigable map that orients students within the framework's logic. Click a node to jump to that section in the form. |
| **Completion progress tracking per module** | Visual indicator showing how much of each framework's form has been filled in. Gamification-lite: progress bars, section completion checkmarks, overall dashboard percentage. Provides motivation and helps students know what is left. | LOW | Count filled vs. total fields per section and per module. Display as progress bar on dashboard cards and within each module's navigation. Simple state computation, no backend needed. |
| **Inline field-level guidance and validation** | Contextual help on individual form fields: what this disclosure requires, common mistakes, example text, and whether the input meets minimum quality thresholds (e.g., "SBTi base year must be no earlier than 2015" or "GRI disclosure requires reporting period"). | MEDIUM | Tooltip/popover on each field with guidance text. Basic validation rules (required fields, numeric ranges, date formats). Not automated grading -- just guardrails that prevent obvious errors. Instructor defines the guidance text per field. |
| **Export as JSON/data bundle for instructor import** | Instead of just PDF, export the raw form data as a structured JSON file. Instructor's review view can then import this JSON to render the student's submission in the side-by-side comparison view, rather than relying on PDF comparison. | LOW | JSON serialization of form state, downloaded alongside or instead of PDF. Instructor review view has a file upload that ingests JSON and renders it in the framework template. Much more powerful than comparing two PDFs. |
| **Keyboard navigation and accessibility** | Full keyboard navigation through forms, ARIA labels on all interactive elements, screen reader compatibility. Not just compliance -- good form UX for power users filling in 50+ fields. | MEDIUM | Use semantic HTML, proper label associations, tab order management. Libraries like Radix UI / shadcn/ui handle most of this out of the box. Worth the investment for a professional platform. |
| **Print-optimized CSS for report preview** | Students can print the preview directly from the browser with framework-accurate formatting, as an alternative to PDF download. | LOW | @media print styles on the preview component. Quick win that provides an alternative export path. |

### Anti-Features (Deliberately NOT Building)

These features seem logical but would add complexity without proportional value, contradict the project's design decisions, or are explicitly out of scope per PROJECT.md.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Automated grading/scoring** | Seems natural for an assessment platform; reduces instructor workload. | PROJECT.md explicitly excludes this. Sustainability report quality is highly subjective -- it requires expert judgment on materiality assessments, narrative quality, and framework interpretation. Automated rubrics would either be too rigid (penalizing valid alternative approaches) or too permissive (missing nuanced errors). The instructor's manual review IS the assessment. | Side-by-side comparison view with ideal report. Instructor's expert eye is the grading mechanism. |
| **User accounts and authentication** | Standard for any multi-user platform. Enables tracking submissions, preventing cheating, managing access. | Explicitly out of scope for v1. Class is ~30 students in a trusted environment. Auth adds: login flow, password management, session handling, potentially a backend. All complexity for a single-cohort deployment. | Students identified by name field in export. Open access. If future cohorts need auth, add it then. |
| **Server-side data storage / backend** | Enables submission tracking, real-time instructor monitoring, centralized data management. | Explicitly out of scope. Adds hosting costs, backend development, database management, API layer, deployment complexity. The export-based model (PDF + JSON to instructor) works for ~30 students. | localStorage for autosave, file export for submission. Static hosting (Vercel/Netlify) keeps deployment trivial. |
| **In-app feedback/annotation tools** | Instructor could annotate student reports directly in the platform, like Google Docs comments. | PROJECT.md explicitly excludes this. Building a document annotation system is a major feature in itself (selection ranges, comment threading, persistence). Instructor provides feedback through their own channels (LMS, email, class discussion). | Instructor uses side-by-side view for review, provides feedback externally. |
| **Mobile-responsive layout** | Modern web apps "should" work on mobile. | Explicitly out of scope. This is a desktop classroom tool. The forms have ~50+ fields per module with split-pane preview. Mobile would require a completely different UX. Effort better spent on desktop excellence. | Desktop-first, minimum width ~1024px. Graceful degradation message on small screens. |
| **Progressive module unlocking / sequencing** | Guides students through modules in a pedagogically optimal order. | Explicitly out of scope. Instructor controls pacing via assignment deadlines and class schedule. Locking modules removes flexibility (e.g., a student who wants to start with SBTi because they are interested in climate targets). | All modules open. Dashboard shows completion status for instructor to monitor pacing. |
| **Real-time collaboration** | Multiple students editing simultaneously, Google Docs style. | Each student produces their own individual report. There is no collaborative authorship use case. This is assessment, not group work. Adding real-time sync (CRDT/OT) would be enormous complexity for zero value. | Each student works independently in their own browser. |
| **AI-powered writing assistance** | LLM integration to help students draft disclosures. | Defeats the purpose. The assessment tests whether STUDENTS can translate case study data into framework-accurate reports. AI assistance would undermine the learning objective. | Reference materials and examples provide guidance. The student does the thinking. |
| **Multi-case-study support** | Platform supports multiple different companies / case studies. | Single case study is the design. Building case study management (CRUD, selection, different data sets) adds complexity for a single-cohort deployment. | One case study, hardcoded or loaded from a static JSON/markdown file. If a second cohort uses a different case study, swap the file. |
| **Internationalization (i18n)** | Framework standards are used globally. | This is an English-language MBA course at a specific institution. Frameworks themselves publish in English. Zero current need for translation. | English only. |

---

## Feature Dependencies

```
[Structured Assessment Forms] (per framework)
    |
    |--requires--> [Case Study Data] (forms reference the case study company data)
    |
    |--enables---> [Live Report Preview] (preview renders form data)
    |                  |
    |                  |--enables---> [PDF Export] (export renders same data as preview)
    |                  |
    |                  |--enables---> [Print CSS] (print styles on preview)
    |
    |--enables---> [JSON Export] (serializes form state)
    |                  |
    |                  |--enables---> [Instructor Review View] (imports JSON to render student work)
    |
    |--enables---> [Completion Progress Tracking] (counts filled fields)
    |
    |--enables---> [Cross-Framework Comparison View] (compares equivalent fields across modules)

[Reference Material Component]
    |
    |--enhances--> [Structured Assessment Forms] (students consult reference while filling forms)

[Example Component]
    |
    |--enhances--> [Structured Assessment Forms] (students see model before producing own work)
    |
    |--partially-overlaps--> [Instructor Review View] (ideal report data powers both the example and the "ideal" side of instructor comparison)

[Form Data Persistence (localStorage)]
    |
    |--supports--> [Structured Assessment Forms] (prevents data loss)

[5-Module Dashboard]
    |
    |--requires--> [Structured Assessment Forms] (dashboard links to modules)
    |--enhanced-by--> [Completion Progress Tracking] (dashboard shows per-module progress)

[Professional UI / Component Library]
    |
    |--supports--> ALL features (consistent styling baseline)
```

### Dependency Notes

- **Structured Assessment Forms require Case Study Data:** Forms cannot be designed without knowing what data the student is working from. The case study determines which fields are relevant and what realistic inputs look like.
- **Live Preview requires Structured Forms:** Preview renders form state. Forms must exist first. Both the preview template and the form schema must be designed in tandem for each framework.
- **PDF Export requires Live Preview template:** The PDF uses the same layout/template as the live preview, just rendered to PDF instead of DOM. Build preview first, then adapt to @react-pdf/renderer.
- **JSON Export enables Instructor Review View:** The instructor review view imports JSON to render student submissions. Without JSON export, the instructor would compare PDFs visually (worse experience).
- **Cross-Framework Comparison requires all 5 form schemas:** You need a cross-walk mapping of which fields in each framework address the same topic. This can only be built after all 5 framework schemas exist.
- **Example Component partially overlaps Instructor Review View:** The "ideal report" data that powers the instructor's comparison view is the same content used in the example component's annotated samples. Design these together to avoid duplication.

---

## MVP Definition

### Launch With (v1)

Minimum viable product -- what is needed for the first class session where students use the platform.

- [ ] **5-module dashboard** -- Students must be able to navigate to each framework module
- [ ] **Structured assessment forms for all 5 frameworks** -- The core deliverable; without these, there is no assessment
- [ ] **Case study data component** -- Students need access to the company data they are reporting on
- [ ] **Reference material per module** -- Open-book reference is specified as a requirement
- [ ] **Example component per module** -- Students need model reports to learn from
- [ ] **Live report preview** -- Immediate feedback as students fill in fields; core to the learning experience
- [ ] **PDF export** -- The submission artifact; students must be able to download their completed report
- [ ] **Form data persistence (localStorage autosave)** -- Data loss on a 150+ field form would be catastrophic for student experience
- [ ] **Professional/corporate UI** -- First impression matters for MBA students; unprofessional UI undermines credibility

### Add After Validation (v1.x)

Features to add once the core platform is in use and the instructor confirms the workflow works.

- [ ] **JSON export + Instructor review view (side-by-side)** -- Add after first assignment cycle; instructor can use PDF comparison initially, JSON-powered side-by-side is the polished version
- [ ] **Completion progress tracking** -- Nice to have for first session, but not blocking; add after seeing how students actually use the modules
- [ ] **Inline field-level guidance** -- Add after seeing which fields students struggle with most; instructor feedback from first cohort informs which fields need help text
- [ ] **Cross-framework comparison view** -- The most powerful differentiator but also the highest complexity; add after all 5 form schemas are stable and the cross-walk mapping can be validated

### Future Consideration (v2+)

Features to defer until the platform is proven with one cohort and potentially expanding.

- [ ] **Framework structure visualization** -- Interactive framework architecture diagrams; polish feature, not essential
- [ ] **Keyboard navigation / accessibility audit** -- Important for a production platform; less critical for a single-cohort classroom tool
- [ ] **Print-optimized CSS** -- Minor convenience over PDF download
- [ ] **Multi-case-study support** -- Only if a second cohort uses different case study data
- [ ] **Authentication** -- Only if platform expands beyond a single trusted classroom

---

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Structured assessment forms (5 frameworks) | HIGH | HIGH | P1 |
| Live report preview | HIGH | MEDIUM | P1 |
| PDF export | HIGH | MEDIUM | P1 |
| 5-module dashboard | HIGH | LOW | P1 |
| Case study data component | HIGH | LOW | P1 |
| Reference material component | HIGH | MEDIUM | P1 |
| Example component | HIGH | MEDIUM | P1 |
| Form data persistence (localStorage) | HIGH | LOW | P1 |
| Professional UI (component library) | MEDIUM | MEDIUM | P1 |
| Instructor review view (side-by-side) | HIGH | MEDIUM | P2 |
| JSON export for instructor import | MEDIUM | LOW | P2 |
| Completion progress tracking | MEDIUM | LOW | P2 |
| Inline field-level guidance | MEDIUM | MEDIUM | P2 |
| Cross-framework comparison view | HIGH | HIGH | P2 |
| Framework structure visualization | LOW | MEDIUM | P3 |
| Print-optimized CSS | LOW | LOW | P3 |
| Keyboard nav / accessibility | MEDIUM | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch -- the platform is non-functional without these
- P2: Should have, add once core is stable -- significantly improves the experience
- P3: Nice to have, future consideration -- polish and expansion features

---

## Competitor Feature Analysis

This platform exists at the intersection of two domains. There are no direct competitors doing exactly this (educational cross-framework sustainability report authoring). The competitive landscape is:

| Feature | ESG Reporting Software (e.g., IntegrityNext, Persefoni, Sweep) | Educational Assessment Platforms (e.g., Gradescope, Formative) | This Platform's Approach |
|---------|---------------------------------------------------------------|--------------------------------------------------------------|--------------------------|
| Framework-structured forms | Yes -- enterprise-grade, multi-framework. Data integration with ERP/HR systems. | No -- generic rubric/question-based assessment. | Framework-accurate structured forms, but educational: single case study, no data integrations. Forms mirror real disclosure requirements as a teaching tool. |
| Live preview | Some offer report preview before export. | Real-time progress visibility for instructors. | Split-pane live preview that shows the framework-formatted report updating as students type. Preview IS the learning mechanism. |
| PDF export | Professional reports aligned to CSRD, GRI, ISSB. XBRL/iXBRL tagging for regulatory filing. | Export grades/results. | Professional PDFs matching real framework formatting. No XBRL (not regulatory). Focus is on the report looking like a real sustainability report. |
| Instructor review | Audit/assurance readiness. Reviewer access modes. | Rubric-based grading, AI-assisted grouping (Gradescope), real-time monitoring (Formative). | Side-by-side: student submission vs. ideal report. No automated scoring. The comparison IS the review tool. |
| Cross-framework mapping | GRI-ESRS Interoperability Index. Data point mapping across frameworks. Enterprise data normalization. | Not applicable. | Educational cross-walk showing students how the same company data is disclosed differently under each framework. Novel for education. |
| Reference materials | Built-in regulatory knowledge, compliance guidance. | Study materials, rubric descriptions. | Practitioner-focused, comparative, interview-ready framework guides. Not compliance guidance -- career preparation. |
| Data persistence | Server-side, database-backed. Multi-user, enterprise-grade. | Server-side, LMS integration. | localStorage only. No accounts, no backend. Export-based submission model. Simplicity is a feature, not a limitation. |
| Scale | Thousands of users, multi-entity, global regulatory coverage. | Hundreds to thousands of students per course. | ~30 concurrent students, single cohort, single case study. Intentionally small scope. |

---

## Sources

- [STARS - Sustainability Tracking, Assessment & Rating System](https://stars.aashe.org/) -- university sustainability assessment framework
- [Top 12 sustainability reporting platforms (ESG) 2026](https://www.energycap.com/blog/sustainability-reporting-platform/) -- ESG software landscape
- [14 Must-Haves for ESG Management Software 2025](https://ecoactivetech.com/best-esg-management-software-features/) -- enterprise ESG feature requirements (MEDIUM confidence)
- [GRI Content Index Template](https://www.globalreporting.org/reporting-support/reporting-tools/content-index-template/) -- GRI official report structure (HIGH confidence)
- [GRI 2: General Disclosures 2021](https://www.globalreporting.org/publications/documents/english/gri-2-general-disclosures-2021/) -- GRI disclosure structure (HIGH confidence)
- [IFRS S1 and S2 Introduction](https://www.ifrs.org/sustainability/knowledge-hub/introduction-to-issb-and-ifrs-sustainability-disclosure-standards/) -- ISSB official structure (HIGH confidence)
- [KPMG ISSB Illustrative Disclosures 2025](https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/ifrg/2025/isg-2025-issb-ifs.pdf) -- ISSB report format examples (HIGH confidence)
- [ESRS Cross-Cutting Standards Guide](https://www.getsunhat.com/blog/esrs-cross-cutting-standards) -- ESRS structure overview (MEDIUM confidence)
- [CSRD ESRS Practical Implementation Guide](https://www.getsunhat.com/blog/navigating-the-csrd-standards-a-practical-guide-to-implement-disclosure-processes-with-esrs-checklist) -- ESRS implementation (MEDIUM confidence)
- [SBTi Resources and Target Setting Tool](https://sciencebasedtargets.org/resources) -- SBTi tool structure (HIGH confidence)
- [GRI-ESRS Interoperability and Cross-Framework Mapping](https://iriscarbon.com/blog/esg-framework-data-mapping-guide/) -- cross-framework mapping concepts (MEDIUM confidence)
- [React PDF Libraries Comparison 2025](https://blog.react-pdf.dev/6-open-source-pdf-generation-and-modification-libraries-every-react-dev-should-know-in-2025) -- PDF generation options (MEDIUM confidence)
- [react-hook-form-persist](https://www.npmjs.com/package/react-hook-form-persist) -- form autosave solution (HIGH confidence)
- [Gradescope Grading Guides](https://guides.gradescope.com/hc/en-us/articles/22249389005709-Grading-submissions-with-rubrics) -- instructor review patterns (HIGH confidence)
- [ESG Sustainability Reporting Self-Assessment Tool (EU)](https://digital-skills-jobs.europa.eu/en/inspiration/good-practices/esg-sustainability-reporting-self-assessment-tool-developing-green-and) -- educational ESG self-assessment (MEDIUM confidence)

---
*Feature research for: Sustainability Reporting Assessment Platform*
*Researched: 2026-02-24*
