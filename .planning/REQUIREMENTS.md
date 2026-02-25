# Requirements: Sustainability Reporting Assessment Platform

**Defined:** 2026-02-24
**Core Value:** Students can accurately translate case study data into properly structured sustainability reports across all 5 frameworks — with framework-perfect form schemas as the source of truth.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Foundation

- [x] **FOUND-01**: React + Vite + TypeScript project with Tailwind CSS and shadcn/ui component library
- [x] **FOUND-02**: Module dashboard landing page with 5 framework cards (GRI, ISSB, CSRD, ESRS, SBTi) showing module status
- [x] **FOUND-03**: Corporate polished visual theme — professional typography, clean layout, muted sustainability palette

### Assessment Forms

- [ ] **FORM-01**: GRI module with structured form mirroring GRI Standards disclosure requirements
- [ ] **FORM-02**: ISSB module with structured form mirroring IFRS S1/S2 disclosure requirements
- [ ] **FORM-03**: CSRD module with structured form mirroring CSRD reporting requirements
- [ ] **FORM-04**: ESRS module with structured form mirroring ESRS disclosure requirements
- [ ] **FORM-05**: SBTi module with structured form mirroring SBTi target-setting methodology
- [x] **FORM-06**: Form validation enforcing required fields and framework-specific rules via Zod schemas
- [ ] **FORM-07**: Live HTML preview showing framework-formatted report updating in real-time as student types

### Output

- [ ] **OUT-01**: PDF export per module generating a professionally formatted, framework-accurate downloadable report
- [ ] **OUT-02**: Cross-framework comparison view showing how the same case study data maps across different frameworks

### Content

- [ ] **CONT-01**: Framework differentiator quick-reference comparing all 5 frameworks (purpose, audience, structure, key terms)

### Framework Accuracy

- [x] **ACCU-01**: GRI form schema mirrors actual GRI Universal Standards structure (GRI 1, 2, 3 + Topic Standards)
- [ ] **ACCU-02**: ISSB form schema mirrors actual IFRS S1/S2 four-pillar structure (Governance, Strategy, Risk Management, Metrics & Targets)
- [ ] **ACCU-03**: CSRD form schema mirrors actual CSRD reporting requirements and double materiality approach
- [ ] **ACCU-04**: ESRS form schema mirrors actual ESRS disclosure requirements (cross-cutting + topical standards)
- [ ] **ACCU-05**: SBTi form schema mirrors actual SBTi target-setting requirements (Scope 1, 2, 3 emissions targets)

## v2 Requirements

### Persistence & Auth

- **PERS-01**: localStorage auto-save so students can resume across sessions
- **AUTH-01**: Student login with class access codes
- **AUTH-02**: Instructor dashboard with student list and completion tracking

### Instructor Review

- **INST-01**: Side-by-side comparison view (student submission vs. ideal report)
- **INST-02**: JSON data import for structured review beyond PDF
- **INST-03**: Batch review mode for reviewing all 30 students per framework

### Content Depth

- **CONT-02**: Reference material — practitioner-focused framework overviews accessible during assessment
- **CONT-03**: Annotated example reports with callouts explaining each disclosure section
- **CONT-04**: Cross-framework example comparisons showing same data under different frameworks

### Progress & Gamification

- **PROG-01**: Progress tracking per module (visual completion indicator)
- **PROG-02**: Module completion certificates

## Out of Scope

| Feature | Reason |
|---------|--------|
| Framework history/origins | Practitioner focus only — students learn history in class |
| Automated grading/scoring | Instructor provides all feedback manually via exported PDFs |
| In-app annotation/feedback | Feedback delivered outside the platform |
| Backend/database | Export-only model; no server-side storage for v1 |
| Mobile-optimized layout | Desktop-first for classroom use |
| Progressive module unlocking | All modules open; instructor controls pacing via assignments |
| Real-time collaboration | Single-student assessment tool |
| AI-powered feedback | Human instructor review is the feedback mechanism |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 | Phase 1 | Complete |
| FOUND-02 | Phase 1 | Complete |
| FOUND-03 | Phase 1 | Complete |
| FORM-01 | Phase 2 | Pending |
| FORM-02 | Phase 3 | Pending |
| FORM-03 | Phase 3 | Pending |
| FORM-04 | Phase 3 | Pending |
| FORM-05 | Phase 3 | Pending |
| FORM-06 | Phase 2 | Complete |
| FORM-07 | Phase 2 | Pending |
| OUT-01 | Phase 2 | Pending |
| OUT-02 | Phase 4 | Pending |
| CONT-01 | Phase 4 | Pending |
| ACCU-01 | Phase 2 | Complete |
| ACCU-02 | Phase 3 | Pending |
| ACCU-03 | Phase 3 | Pending |
| ACCU-04 | Phase 3 | Pending |
| ACCU-05 | Phase 3 | Pending |

**Coverage:**
- v1 requirements: 18 total
- Mapped to phases: 18
- Unmapped: 0

---
*Requirements defined: 2026-02-24*
*Last updated: 2026-02-24 after roadmap creation*
