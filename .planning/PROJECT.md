# Sustainability Reporting Assessment Platform

## What This Is

A React-based assessment platform where MBA/graduate students apply sustainability reporting knowledge to a PwC-partnered case study. Students take a single fictional company's data and produce framework-accurate reports across 5 sustainability reporting standards (GRI, ISSB, CSRD, ESRS, SBTi). The platform captures their work as professionally formatted, downloadable reports that the instructor reviews side-by-side against ideal submissions.

## Core Value

Students can accurately translate case study data into properly structured sustainability reports across all 5 frameworks — and the instructor can efficiently review every submission side-by-side against the correct output.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] 5 module dashboard (GRI, ISSB, CSRD, ESRS, SBTi) — all accessible in any order
- [ ] Each module contains: reference content, examples, structured assessment form, live report preview
- [ ] Structured form input mirroring each framework's actual disclosure requirements
- [ ] Live preview showing framework-accurate report formatting as students fill in fields
- [ ] Downloadable PDF report output matching real framework formatting
- [ ] Reference material component — practitioner-focused, comparative lens, interview-ready differentiation (open-book during assessment)
- [ ] Example component — completed report excerpts, annotated samples with callouts, side-by-side cross-framework comparisons
- [ ] Single PwC case study applied across all 5 modules (same company, different frameworks)
- [ ] Instructor review view — side-by-side comparison of student submission vs. ideal report
- [ ] Corporate polished UI aesthetic — professional, structured, presentation-ready
- [ ] No authentication required (open access for now)
- [ ] Export-based data — students download their completed reports, no server-side storage
- [ ] ~30 concurrent students supported

### Out of Scope

- History/origins of each framework — practitioner focus only
- Automated grading or scoring — instructor provides all feedback manually
- In-app feedback or annotation tools — instructor gives feedback outside the platform
- User accounts or authentication — open access for v1
- Persistent server-side data storage — export-only model
- Mobile-optimized layout — desktop-first for classroom use
- Progressive module unlocking — all modules open from start

## Context

- Target audience: MBA/graduate students in sustainability or ESG-focused programs
- The PwC case study is instructor-created and will be provided to students outside the platform
- Students are expected to have foundational knowledge of these frameworks from coursework — the platform tests application, not teaches from scratch
- The content component serves as open-book reference material, not primary instruction
- The 5 frameworks have significant overlap (especially CSRD/ESRS) but distinct structures — the platform must make these distinctions crystal clear
- Class size ~30 students, single cohort
- Reporting frameworks covered:
  - **GRI** (Global Reporting Initiative) — voluntary, stakeholder-focused, modular standards
  - **ISSB** (International Sustainability Standards Board) — investor-focused, financial materiality
  - **CSRD** (Corporate Sustainability Reporting Directive) — EU regulatory, double materiality
  - **ESRS** (European Sustainability Reporting Standards) — the standards implementing CSRD
  - **SBTi** (Science Based Targets initiative) — climate-specific, emissions reduction targets

## Constraints

- **Tech stack**: React SPA — modern, component-based architecture
- **Deployment**: Web-based, no backend required for v1 (static hosting viable)
- **Framework accuracy**: Report templates must mirror actual disclosure requirements — not approximations
- **No auth complexity**: Open access keeps initial build focused on the assessment experience
- **Export format**: PDF output must look professional and framework-accurate

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Assessment-first, not teaching-first | Students already have foundational knowledge from coursework; platform tests application | — Pending |
| Structured form over drag-and-drop | Framework reports have defined sections/fields; structured forms mirror real report completion | — Pending |
| Instructor-only grading | Keeps grading nuanced and human; avoids complexity of automated rubrics | — Pending |
| Export-based, no backend | Simplifies v1 architecture; students own their outputs; no data management overhead | — Pending |
| Open-book reference material | Real-world reporting allows reference to standards; mirrors professional practice | — Pending |
| All modules open (no sequencing) | Instructor controls pacing via assignment; platform stays flexible | — Pending |

---
*Last updated: 2026-02-24 after initialization*
