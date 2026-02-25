---
phase: 02-gri-module-end-to-end
plan: 02
subsystem: ui
tags: [react-hook-form, gri, resizable-panels, live-preview, sidebar-navigation, shadcn-ui, sustainability]

# Dependency graph
requires:
  - phase: 02-gri-module-end-to-end
    plan: 01
    provides: "GRI Zod schema, DisclosureField component, useLocalStorageForm, useGriCompletion hooks"
provides:
  - "GriForm orchestrator with FormProvider, section rendering, and validation trigger on navigate"
  - "GriSidebar with completion indicators and materiality-driven Topic Standard filtering"
  - "GriUniversalSection rendering all 30 GRI 2 disclosures grouped by 5 subsections"
  - "GriMaterialTopics with GRI 3 disclosures and materiality checklist with accordion groups"
  - "GriTopicSection reusable component for any Topic Standard disclosure set"
  - "GriAssessment full-viewport resizable split layout with draggable divider"
  - "GriReportPreview live HTML preview with Content Index table and grayed placeholders"
  - "AppLayout fullBleed outlet context pattern for assessment pages"
affects: [02-03-PLAN, 03-remaining-modules]

# Tech tracking
tech-stack:
  added: [react-resizable-panels, shadcn/ui-resizable]
  patterns: [resizable-split-layout, live-preview-via-useWatch, fullBleed-outlet-context, section-navigation-sidebar, materiality-driven-conditional-rendering]

key-files:
  created:
    - src/components/gri/GriForm.tsx
    - src/components/gri/GriSidebar.tsx
    - src/components/gri/GriUniversalSection.tsx
    - src/components/gri/GriMaterialTopics.tsx
    - src/components/gri/GriTopicSection.tsx
    - src/components/gri/GriAssessment.tsx
    - src/components/gri/GriReportPreview.tsx
    - src/components/ui/resizable.tsx
  modified:
    - src/pages/ModulePage.tsx
    - src/components/layout/AppLayout.tsx
    - package.json
    - package-lock.json

key-decisions:
  - "AppLayout fullBleed outlet context pattern: pages set fullBleed(true) to remove max-width/padding constraints for assessment layouts"
  - "resizable.tsx direction-to-orientation mapping: react-resizable-panels v4 uses 'orientation' prop instead of shadcn's expected 'direction'"
  - "zodResolver cast to any: Zod v4 .default() creates input/output type mismatch with react-hook-form resolver generics"
  - "SVG circular progress indicator for section completion (subtle, professional consulting aesthetic)"

patterns-established:
  - "fullBleed outlet context: AppLayout exposes setFullBleed via Outlet context, assessment pages toggle full-viewport layout"
  - "Section navigation: GriSidebar + activeSection state drives conditional section rendering in GriForm"
  - "Live preview pattern: GriReportPreview uses useWatch({name: undefined}) for isolated re-renders independent of form fields"
  - "Materiality-driven rendering: useWatch on materialTopics array controls Topic Standard visibility in sidebar, form, and preview"
  - "Content Index table: auto-generated from rendered disclosure entries, showing reported/not-reported status"

requirements-completed: [FORM-01, FORM-07]

# Metrics
duration: 10min
completed: 2026-02-24
---

# Phase 2 Plan 2: GRI Form UI, Resizable Assessment Layout, and Live Report Preview Summary

**Full GRI assessment page with resizable form/preview split, sidebar navigation with completion tracking, materiality-driven Topic Standards, and live-updating report preview with Content Index**

## Performance

- **Duration:** 10 min
- **Started:** 2026-02-25T04:47:01Z
- **Completed:** 2026-02-25T04:56:36Z
- **Tasks:** 2
- **Files modified:** 12

## Accomplishments
- Built 7 GRI components: form orchestrator, sidebar, 3 section components, assessment layout, and live report preview
- Implemented resizable horizontal split layout with draggable divider (react-resizable-panels)
- Live preview renders complete formatted report with real-time updates via useWatch
- Sidebar shows all GRI sections with circular completion indicators; Topic Standards appear only when selected as material
- AppLayout supports full-bleed mode for assessment pages via outlet context pattern
- Content Index table at bottom of preview auto-tracks reported/not-reported status for all applicable disclosures

## Task Commits

Each task was committed atomically:

1. **Task 1: Create GRI form components** - `ced7fd8` (feat)
2. **Task 2: Create resizable layout, preview, and wire into ModulePage** - `f985f99` (feat)

## Files Created/Modified
- `src/components/gri/GriForm.tsx` - Form orchestrator with FormProvider, zodResolver, section navigation, validation toolbar
- `src/components/gri/GriSidebar.tsx` - Section navigation sidebar with SVG completion indicators and materiality filtering
- `src/components/gri/GriUniversalSection.tsx` - GRI 2 General Disclosures (30 fields) grouped by 5 subsections
- `src/components/gri/GriMaterialTopics.tsx` - GRI 3 disclosures + materiality checklist with accordion groups
- `src/components/gri/GriTopicSection.tsx` - Reusable Topic Standard section component
- `src/components/gri/GriAssessment.tsx` - Full-viewport resizable split layout (55/45 default)
- `src/components/gri/GriReportPreview.tsx` - Live HTML report preview with Content Index table
- `src/components/ui/resizable.tsx` - shadcn/ui resizable with direction-to-orientation mapping for v4
- `src/pages/ModulePage.tsx` - Conditional GRI assessment rendering with fullBleed toggle
- `src/components/layout/AppLayout.tsx` - fullBleed outlet context for assessment pages
- `package.json` / `package-lock.json` - Added react-resizable-panels dependency

## Decisions Made
- Used AppLayout outlet context (`setFullBleed`) instead of negative margins or separate route layout -- cleanest separation of concerns
- Mapped shadcn `direction` prop to react-resizable-panels v4 `orientation` prop in resizable.tsx wrapper
- Used `as any` cast for zodResolver due to Zod v4 `.default()` creating optional input type vs required output type incompatibility with react-hook-form resolver generics
- SVG circular progress indicator chosen for sidebar completion -- lightweight, theme-integrated, professional aesthetic

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] react-resizable-panels v4 API uses orientation instead of direction**
- **Found during:** Task 2 (GriAssessment build)
- **Issue:** shadcn/ui resizable component passes `direction` prop but react-resizable-panels v4.6.5 expects `orientation`
- **Fix:** Updated resizable.tsx wrapper to accept `direction` and map it to `orientation`
- **Files modified:** src/components/ui/resizable.tsx
- **Verification:** `npm run build` succeeds
- **Committed in:** f985f99 (Task 2 commit)

**2. [Rule 3 - Blocking] zodResolver type mismatch with Zod v4 .default() types**
- **Found during:** Task 2 (GriForm build verification)
- **Issue:** `z.array(z.string()).default([])` produces input type `string[] | undefined` but GriFormData output type requires `string[]`, causing resolver generic incompatibility
- **Fix:** Applied `as any` cast to zodResolver call with eslint-disable comment
- **Files modified:** src/components/gri/GriForm.tsx
- **Verification:** `npm run build` succeeds, runtime behavior unaffected
- **Committed in:** f985f99 (Task 2 commit)

---

**Total deviations:** 2 auto-fixed (2 blocking)
**Impact on plan:** Both auto-fixes necessary for build compatibility with library versions. No scope creep.

## Issues Encountered
None beyond the auto-fixed deviations above.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- GRI assessment page fully functional at /module/gri with form, sidebar, and live preview
- Ready for Plan 03 (PDF export) -- the GriReportPreview component structure mirrors PDF layout
- Resizable layout pattern and fullBleed context ready for replication in Phase 3
- Other framework pages (/module/issb, etc.) remain unaffected with original placeholder layout

## Self-Check: PASSED

- All 10 created/modified files verified on disk
- Both task commits (ced7fd8, f985f99) verified in git log
- `npm run build` succeeds with zero type errors

---
*Phase: 02-gri-module-end-to-end*
*Completed: 2026-02-24*
