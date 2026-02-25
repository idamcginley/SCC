# Phase 1: Foundation and Application Shell - Context

**Gathered:** 2026-02-24
**Status:** Ready for planning

<domain>
## Phase Boundary

React/Vite/TypeScript application shell with Tailwind CSS and shadcn/ui. Delivers a polished dashboard displaying 5 sustainability framework cards (GRI, ISSB, CSRD, ESRS, SBTi), routing to module placeholder pages, a persistent top nav bar, and shared UI primitives. Assessment forms, validation, preview, and PDF export are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Dashboard layout
- Even grid of 5 framework cards (responsive: 3+2 or 2+2+1 depending on viewport)
- Minimal header: "Sustainability Consulting Club (SCC) -- PwC Case Study: Sustainability Reporting" or similar branding. Clean, professional, not a hero section.
- Flat grid with no grouping labels or category dividers between frameworks
- Top navigation bar persistent across pages (app name, Home link, breadcrumbs when inside a module)

### Color palette & theme
- Forest & earth direction: deep greens, warm tans, charcoal -- nature-inspired, grounded
- Light mode only (no dark mode toggle)
- Clean sans-serif typography (Inter, Geist, or similar -- modern, highly legible)
- Uniform palette across all frameworks -- no per-framework accent colors; frameworks distinguished by icons/labels only

### Card design & status
- Each card shows: framework name, 1-2 sentence description of what the framework covers, and a simple distinguishing icon
- No status indicators in Phase 1 (no "Not Started" badges) -- cards are clean
- Entire card is clickable (navigates to module page)
- Subtle lift/shadow on hover for polished interaction feedback

### Module page shell
- Framework intro page when navigating into a module: brief overview of the framework (purpose, who uses it, structure)
- Two-panel layout skeleton hinted (left panel for future form, right panel for future preview) even before forms exist
- Breadcrumb navigation in top nav (e.g., "Dashboard > GRI Standards")
- Module switching only through dashboard -- no cross-module switcher dropdown

### Claude's Discretion
- Exact icon choices for each framework card
- Specific font selection within the clean sans-serif family
- Spacing, padding, and responsive breakpoint details
- Framework intro page copy and depth of content
- Placeholder content in the two-panel layout skeleton
- shadcn/ui component customization details
- Error states and loading states

</decisions>

<specifics>
## Specific Ideas

- Header branding should reference "Sustainability Consulting Club (SCC)" and the PwC case study context
- Cards should feel corporate-polished: think consulting firm meets environmental report
- Forest & earth palette: not bright green -- muted, grounded tones (deep forest green, warm tan, charcoal)

</specifics>

<deferred>
## Deferred Ideas

None -- discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-and-application-shell*
*Context gathered: 2026-02-24*
