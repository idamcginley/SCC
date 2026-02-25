---
phase: 01-foundation-and-application-shell
plan: 02
subsystem: ui
tags: [react-router, dashboard, framework-cards, breadcrumbs, responsive-grid, shadcn-card, lucide-icons]

# Dependency graph
requires:
  - phase: 01-foundation-and-application-shell/01
    provides: "Vite + React + TypeScript scaffold, Tailwind v4 theme, shadcn/ui components, React Router installed"
provides:
  - "Dashboard page with 5 clickable framework cards (GRI, ISSB, CSRD, ESRS, SBTi) in responsive grid"
  - "Client-side routing: / -> DashboardPage, /module/:frameworkSlug -> ModulePage"
  - "Persistent TopNav with app branding and dynamic breadcrumbs"
  - "Framework data module (frameworks array + Framework type) as single source of truth"
  - "Module pages with framework intro text and two-panel layout skeleton"
  - "AppLayout wrapper with TopNav + Outlet for all routes"
affects: [02-01, 02-02, all-module-work]

# Tech tracking
tech-stack:
  added: []
  patterns: [app-layout-outlet, framework-data-lookup-by-slug, group-hover-card-lift, responsive-grid-breakpoints, breadcrumb-from-route-params]

key-files:
  created:
    - src/data/frameworks.ts
    - src/components/layout/AppLayout.tsx
    - src/components/layout/TopNav.tsx
    - src/components/layout/Breadcrumbs.tsx
    - src/components/dashboard/FrameworkCard.tsx
    - src/pages/DashboardPage.tsx
    - src/pages/ModulePage.tsx
  modified:
    - src/App.tsx

key-decisions:
  - "Framework data as static array with Lucide icons -- simple, no fetch needed, 5 entries"
  - "TopNav uses bg-card with border-b for subtle consulting-firm header feel"
  - "Breadcrumbs use shadcn Breadcrumb component with useParams slug lookup"
  - "Cards wrap entire Link for full-click area with group-hover lift/shadow pattern"
  - "Module page intro paragraphs written per-framework with substantive domain content"

patterns-established:
  - "AppLayout pattern: TopNav + main with max-w-7xl mx-auto + Outlet for child routes"
  - "Framework data lookup: frameworks.find(f => f.slug === param) for any slug-based resolution"
  - "Card interaction: group class on Link, group-hover:-translate-y-1 + shadow-lg on Card"
  - "Responsive grid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 for 5-item layouts"
  - "Invalid slug guard: Navigate to='/' replace when framework not found"

requirements-completed: [FOUND-02, FOUND-03]

# Metrics
duration: 24min
completed: 2026-02-24
---

# Phase 1 Plan 2: Dashboard UI and Application Shell Summary

**Interactive dashboard with 5 framework cards, persistent nav with breadcrumbs, module pages with framework intros and two-panel skeletons, all in forest/earth corporate theme**

## Performance

- **Duration:** 24 min (including human verification checkpoint)
- **Started:** 2026-02-25T02:21:22Z
- **Completed:** 2026-02-25T02:45:00Z
- **Tasks:** 3 (2 auto + 1 checkpoint)
- **Files modified:** 8

## Accomplishments
- Built complete application shell with persistent navigation, routing, and responsive dashboard
- Created 5 framework cards with polished hover lift/shadow interaction and full-click Link wrapping
- Implemented dynamic breadcrumbs using shadcn Breadcrumb + React Router params for module page context
- Wrote substantive framework intro paragraphs for all 5 module pages (GRI, ISSB, CSRD, ESRS, SBTi)
- Two-panel skeleton layout ready for future form + preview panels in Phase 2

## Task Commits

Each task was committed atomically:

1. **Task 1: Create framework data, layout components, and route definitions** - `0e5060d` (feat)
2. **Task 2: Build DashboardPage with card grid, FrameworkCard, and ModulePage with two-panel skeleton** - `c8685e1` (feat)
3. **Task 3: Visual verification of dashboard and module pages** - checkpoint approved (no commit, verification only)

## Files Created/Modified
- `src/data/frameworks.ts` - Static framework metadata (name, slug, description, icon) for all 5 frameworks
- `src/components/layout/AppLayout.tsx` - Shared layout with TopNav and Outlet for child routes
- `src/components/layout/TopNav.tsx` - Persistent top navigation bar with branding and breadcrumbs
- `src/components/layout/Breadcrumbs.tsx` - Dynamic breadcrumb from route params using shadcn Breadcrumb
- `src/components/dashboard/FrameworkCard.tsx` - Clickable card with hover lift effect wrapping shadcn Card in Link
- `src/pages/DashboardPage.tsx` - Dashboard with responsive grid of 5 framework cards
- `src/pages/ModulePage.tsx` - Module page with framework intro, overview paragraph, and two-panel skeleton
- `src/App.tsx` - Updated with route definitions: AppLayout wrapping index and module routes

## Decisions Made
- **Framework data as static array:** Simple static export with 5 entries and Lucide icons. No data fetching needed -- this is a small, fixed dataset.
- **TopNav styling:** Used `bg-card` with `border-b border-border` for a subtle, professional header that feels like a consulting firm's internal tool.
- **Full-card click area:** Wrapped entire shadcn Card in React Router Link with `group` class for hover propagation, rather than making only the title clickable.
- **Substantive intro paragraphs:** Each module page includes a 3-4 sentence overview covering the framework's purpose, primary audience, and structure -- providing immediate educational value on navigation.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Complete application shell ready for Phase 2 (GRI module end-to-end)
- Module pages have two-panel skeleton placeholders that will be replaced with form + preview panels
- Framework data module provides the single source of truth for framework metadata across the app
- All routing infrastructure in place: adding new routes just requires new Route entries in App.tsx

## Self-Check: PASSED

All 8 files verified present on disk. Both task commits (0e5060d, c8685e1) verified in git log.

---
*Phase: 01-foundation-and-application-shell*
*Completed: 2026-02-24*
