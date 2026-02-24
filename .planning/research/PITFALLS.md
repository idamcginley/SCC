# Pitfalls Research

**Domain:** Sustainability Reporting Assessment Platform (structured forms, PDF generation, framework-accurate educational assessment)
**Researched:** 2026-02-24
**Confidence:** MEDIUM-HIGH (domain-specific pitfalls verified across multiple sources; framework structure details from official standards bodies)

## Critical Pitfalls

### Pitfall 1: Framework Structure Conflation -- Treating 5 Distinct Frameworks as Variations of One Template

**What goes wrong:**
Developers build a single generic "sustainability report form" and try to parameterize it for GRI, ISSB, CSRD, ESRS, and SBTi. The result is forms that are vaguely correct for all frameworks but accurately match none. Students produce reports that look professional but would fail real-world framework compliance review.

**Why it happens:**
The five frameworks share surface-level themes (emissions, governance, materiality) and developers assume the differences are cosmetic. In reality, the structural requirements are fundamentally different:
- **GRI** uses a modular disclosure-number system (e.g., GRI 302-1, GRI 305-1) with ~120 disclosure points across Universal, Sector, and Topic Standards. Reports require a GRI Content Index as a mandatory structural element.
- **ISSB (IFRS S1/S2)** organizes around four TCFD pillars (Governance, Strategy, Risk Management, Metrics & Targets) with industry-based metrics. It explicitly does NOT mandate a specific report structure -- companies choose presentation format.
- **CSRD/ESRS** requires double materiality assessment driving which of 12+ topical standards apply. ESRS has mandatory General Disclosures (ESRS 2) plus materiality-dependent topic disclosures. The 2025 "quick fix" revision cut mandatory data points by 57%, so the structure is a moving target.
- **SBTi** is not a reporting framework at all -- it is a target-setting and validation methodology with specific criteria for near-term (5-10yr, 1.5C-aligned) and long-term (net-zero by 2050) targets, with scope coverage thresholds (95% Scope 1+2, 67% Scope 3).

**How to avoid:**
Design 5 entirely separate form schemas from day one. Each framework module should have its own:
- Form field definitions (not shared)
- Validation rules (framework-specific required fields)
- Section ordering (matching the framework's own structure)
- PDF template (matching real-world report formatting conventions)

Use a shared component library (field types, layout primitives) but never share form structure between frameworks. Start by reading actual reports published under each framework and mapping their sections to form fields.

**Warning signs:**
- A single `frameworkFields.ts` config file that parameterizes all 5 frameworks
- Form sections named generically ("Environmental", "Social") rather than using framework-specific terminology (GRI's "Topic Disclosures", ISSB's "Strategy", ESRS's "Impact Materiality")
- Inability to answer "which exact disclosure number does this field map to?"

**Phase to address:**
Phase 1 (Foundation) -- Form schema architecture must be framework-specific from the start. Retrofitting generic forms to match specific frameworks is a rewrite.

---

### Pitfall 2: PDF Output That Looks Generic Instead of Framework-Accurate

**What goes wrong:**
The generated PDF reports use a single branded template with the framework name swapped in the header. The output does not match how real GRI, ISSB, or ESRS reports are actually structured and formatted. Instructors cannot use the reports to teach students what professional framework-compliant output looks like.

**Why it happens:**
PDF generation is treated as a downstream rendering problem ("just dump the form data into a template") rather than as a core educational deliverable. Each framework has distinct conventions:
- **GRI reports** require a GRI Content Index table (a matrix mapping disclosure numbers to page locations), plus individual disclosure sections with specific numbering.
- **ISSB reports** follow TCFD four-pillar structure with cross-references to financial statements, and KPMG's illustrative disclosures show specific formatting patterns.
- **ESRS reports** organize by topical standard (E1, E2, S1, etc.) with mandatory data point tables and specific formatting for quantitative vs. narrative disclosures.
- **SBTi** output is a target submission document with specific fields (base year, target year, boundary, ambition level), not a narrative report.

**How to avoid:**
Treat each framework's PDF template as a first-class design artifact. Before writing any code:
1. Collect 3-5 real-world published reports under each framework (GRI reports are publicly available in GRI's database; KPMG publishes ISSB illustrative disclosures)
2. Document the structural elements, section ordering, and formatting conventions for each
3. Design PDF templates that mirror these conventions
4. Validate templates with the instructor before implementation

**Warning signs:**
- All 5 PDF outputs share the same visual structure with only content differences
- No GRI Content Index in GRI reports
- ISSB reports not organized around Governance/Strategy/Risk Management/Metrics pillars
- SBTi output formatted as a narrative report instead of a structured target submission

**Phase to address:**
Phase 2 (PDF Generation) -- But the template design work should begin in Phase 1 alongside form schema design, since form structure and PDF structure must be aligned.

---

### Pitfall 3: Client-Side Data Loss in an Export-Only Architecture

**What goes wrong:**
Students spend 30-60 minutes filling in a framework module's form, then lose all their work due to accidental tab closure, browser crash, navigation within the SPA, or page refresh. With no backend and an export-only model, there is zero recovery path. In a classroom of 30 students, this WILL happen to multiple students, creating a frustrating classroom experience.

**Why it happens:**
The "no backend" constraint is interpreted as "no persistence." Developers focus on the export (PDF download) as the data output and neglect the in-progress data. localStorage/sessionStorage is not implemented, and no navigation guards exist.

**How to avoid:**
Implement a three-layer data protection strategy:
1. **Auto-save to localStorage** -- Persist form state on every meaningful change (debounced, not on every keystroke). Key by framework module. Use `JSON.stringify` with a version marker so schema changes do not silently corrupt saved data.
2. **Navigation guards** -- Use `beforeunload` event for browser-level navigation (tab close, refresh) AND React Router's `useBlocker` for in-app navigation. Show confirmation dialogs when unsaved changes exist.
3. **Session recovery** -- On module load, check localStorage for saved state and offer to restore it. Show a clear "Resume previous work" vs "Start fresh" choice.

Be aware of localStorage's 5MB per-origin limit. For 5 framework modules with potentially rich form data, this is more than sufficient (form data is text, not binary). But do implement error handling for `QuotaExceededError`.

**Warning signs:**
- No `useEffect` cleanup or save-on-unmount patterns
- No `beforeunload` event listener
- Form state lives only in React component state or context with no persistence layer
- No "unsaved changes" indicator in the UI

**Phase to address:**
Phase 1 (Foundation) -- Data persistence should be baked into the form architecture from the beginning, not bolted on later.

---

### Pitfall 4: CSRD/ESRS Overlap Confusion -- Building Two Modules for What Students See as One Framework

**What goes wrong:**
Students cannot understand why CSRD and ESRS are separate modules, because in practice ESRS ARE the standards that implement CSRD. The platform either (a) has confusing redundancy between the two modules, or (b) the instructor must spend significant time explaining the platform's structure instead of the content.

**Why it happens:**
CSRD is the EU directive (the law), and ESRS is the set of reporting standards that companies use to comply with CSRD. They are distinct in a regulatory sense, but from a reporting practitioner's perspective, "doing CSRD reporting" means "following ESRS." Building two entirely separate modules risks either duplicating content or creating artificial distinctions that confuse rather than educate.

**How to avoid:**
Design the CSRD module to focus on the directive-level requirements (who must report, when, double materiality assessment process, assurance requirements) while the ESRS module focuses on the actual disclosure standards (ESRS 2 General Disclosures, topical standards E1-E5, S1-S4, G1). Make the relationship explicit in the UI:
- CSRD module: "What must be reported and why" (regulatory context, materiality assessment)
- ESRS module: "How to report it" (specific data points, disclosure requirements, report structure)

Include clear cross-references between the two modules. The reference material should explicitly state: "ESRS are the technical standards that implement CSRD requirements."

**Warning signs:**
- Students asking "what's the difference between the CSRD and ESRS modules?"
- Duplicate form fields appearing in both modules
- CSRD module that is just ESRS with a different header
- No cross-referencing between the two modules

**Phase to address:**
Phase 1 (Content Architecture) -- The conceptual relationship between modules must be clear before building either. This is a content design decision, not a technical one.

---

### Pitfall 5: Instructor Review View That Does Not Support Efficient Grading

**What goes wrong:**
The side-by-side comparison view is technically functional (student submission on the left, ideal on the right) but practically unusable for reviewing 30 students across 5 frameworks (= 150 submissions). The instructor spends more time navigating the tool than actually reviewing content.

**Why it happens:**
Developers build the review view as a simple two-panel layout without considering the instructor's actual workflow: scanning for specific errors across many submissions, comparing how different students handled the same disclosure, and tracking which submissions have been reviewed.

**How to avoid:**
Design the instructor view around the grading workflow:
- **Section-level navigation** -- Jump directly to a specific disclosure/section rather than scrolling through entire reports
- **Diff highlighting** -- Visually highlight where student responses diverge from the ideal (not automated grading, but visual comparison aids)
- **Framework-specific anchoring** -- When reviewing GRI, show disclosure numbers prominently; when reviewing ESRS, show data point references
- **Submission tracking** -- Visual indicator of which students/modules have been reviewed
- **Quick switching** -- Navigate between students for the same framework without returning to a dashboard

**Warning signs:**
- Instructor review is just two PDF previews side by side with no interactivity
- No way to jump to specific sections
- No tracking of review progress
- Testing only with 1-2 mock submissions, not 30

**Phase to address:**
Phase 3 (Instructor Review) -- But the data model for student submissions must support section-level access from Phase 1 (do not store submissions as opaque blobs).

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Single shared form schema across frameworks | Faster initial development | Rewrite when framework accuracy is validated against real reports; every framework-specific fix becomes a regression risk for other frameworks | Never -- the whole point of the platform is framework accuracy |
| Hardcoding framework content in components | Quick to build first module | Content updates (ESRS 2025 revision cut 57% of data points) require code changes and redeployment; instructor cannot adjust content | MVP only if accompanied by a clear migration path to data-driven content |
| Generating PDFs by screenshotting the live preview | Avoids building separate PDF templates | Preview and PDF layouts inevitably diverge; no control over page breaks, headers, footers; unprofessional output | Never -- use @react-pdf/renderer or equivalent with purpose-built templates |
| Storing all form state in a single React context | Simple state management | Performance degradation as form complexity grows; every keystroke re-renders unrelated sections; difficult to implement per-module persistence | Acceptable if form sections are isolated into separate context providers |
| Using localStorage.setItem on every keystroke | Simple persistence | Main thread blocking on large forms; potential performance impact from synchronous JSON.stringify on complex nested objects | Never -- debounce saves (300-500ms) and batch updates |

## Integration Gotchas

Common mistakes when connecting components in this architecture.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Form state to PDF preview | Directly passing raw form state to PDF renderer, causing re-renders on every keystroke | Debounce the preview update (500ms+); memoize the PDF document component; consider generating preview only on explicit "Update Preview" action or section completion |
| Form state to localStorage | Saving entire form state as a single key, making partial recovery impossible | Save per-section or per-module, with a version/timestamp marker; use a consistent key naming scheme (e.g., `sra-{framework}-{section}`) |
| Live preview to downloadable PDF | Assuming the live preview component IS the PDF -- they serve different purposes | Live preview is an approximation for quick feedback (can use HTML/CSS); downloadable PDF must be framework-accurate (use @react-pdf/renderer with dedicated templates) |
| react-pdf/renderer tables | Assuming HTML table semantics (rowspan, colspan) work in react-pdf | react-pdf uses flexbox layout, not HTML tables. No rowspan/colspan support. Use @ag-media/react-pdf-table or build custom flexbox-based table components. Test table layouts early with realistic data volumes |
| Cross-framework data references | Assuming the PwC case study data maps identically to all 5 frameworks | Different frameworks require different data transformations from the same source. GRI needs impact-materiality driven data; ISSB needs financial-materiality driven data; SBTi needs emissions data in specific scope categories. Map data requirements per framework explicitly |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| Generating PDF on every form change for "live preview" | UI becomes sluggish after 10+ fields filled; typing lag | Debounce PDF regeneration; use HTML/CSS for live preview, reserve @react-pdf/renderer for final download only | Immediately with complex forms (20+ fields) |
| Uncontrolled re-renders in large forms | Typing in one field causes visible lag across the entire form | Use React Hook Form (uncontrolled inputs); isolate form sections into separate components with their own state | At 30+ form fields per module |
| Synchronous localStorage writes on every state change | Brief UI freezes during rapid data entry | Debounce writes (300-500ms); use requestIdleCallback for non-critical saves | When form state object exceeds ~50KB |
| Loading all 5 framework modules into memory simultaneously | Slow initial load; high memory usage | Lazy-load framework modules with React.lazy/Suspense; only mount the active module | At initial load with all framework data, schemas, and reference content bundled |
| PDF generation blocking main thread | Browser appears frozen for 2-5 seconds during PDF download | Use web workers for PDF generation if possible; show progress indicator; consider chunked rendering for long reports | Reports with 10+ pages, tables, multiple sections |

## Security Mistakes

Domain-specific security issues beyond general web security.

| Mistake | Risk | Prevention |
|---------|------|------------|
| Exposing ideal answers in client-side bundle | Students can view ideal/reference answers by inspecting the JavaScript bundle, undermining the assessment | Load ideal answers only in the instructor review view; if truly no backend, accept this limitation and document it clearly for the instructor. Consider: ideal answers could be a separate instructor-only deployment or URL-gated page |
| No input sanitization on form fields rendered in PDF | XSS via PDF injection -- malicious input in form fields could exploit PDF viewer vulnerabilities | Sanitize all user input before rendering in PDF; @react-pdf/renderer uses its own rendering engine (not HTML), which limits this risk, but still validate/sanitize text inputs |
| localStorage accessible to any script on the same origin | If the app is hosted on a shared domain (e.g., university hosting), other apps on that origin can read student form data | Use a unique localStorage key prefix; consider sessionStorage for more ephemeral data; document the limitation |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Overwhelming form length -- showing all disclosure fields at once | Students feel intimidated and lose track of progress; higher abandonment | Break each framework module into collapsible sections matching the framework's own structure (GRI: by disclosure category; ISSB: by TCFD pillar; ESRS: by topical standard). Show completion progress per section |
| No save/progress indicator | Students anxious about data loss; unsure if their work is being preserved | Show auto-save status ("Last saved: 2 minutes ago") prominently; visual completion indicators per section (checkmarks, progress bars) |
| Reference material buried behind navigation | Students constantly switching between the form and reference content, losing context | Use a split-pane or tabbed layout where reference material is accessible alongside the form without losing form context. Avoid full-page navigation to reference content |
| Generic field labels instead of framework terminology | Students do not learn the actual framework vocabulary; reports use wrong terminology | Use exact framework terminology in field labels (e.g., "GRI 305-1: Direct (Scope 1) GHG emissions" not "Greenhouse Gas Emissions"). Include framework-specific field descriptions |
| Live preview that does not scroll-sync with the form | Students cannot find the section they are editing in the preview; preview feels disconnected from input | Implement scroll-sync or section-highlighting in preview when form section is active; or use a "preview this section" button per form section |
| PDF download with no filename convention | Students end up with 5 files all named "report.pdf", causing confusion when submitting | Auto-generate filenames with framework and student-identifiable info: `GRI_Report_2026.pdf`, or let students enter their name once and include it in all downloads |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Form completion:** Often missing required-field validation per framework requirements -- verify that each framework's mandatory disclosures are enforced as required fields, not just optional inputs
- [ ] **PDF output:** Often missing page numbers, table of contents, GRI Content Index (for GRI), headers/footers with framework identification -- verify against a real published report for each framework
- [ ] **Live preview:** Often missing page break handling -- verify that the preview shows realistic page breaks, not an infinite scroll that does not match the PDF output
- [ ] **ESRS module:** Often missing the materiality-based logic -- ESRS disclosures depend on which topics are material; the form should not show all possible topic disclosures as mandatory. Verify that the form guides students through materiality determination first
- [ ] **SBTi module:** Often built as a reporting module when SBTi is a target-setting methodology -- verify that the form captures target-setting inputs (base year emissions, reduction pathway, scope boundaries) not report narratives
- [ ] **Cross-framework consistency:** Often missing -- verify that the same case study company data can be consistently referenced across all 5 modules; conflicting numbers across frameworks would undermine the exercise
- [ ] **Instructor review:** Often missing -- export/import mechanism for student submissions to reach the instructor; with no backend, how does the instructor get the student's form data (not just the PDF)? Verify the data flow end-to-end
- [ ] **Reference content:** Often missing framework-specific examples -- verify each module has annotated real-world examples, not generic sustainability content

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Generic form schema (Pitfall 1) | HIGH | Must redesign form schemas per framework; existing form data in localStorage may be incompatible with new schemas; implement schema migration or clear-and-restart |
| Generic PDF templates (Pitfall 2) | MEDIUM | PDF templates can be rebuilt independently of form logic; requires collecting reference reports and redesigning templates; form data model should not need changes if field mappings are correct |
| No data persistence (Pitfall 3) | LOW | localStorage persistence can be added without changing form architecture; navigation guards are additive; main cost is testing across browsers |
| CSRD/ESRS confusion (Pitfall 4) | MEDIUM | Requires content restructuring and potentially form redesign for the CSRD module; ESRS module likely needs less change; reference content rewrite needed |
| Unusable instructor review (Pitfall 5) | MEDIUM-HIGH | If student data is stored as opaque blobs (just PDFs), adding section-level review requires changing the data export format and rebuilding the review UI; if form data is structured, the review UI can be rebuilt independently |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Framework structure conflation | Phase 1: Form Architecture | Each framework module has its own schema file; field names use framework-specific terminology; schema validated against official framework documentation |
| Generic PDF output | Phase 2: PDF Generation | PDF output for each framework compared side-by-side with a real published report under that framework; instructor sign-off on template accuracy |
| Client-side data loss | Phase 1: Foundation | Test: fill form, close tab, reopen -- data restored. Test: navigate away mid-form -- confirmation dialog appears. Test: clear localStorage -- graceful "no saved data" state |
| CSRD/ESRS confusion | Phase 1: Content Architecture | User test with 2-3 students: "Explain the difference between the CSRD and ESRS modules." If they cannot articulate it, the design has failed |
| Unusable instructor review | Phase 3: Instructor Review | Test with 10+ mock submissions; instructor can review all submissions for one framework in under 30 minutes; section-level navigation works |
| Ideal answers exposed in client bundle | Phase 3: Instructor Review | Ideal answers are NOT present in the student-facing build; verify by inspecting the production bundle |
| PDF table layout failures | Phase 2: PDF Generation | Generate PDFs with maximum-length content in all table cells; verify no overlapping text, no cut-off content, correct page breaks across tables |
| Form performance degradation | Phase 1: Form Architecture | Fill the largest framework form (likely ESRS) completely; no perceptible typing lag; profile with React DevTools for unnecessary re-renders |
| Live preview sync issues | Phase 2: Live Preview | Edit a field in section 3 of 5; preview updates within 1 second and scrolls/highlights the relevant section |

## Sources

- [Top 5 Mistakes in Sustainability Reporting](https://iriscarbon.com/top-5-mistakes-in-sustainability-reporting-a-guide-to-avoiding-pitfalls/) -- Domain pitfalls in sustainability reporting content
- [GRI Universal Standards](https://www.globalreporting.org/standards/standards-development/universal-standards/) -- GRI structure and disclosure requirements
- [EFRAG ESRS Knowledge Hub](https://knowledgehub.efrag.org/eng/interactive/esrs-set-1/esrs-1-general-requirements/2025-11-10-quick-fix) -- ESRS structure and 2025 revisions
- [ISSB Introduction](https://www.ifrs.org/sustainability/knowledge-hub/introduction-to-issb-and-ifrs-sustainability-disclosure-standards/) -- IFRS S1/S2 structure
- [KPMG ISSB Illustrative Disclosures (Oct 2025)](https://assets.kpmg.com/content/dam/kpmgsites/xx/pdf/ifrg/2025/isg-2025-issb-ifs.pdf) -- ISSB report formatting reference
- [SBTi Corporate Near-Term Criteria v5.3](https://files.sciencebasedtargets.org/production/files/SBTi-criteria.pdf) -- SBTi target-setting structure
- [Amended ESRS: What Changed for 2026](https://www.coolset.com/academy/the-amended-esrs-what-has-changed-and-what-it-means-for-2026-csrd-reporting) -- ESRS data point reduction (57%)
- [ESRS Data Points Breakdown](https://www.getsunhat.com/blog/esrs-datapoints-list-guide) -- ESRS data point structure
- [PwC Double Materiality Assessment](https://www.pwc.nl/en/topics/sustainability/esg/corporate-sustainability-reporting-directive/csrd-double-materiality-assessment.html) -- DMA implementation challenges
- [react-pdf Table Layout Issues](https://github.com/diegomura/react-pdf/issues/3002) -- rowspan/colspan limitations
- [react-pdf Page Break Issues](https://github.com/diegomura/react-pdf/issues/2378) -- Dynamic component page break handling
- [6 PDF Libraries for React 2025](https://dev.to/ansonch/6-open-source-pdf-generation-and-modification-libraries-every-react-dev-should-know-in-2025-13g0) -- Library comparison
- [Client-Side PDF Performance Improvement](https://dev.to/karanjanthe/how-we-improved-our-client-side-pdf-generation-by-5x-3n69) -- PDF generation performance
- [Preventing Data Loss in Web Forms](https://innolitics.com/articles/web-form-warn-on-nav/) -- Navigation guard patterns
- [React State Persistence with localStorage](https://medium.com/@roman_j/mastering-state-persistence-with-local-storage-in-react-a-complete-guide-1cf3f56ab15c) -- localStorage patterns and limitations
- [Multi-Step Form with RHF and Zod](https://blog.logrocket.com/building-reusable-multi-step-form-react-hook-form-zod/) -- Form architecture patterns
- [SPA Browser Storage Guide](https://blog.mikihands.com/en/whitedec/2025/11/17/spa-react-browser-storage-complete-guide/) -- Storage API comparison

---
*Pitfalls research for: Sustainability Reporting Assessment Platform*
*Researched: 2026-02-24*
