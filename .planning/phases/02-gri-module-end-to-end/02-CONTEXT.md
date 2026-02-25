# Phase 2: GRI Module End-to-End - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

Complete GRI module proving all patterns: schema-accurate form covering GRI Universal Standards (GRI 1, 2, 3) plus full Topic Standards menu, Zod validation, live preview rendering a formatted report document, and PDF export styled as a corporate annual report. Form data persists to localStorage. This phase establishes the replication pattern for the remaining four frameworks in Phase 3.

</domain>

<decisions>
## Implementation Decisions

### GRI form depth
- Full Topic Standards menu — all available GRI Topic Standards are presented, not just a curated subset
- Students determine materiality via checklist selection — they check off which topics are material, then those sections expand with disclosure fields
- Guidance level: label + GRI reference code only (e.g., "GRI 305-1: Direct (Scope 1) GHG emissions") — students use external GRI docs for detailed guidance
- Mixed field types — narrative disclosures get textareas, quantitative disclosures get structured inputs (numbers, units, dropdowns where appropriate)

### Preview rendering
- Preview renders as a formatted report document — headers, sections, Content Index, professional formatting matching the final PDF look
- Side-by-side resizable layout — form left, preview right, with a draggable divider so students can adjust the split
- Independent scrolling — preview does NOT auto-sync to the form section being edited; student controls both panels separately
- Empty/unfilled sections show grayed-out placeholder text indicating what will render once filled

### PDF report format
- Corporate annual report style — polished cover page, headers, footers, page numbers, professional typography
- Auto-generated GRI Content Index at the end mapping each disclosure to its page number (standard GRI practice)
- Platform-branded — uses the app's sustainability theme branding on cover page and throughout
- All applicable disclosures included in PDF — unfilled ones marked "Not reported" (mirrors real GRI reporting practice)

### Form navigation
- Persistent sidebar listing all GRI sections (GRI 1, 2, 3, Topic Standards) — click to jump to any section
- Sidebar shows visual completion indicators per section (checkmark, progress ring, or percentage based on fields filled)
- Validation runs on section submit — errors surfaced when student navigates away or clicks validate, not inline as they type
- PDF export allowed even with validation errors — exported PDF includes a warning banner listing incomplete/invalid sections

### Claude's Discretion
- Exact sidebar completion indicator design (checkmark vs progress ring vs percentage)
- Loading skeleton and transition animations
- Exact spacing, typography scale, and color usage within the established theme
- Error state handling and messaging patterns
- localStorage persistence strategy (debounce timing, conflict resolution)
- Specific GRI Topic Standards to include and their field-type mappings
- Draggable divider implementation approach

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-gri-module-end-to-end*
*Context gathered: 2026-02-24*
