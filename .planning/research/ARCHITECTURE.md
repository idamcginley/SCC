# Architecture Research

**Domain:** Sustainability reporting assessment platform (React SPA with structured forms, live preview, PDF export)
**Researched:** 2026-02-24
**Confidence:** HIGH

## System Overview

```
+-----------------------------------------------------------------------+
|                          Application Shell                             |
|  (React Router, Layout, Navigation, Theme)                            |
+-----------------------------------------------------------------------+
|                                                                        |
|  +------------------+  +------------------+  +------------------+      |
|  | Module: GRI      |  | Module: ISSB     |  | Module: CSRD     | ... |
|  |  +- Reference    |  |  +- Reference    |  |  +- Reference    |     |
|  |  +- Examples     |  |  +- Examples     |  |  +- Examples     |     |
|  |  +- Assessment   |  |  +- Assessment   |  |  +- Assessment   |     |
|  |  +- Preview      |  |  +- Preview      |  |  +- Preview      |     |
|  +--------+---------+  +--------+---------+  +--------+---------+     |
|           |                      |                      |              |
+-----------+----------------------+----------------------+--------------+
|                        Shared Layer                                    |
|  +-------------+  +--------------+  +-----------+  +---------------+  |
|  | Form Engine |  | Preview      |  | PDF       |  | Module Config |  |
|  | (RHF + Zod) |  | Renderer     |  | Generator |  | (Schemas)     |  |
|  +------+------+  +------+-------+  +-----+-----+  +-------+------+  |
|         |                |               |                  |          |
+---------+----------------+---------------+------------------+----------+
|                        Data Layer                                      |
|  +-------------------+  +------------------+  +--------------------+   |
|  | Zustand Stores    |  | Module Schemas   |  | Content Data       |   |
|  | (per-module form  |  | (field defs,     |  | (reference text,   |   |
|  |  state + persist) |  |  validation)     |  |  examples, case)   |   |
|  +-------------------+  +------------------+  +--------------------+   |
+------------------------------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| Application Shell | Top-level routing, layout, navigation between 5 modules, theme provider | React Router v6 + layout component with sidebar/tab navigation |
| Module Page | Orchestrates the 4 tabs (reference, examples, assessment, preview) for a single framework | Feature-level component with tab state, loads module-specific config |
| Reference Panel | Displays practitioner-focused reference material for the framework | Static/semi-static content component, markdown or structured JSX |
| Examples Panel | Shows annotated report excerpts, side-by-side cross-framework comparisons | Content display with callout annotations, code/report highlighting |
| Assessment Form | Structured form input mirroring framework disclosure requirements | react-hook-form with Zod schema, field groups matching framework sections |
| Live Preview | Real-time HTML rendering of the report as the student fills in fields | Read-only component subscribing to form state via useWatch |
| PDF Generator | Converts form data into a downloadable, framework-accurate PDF | @react-pdf/renderer with framework-specific document templates |
| Instructor Review | Side-by-side view: student submission vs. ideal report | Split-panel layout consuming exported JSON or re-rendered form data |
| Module Config/Schema | Defines each framework's fields, sections, validation rules, and labels | TypeScript type definitions + Zod schemas per module |
| Zustand Store | Persists form state per module to localStorage, exposes form data globally | One store slice per module with persist middleware |

## Recommended Project Structure

```
src/
├── app/                        # Application shell
│   ├── App.tsx                 # Root component, router setup
│   ├── Layout.tsx              # Shell layout (sidebar + content area)
│   └── routes.tsx              # Route definitions for all modules
│
├── modules/                    # Feature folders (one per framework)
│   ├── gri/
│   │   ├── GriModule.tsx       # Module page (tab orchestrator)
│   │   ├── GriReference.tsx    # Reference content
│   │   ├── GriExamples.tsx     # Example reports
│   │   ├── GriAssessment.tsx   # Assessment form (uses shared form engine)
│   │   ├── GriPreview.tsx      # Live preview (uses shared preview renderer)
│   │   ├── GriPdfTemplate.tsx  # PDF template (@react-pdf/renderer)
│   │   ├── schema.ts           # Zod schema + field definitions
│   │   ├── types.ts            # Module-specific TypeScript types
│   │   └── content/            # Static content (reference text, examples)
│   │       ├── reference.ts
│   │       └── examples.ts
│   ├── issb/                   # Same structure
│   ├── csrd/                   # Same structure
│   ├── esrs/                   # Same structure
│   └── sbti/                   # Same structure
│
├── shared/                     # Shared, reusable components
│   ├── components/
│   │   ├── ui/                 # Generic UI primitives (Button, Card, Tabs, etc.)
│   │   ├── form/               # Form field components (TextInput, Select, TextArea, etc.)
│   │   ├── preview/            # Shared preview renderer components
│   │   └── pdf/                # Shared PDF primitives (headers, tables, sections)
│   ├── hooks/
│   │   ├── useModuleStore.ts   # Hook to access per-module Zustand store
│   │   ├── useAutoSave.ts      # Auto-save form data to localStorage
│   │   └── usePdfExport.ts     # PDF generation + download trigger
│   └── utils/
│       ├── formatters.ts       # Data formatting for preview/PDF
│       └── validators.ts       # Shared validation utilities
│
├── stores/                     # Zustand stores
│   ├── createModuleStore.ts    # Factory function for per-module stores
│   └── appStore.ts             # Global app state (active module, UI preferences)
│
├── types/                      # Global TypeScript types
│   ├── module.ts               # Common module interfaces
│   ├── form.ts                 # Shared form field type definitions
│   └── report.ts               # Report structure types
│
├── content/                    # Cross-module content
│   └── caseStudy.ts            # PwC case study data (shared across all modules)
│
└── instructor/                 # Instructor-specific feature
    ├── ReviewPage.tsx           # Side-by-side review layout
    ├── IdealReport.tsx          # Renders the ideal/correct report
    └── ComparisonView.tsx       # Diff/comparison component
```

### Structure Rationale

- **`modules/`:** Feature-based organization. Each framework is a self-contained module with its own schema, content, form, preview, and PDF template. This mirrors the 5-framework domain boundary and allows independent development of each module. Modules import from `shared/` but never from each other.

- **`shared/`:** Contains everything that is framework-agnostic. Form field components, UI primitives, preview rendering logic, and PDF building blocks live here. This enforces DRY across the 5 modules -- the form fields for a "text disclosure" or a "numeric metric" are identical regardless of whether it is GRI or ISSB using them.

- **`stores/`:** Centralized store definitions using a factory pattern. `createModuleStore` is called once per framework to produce 5 independent stores, each with its own localStorage persistence key. This prevents form data from one module bleeding into another.

- **`content/`:** The PwC case study data lives here because it is shared across all 5 modules. Each module's `content/` subfolder holds framework-specific reference material and examples.

- **`instructor/`:** Isolated feature folder for the instructor review view. Consumes exported data or store state but has no coupling to individual module internals.

## Architectural Patterns

### Pattern 1: Module Schema as Single Source of Truth

**What:** Each module defines a Zod schema that drives form generation, validation, preview rendering, and PDF generation. The schema is the canonical definition of what fields exist, their types, labels, and validation rules.

**When to use:** Always. Every module needs this. It is the foundational pattern.

**Trade-offs:** Requires upfront investment in schema design. Pays off immediately because form, preview, and PDF all derive from the same definition -- no drift between what the form collects and what the PDF renders.

**Example:**
```typescript
// modules/gri/schema.ts
import { z } from 'zod';

export const griSchema = z.object({
  organizationProfile: z.object({
    organizationName: z.string().min(1, 'Required'),
    activitiesAndWorkers: z.string().min(1, 'Required'),
    governanceStructure: z.string().optional(),
  }),
  materialTopics: z.object({
    stakeholderEngagement: z.string().min(1, 'Required'),
    materialTopicsList: z.array(z.object({
      topicName: z.string(),
      topicBoundary: z.string(),
      managementApproach: z.string(),
    })),
  }),
  // ... more sections matching GRI disclosure requirements
});

export type GriFormData = z.infer<typeof griSchema>;

// Field metadata for rendering forms and previews
export const griFieldMeta: FieldMeta<GriFormData> = {
  organizationProfile: {
    label: 'GRI 2: General Disclosures',
    fields: {
      organizationName: {
        label: 'GRI 2-1: Organizational Details',
        placeholder: 'Enter the reporting organization name...',
        helpText: 'Legal name as registered',
        inputType: 'text',
      },
      // ...
    },
  },
};
```

### Pattern 2: Dual Renderer (HTML Preview + PDF Export)

**What:** Form data flows to two separate rendering pipelines: (1) an HTML-based live preview component for real-time feedback, and (2) a @react-pdf/renderer template for downloadable PDF. Both consume the same data shape but render through different component trees.

**When to use:** Whenever you need WYSIWYG-style preview AND high-fidelity PDF output. The HTML preview gives instant feedback; the PDF renderer produces the final artifact.

**Trade-offs:** You must maintain two rendering pipelines. However, because both consume the same typed data (from the Zod schema), drift is caught by TypeScript at compile time. The HTML preview does not need to be pixel-perfect identical to the PDF -- it needs to be structurally accurate (same sections, same content, same ordering).

**Example:**
```typescript
// shared/components/preview/ReportSection.tsx (HTML preview)
interface ReportSectionProps {
  title: string;
  disclosureId: string;
  content: string;
}

export function ReportSection({ title, disclosureId, content }: ReportSectionProps) {
  return (
    <div className="report-section">
      <h3>{disclosureId}: {title}</h3>
      <p>{content || <span className="placeholder">Not yet completed</span>}</p>
    </div>
  );
}

// modules/gri/GriPdfTemplate.tsx (@react-pdf/renderer)
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  section: { marginBottom: 12, padding: 8 },
  title: { fontSize: 14, fontWeight: 'bold', marginBottom: 4 },
  content: { fontSize: 11, lineHeight: 1.5 },
});

export function GriPdfTemplate({ data }: { data: GriFormData }) {
  return (
    <Document>
      <Page size="A4" style={{ padding: 40 }}>
        <View style={styles.section}>
          <Text style={styles.title}>
            GRI 2-1: Organizational Details
          </Text>
          <Text style={styles.content}>
            {data.organizationProfile.organizationName}
          </Text>
        </View>
        {/* ... more sections */}
      </Page>
    </Document>
  );
}
```

### Pattern 3: Store-per-Module with Factory

**What:** A factory function creates independent Zustand stores for each module. Each store manages its own form data, auto-saves to localStorage under a unique key, and exposes actions for updating and resetting data.

**When to use:** For this project, always. The 5 modules have independent form state that should persist separately.

**Trade-offs:** Slightly more boilerplate than a single global store, but prevents the catastrophic failure mode of one module's state corrupting another's. The factory pattern keeps the boilerplate minimal.

**Example:**
```typescript
// stores/createModuleStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ZodSchema } from 'zod';

interface ModuleStoreState<T> {
  formData: Partial<T>;
  lastSaved: number | null;
  updateField: (path: string, value: unknown) => void;
  setFormData: (data: Partial<T>) => void;
  reset: () => void;
}

export function createModuleStore<T>(
  moduleKey: string,
  defaultValues: Partial<T>
) {
  return create<ModuleStoreState<T>>()(
    persist(
      (set) => ({
        formData: defaultValues,
        lastSaved: null,
        updateField: (path, value) =>
          set((state) => ({
            formData: setNestedValue(state.formData, path, value),
            lastSaved: Date.now(),
          })),
        setFormData: (data) =>
          set({ formData: data, lastSaved: Date.now() }),
        reset: () =>
          set({ formData: defaultValues, lastSaved: null }),
      }),
      { name: `assessment-${moduleKey}` }
    )
  );
}

// Usage: stores/griStore.ts
export const useGriStore = createModuleStore<GriFormData>('gri', {});
```

### Pattern 4: useWatch-Driven Live Preview

**What:** The live preview component subscribes to form changes via react-hook-form's `useWatch` hook rather than `watch`. This isolates re-renders to the preview component only, preventing the entire form from re-rendering on every keystroke.

**When to use:** Always for the live preview feature. The forms will have many fields (framework disclosure requirements are extensive), so render isolation is critical.

**Trade-offs:** Requires the preview to be a sibling or child component that has access to the form context. Slightly more setup than `watch`, but dramatically better performance for forms with 20+ fields.

**Example:**
```typescript
// modules/gri/GriPreview.tsx
import { useWatch } from 'react-hook-form';
import { ReportSection } from '@/shared/components/preview/ReportSection';

export function GriPreview() {
  // Only this component re-renders when form values change
  const formValues = useWatch<GriFormData>();

  return (
    <div className="report-preview">
      <h2>GRI Standards Report Preview</h2>
      <ReportSection
        disclosureId="GRI 2-1"
        title="Organizational Details"
        content={formValues.organizationProfile?.organizationName ?? ''}
      />
      {/* ... more sections */}
    </div>
  );
}
```

## Data Flow

### Primary Data Flow: Form Input to PDF Export

```
[User Types in Form Field]
         |
         v
[react-hook-form Field] --onChange--> [RHF Internal State]
         |                                    |
         |                         +----------+-----------+
         |                         |                      |
         v                         v                      v
[Zod Validation]          [useWatch in Preview]    [Zustand Store
  (per-field &              (isolated re-render)    .persist()
   per-section)                    |                --> localStorage]
                                   |
                                   v
                          [HTML Preview Component]
                          (real-time report view)


[User Clicks "Export PDF"]
         |
         v
[Read from Zustand Store] --> [Full form data snapshot]
         |
         v
[@react-pdf/renderer Template] --> [PDF.blob()]
         |
         v
[Browser Download] --> [framework-report.pdf]
```

### Key Data Flows

1. **Form Input --> Live Preview:** User types in a form field. react-hook-form manages the field state. The preview component subscribes via `useWatch`, triggering a scoped re-render. The preview reads field values and renders them into the HTML report template. This happens on every keystroke with no debounce needed (useWatch is efficient enough).

2. **Form Input --> Persistent Storage:** On form change (debounced, ~500ms), the current form state syncs to the corresponding Zustand store. The store's persist middleware writes to localStorage under the key `assessment-{moduleKey}`. On page reload, Zustand rehydrates from localStorage and populates the form with saved values.

3. **Persistent Storage --> PDF Export:** When the user clicks "Download PDF", the component reads the complete form data from the Zustand store (not from RHF directly -- the store is the canonical persisted snapshot). The data passes to the @react-pdf/renderer template component. The PDF is generated client-side as a blob and triggered as a browser download.

4. **Student Export --> Instructor Review:** Students download their completed PDF. For the instructor review view, the platform also supports exporting form data as JSON (from the Zustand store). The instructor view loads the student's JSON alongside the ideal report JSON and renders both through the same preview components in a side-by-side layout.

### State Management Strategy

```
[react-hook-form]                    [Zustand Stores]
  Per-field state                     Per-module persisted state
  Validation state                    Canonical data for PDF export
  Dirty/touched tracking              Cross-component data sharing
  Ephemeral (session only)            Persistent (localStorage)
       |                                    |
       +--- sync on change (debounced) ---->+
       |                                    |
       +<--- rehydrate on mount -----------+
```

**Why two state layers?** react-hook-form excels at form-specific concerns (validation, touched state, error messages, field registration) but is scoped to the form component tree. Zustand provides persistence across page reloads, global access for the preview component, and a clean data snapshot for PDF generation. The two complement each other: RHF owns form UX, Zustand owns data persistence.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| ~30 users (current) | Pure client-side SPA with localStorage. No server needed. Static hosting (Vercel, Netlify, GitHub Pages). All computation in the browser. |
| 100-500 users | Same architecture holds. localStorage per-browser is isolated. If shared devices become an issue, add a simple identifier prefix to storage keys. |
| 500+ users or multi-cohort | Consider adding a lightweight backend (serverless functions) for instructor data aggregation. Student submissions as JSON could be POSTed to a simple API for centralized review. |

### Scaling Priorities

1. **First concern (not a bottleneck at 30 users):** PDF generation is CPU-intensive in the browser. At ~30 concurrent users each generating their own PDFs, this is fine -- each browser handles its own workload. If PDF generation ever needs to be centralized (e.g., batch instructor downloads), move to server-side rendering with @react-pdf/renderer on Node.

2. **Second concern:** localStorage has a ~5-10MB limit per origin. With 5 modules of form data, this is unlikely to be an issue. But if rich content (images, large text blocks) is added later, consider IndexedDB as the Zustand persist storage backend.

## Anti-Patterns

### Anti-Pattern 1: Monolithic Form Component

**What people do:** Build one massive form component per module with all fields, validation, and preview logic inline.

**Why it's wrong:** Framework disclosure requirements are extensive (GRI alone has dozens of disclosures). A single component becomes unmaintainable, slow to render, and impossible to test in isolation.

**Do this instead:** Break each module's assessment into section-level form components (e.g., `GriGeneralDisclosures`, `GriMaterialTopics`, `GriTopicSpecificDisclosures`). Each section has its own validation subset and maps to a collapsible section in the UI.

### Anti-Pattern 2: Sharing Components Between HTML Preview and PDF

**What people do:** Try to create a single component that renders to both HTML (for preview) and PDF (for export), often using conditional rendering or abstraction layers.

**Why it's wrong:** @react-pdf/renderer uses its own primitives (`<View>`, `<Text>`, `<Page>`) that are fundamentally different from DOM elements (`<div>`, `<p>`, `<section>`). Trying to abstract over both creates a leaky abstraction that is harder to maintain than two simple, purpose-built component trees.

**Do this instead:** Accept two rendering pipelines. Share the data types and data transformation logic, not the rendering components. The HTML preview and PDF template both consume `GriFormData` -- that shared type is the contract. Keep the rendering separate and simple.

### Anti-Pattern 3: Using react-hook-form's `watch` for Preview

**What people do:** Use the `watch` function from `useForm` to feed data to the live preview.

**Why it's wrong:** `watch` triggers re-renders at the root form component level, causing the entire form (all fields, all sections) to re-render whenever any single field changes. With 20-50 fields per module, this creates noticeable jank.

**Do this instead:** Use `useWatch` in a dedicated preview component. This isolates re-renders to only the preview, leaving the form fields untouched.

### Anti-Pattern 4: Single Global Store for All Modules

**What people do:** Create one Zustand store with all 5 modules' form data nested inside.

**Why it's wrong:** Any update to one module's data triggers subscriber notifications for components watching other modules. localStorage persistence serializes/deserializes the entire 5-module blob on every save. A bug in one module's data structure can corrupt the entire store.

**Do this instead:** Use the store factory pattern (Pattern 3 above). Each module gets its own isolated store with its own localStorage key.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| None (v1) | N/A | Pure client-side SPA. No external API calls. All data stays in the browser. |
| Static hosting | Deploy built bundle | Vercel/Netlify/GitHub Pages. Single `index.html` with JS/CSS assets. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Module <--> Shared Components | Props + TypeScript interfaces | Modules pass module-specific data; shared components are generic. |
| Assessment Form <--> Zustand Store | Debounced sync via custom hook | RHF owns form state during editing; Zustand is the persistence layer. |
| Assessment Form <--> Live Preview | useWatch (react-hook-form context) | Preview subscribes to form context, no direct store dependency for preview. |
| Any Component --> PDF Generator | Function call with data snapshot | PDF generation is triggered imperatively, not via subscription. |
| Instructor Review <--> Module Stores | Read-only store access or JSON import | Instructor view consumes data but never writes to module stores. |

## Build Order (Dependency Chain)

The following build order respects component dependencies:

```
Phase 1: Foundation (no dependencies)
  ├── TypeScript types (module.ts, form.ts, report.ts)
  ├── Module schemas (Zod schemas for all 5 frameworks)
  ├── Zustand store factory + per-module stores
  └── Shared UI primitives (Button, Card, Tabs, Layout)

Phase 2: Form Engine (depends on Phase 1)
  ├── Shared form field components (TextInput, TextArea, Select, FieldGroup)
  ├── useAutoSave hook (RHF <-> Zustand sync)
  └── First module's assessment form (GRI recommended -- most standard structure)

Phase 3: Preview + Content (depends on Phase 1, partially Phase 2)
  ├── Shared preview renderer components (ReportSection, ReportHeader, etc.)
  ├── First module's live preview (GRI)
  ├── Reference content component
  └── Examples component

Phase 4: PDF Pipeline (depends on Phase 1, Phase 2 data shapes)
  ├── Shared PDF primitives (PdfHeader, PdfSection, PdfTable)
  ├── First module's PDF template (GRI)
  └── usePdfExport hook (generation + download trigger)

Phase 5: Remaining Modules (depends on Phase 1-4 for patterns)
  ├── ISSB module (all 4 tabs)
  ├── CSRD module (all 4 tabs)
  ├── ESRS module (all 4 tabs)
  └── SBTi module (all 4 tabs)

Phase 6: Instructor + Polish (depends on Phase 1-5)
  ├── Instructor review view (side-by-side comparison)
  ├── JSON export for student submissions
  └── Cross-module navigation polish
```

**Build order rationale:**
- Types and schemas must come first because everything depends on them.
- The form engine is the core interaction surface and validates the schema design.
- Preview depends on form data but can be developed in parallel once schemas are defined.
- PDF is intentionally after preview because it is triggered on-demand (not real-time) and the HTML preview validates the data model before investing in PDF templates.
- Build one complete module (GRI) end-to-end before replicating across the other 4. This validates all patterns and shared components before scaling horizontally.
- Instructor view comes last because it consumes outputs from all modules.

## Sources

- [React Folder Structure in 5 Steps (2025)](https://www.robinwieruch.de/react-folder-structure/) - Feature-based organization patterns
- [Scalable React Projects with Feature-Based Architecture](https://dev.to/naserrasouli/scalable-react-projects-with-feature-based-architecture-117c) - Module boundary patterns
- [React Architecture Patterns and Best Practices (2025)](https://www.geeksforgeeks.org/reactjs/react-architecture-pattern-and-best-practices/) - General React architecture
- [@react-pdf/renderer Styling](https://react-pdf.org/styling) - PDF styling capabilities and limitations
- [6 Open-Source PDF Libraries for React (2025)](https://dev.to/ansonch/6-open-source-pdf-generation-and-modification-libraries-every-react-dev-should-know-in-2025-13g0) - PDF library comparison
- [React Hook Form: watch vs useWatch](https://dev.to/kcsujeet/react-hook-form-understanding-watch-vs-usewatch-l54) - Performance implications for live preview
- [React Hook Form useWatch docs](https://react-hook-form.com/docs/usewatch) - Official API reference
- [Zustand persist middleware](https://github.com/pmndrs/zustand/blob/main/docs/integrations/persisting-store-data.md) - localStorage persistence pattern
- [React State Management in 2025: Context API vs Zustand](https://dev.to/cristiansifuentes/react-state-management-in-2025-context-api-vs-zustand-385m) - State management comparison
- [Composable Form Handling in 2025](https://makersden.io/blog/composable-form-handling-in-2025-react-hook-form-tanstack-form-and-beyond) - Modern form patterns
- [Multi-step Form with React Hook Form + Zustand](https://www.buildwithmatija.com/blog/master-multi-step-forms-build-a-dynamic-react-form-in-6-simple-steps) - RHF + Zustand integration
- [Sharing Logic Between Components in Different React Renderers](https://test.braingu.com/blog/share-react-component-logic) - Dual renderer pattern
- [Build PDF Documents with React on the Server](https://rolique.medium.com/build-pdf-documents-with-react-on-the-server-e7be378497e8) - Shared component architecture for HTML + PDF

---
*Architecture research for: Sustainability Reporting Assessment Platform*
*Researched: 2026-02-24*
