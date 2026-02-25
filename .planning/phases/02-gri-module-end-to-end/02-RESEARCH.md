# Phase 2: GRI Module End-to-End - Research

**Researched:** 2026-02-24
**Domain:** Form management, PDF generation, GRI sustainability reporting standards, resizable layouts
**Confidence:** HIGH

## Summary

This phase transforms the GRI module page (currently a placeholder skeleton) into a fully functional assessment flow: a structured form mirroring GRI Universal Standards (GRI 1, 2, 3) plus all Topic Standards (201-419), Zod-based validation, a live side-by-side report preview with a draggable divider, PDF export styled as a corporate annual report, and localStorage persistence. The technical domain spans four pillars: (1) a large, schema-driven form with ~130 disclosure fields organized into sections, (2) real-time preview rendering that responds to form value changes, (3) professional PDF generation with cover page, Content Index, and corporate styling, and (4) persistent form state across browser sessions.

The existing codebase (React 19 + Vite 7 + Tailwind v4 + shadcn/ui + TypeScript) provides a solid foundation. shadcn/ui already has Input, Textarea, Select, Label, and Separator components installed. The architecture pattern is: define the GRI schema as a single Zod object, drive the form from that schema using react-hook-form, feed watched values into both a live HTML preview component and the PDF renderer.

**Primary recommendation:** Use react-hook-form + @hookform/resolvers/zod for form management, shadcn/ui Field components for form layout, shadcn/ui Resizable for the draggable split panel, @react-pdf/renderer v4 for PDF generation, and a custom useLocalStorageForm hook with debounced persistence.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Full Topic Standards menu -- all available GRI Topic Standards are presented, not just a curated subset
- Students determine materiality via checklist selection -- they check off which topics are material, then those sections expand with disclosure fields
- Guidance level: label + GRI reference code only (e.g., "GRI 305-1: Direct (Scope 1) GHG emissions") -- students use external GRI docs for detailed guidance
- Mixed field types -- narrative disclosures get textareas, quantitative disclosures get structured inputs (numbers, units, dropdowns where appropriate)
- Preview renders as a formatted report document -- headers, sections, Content Index, professional formatting matching the final PDF look
- Side-by-side resizable layout -- form left, preview right, with a draggable divider so students can adjust the split
- Independent scrolling -- preview does NOT auto-sync to the form section being edited; student controls both panels separately
- Empty/unfilled sections show grayed-out placeholder text indicating what will render once filled
- Corporate annual report style -- polished cover page, headers, footers, page numbers, professional typography
- Auto-generated GRI Content Index at the end mapping each disclosure to its page number (standard GRI practice)
- Platform-branded -- uses the app's sustainability theme branding on cover page and throughout
- All applicable disclosures included in PDF -- unfilled ones marked "Not reported" (mirrors real GRI reporting practice)
- Persistent sidebar listing all GRI sections (GRI 1, 2, 3, Topic Standards) -- click to jump to any section
- Sidebar shows visual completion indicators per section (checkmark, progress ring, or percentage based on fields filled)
- Validation runs on section submit -- errors surfaced when student navigates away or clicks validate, not inline as they type
- PDF export allowed even with validation errors -- exported PDF includes a warning banner listing incomplete/invalid sections

### Claude's Discretion
- Exact sidebar completion indicator design (checkmark vs progress ring vs percentage)
- Loading skeleton and transition animations
- Exact spacing, typography scale, and color usage within the established theme
- Error state handling and messaging patterns
- localStorage persistence strategy (debounce timing, conflict resolution)
- Specific GRI Topic Standards to include and their field-type mappings
- Draggable divider implementation approach

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FORM-01 | GRI module with structured form mirroring GRI Standards disclosure requirements | Zod schema defining all GRI Universal Standards (GRI 1, 2, 3) + Topic Standards (201-419), driven by react-hook-form with section-based navigation |
| FORM-06 | Form validation enforcing required fields and framework-specific rules via Zod schemas | Zod schema validation with @hookform/resolvers, triggered on section navigation/validate action (not inline), error messages via shadcn/ui FieldError |
| FORM-07 | Live HTML preview showing framework-formatted report updating in real-time as student types | useWatch from react-hook-form feeding a ReportPreview component in the right panel, rendered inside shadcn/ui ResizablePanel |
| ACCU-01 | GRI form schema mirrors actual GRI Universal Standards structure (GRI 1, 2, 3 + Topic Standards) | Complete GRI disclosure enumeration researched: 30 GRI 2 disclosures, 3 GRI 3 disclosures, and all Topic Standards 201-419 with individual disclosure codes |
| OUT-01 | PDF export per module generating a professionally formatted, framework-accurate downloadable report | @react-pdf/renderer v4 with React 19 compatibility, corporate report template with cover page, headers/footers, page numbers, Content Index |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| react-hook-form | ^7.71+ | Form state management, validation orchestration | Minimal re-renders via uncontrolled components, useWatch for isolated subscriptions, FormProvider for deep nesting -- industry standard for complex React forms |
| zod | ^3.24 (3.x line) | Schema definition and validation | Type inference via z.infer, composable schemas, first-class support with @hookform/resolvers. Use v3 line since project already has stable deps; v4 migration can be done later |
| @hookform/resolvers | ^5.x | Bridge between react-hook-form and Zod | zodResolver connects Zod schemas to react-hook-form validation pipeline |
| @react-pdf/renderer | ^4.3 | PDF document generation | React-native component model for PDFs, flexbox layout, full styling API, React 19 compatible since v4.1.0 |
| react-resizable-panels | (via shadcn/ui) | Draggable resizable panel layout | Installed automatically via shadcn/ui Resizable component; keyboard accessible, touch optimized |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| shadcn/ui Field | latest | Form field layout (Field, FieldLabel, FieldError, FieldDescription) | Every form field wrapper -- provides accessible labels, error display, horizontal/vertical layout |
| shadcn/ui Resizable | latest | ResizablePanelGroup, ResizablePanel, ResizableHandle | The side-by-side form/preview layout with draggable divider |
| shadcn/ui Checkbox | latest | Material topic selection checkboxes | Materiality checklist where students select which Topic Standards apply |
| shadcn/ui ScrollArea | latest | Scrollable sidebar and form content | Persistent section sidebar and independently scrollable panels |
| shadcn/ui Accordion | latest | Collapsible sections for Topic Standards | Expanding/collapsing topic standard disclosure sections after materiality selection |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @react-pdf/renderer | jsPDF + html2canvas | jsPDF is lighter but requires manual layout; @react-pdf/renderer gives React component model with flexbox -- far better for complex multi-page corporate reports |
| @react-pdf/renderer | react-to-pdf (html2canvas wrapper) | Simpler but captures screenshot of HTML -- loses text selectability, poor multi-page support, no dynamic Content Index |
| react-hook-form | Formik | Formik re-renders more aggressively, weaker TypeScript inference, larger bundle -- react-hook-form is the clear winner for large forms |
| Zod v3 | Zod v4 | v4 is 14x faster parsing but has breaking API changes; v3 has wider ecosystem support and @hookform/resolvers compatibility is more battle-tested. Recommend v3 for stability |

**Installation:**
```bash
npm install react-hook-form zod @hookform/resolvers @react-pdf/renderer
npx shadcn@latest add field resizable checkbox scroll-area accordion
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── data/
│   └── frameworks.ts                    # Existing framework metadata
├── schemas/
│   └── gri.ts                           # GRI Zod schema + types + disclosure metadata
├── components/
│   ├── ui/                              # shadcn/ui primitives (existing + new)
│   ├── gri/
│   │   ├── GriForm.tsx                  # Main form orchestrator with FormProvider
│   │   ├── GriSidebar.tsx               # Section navigation sidebar with completion indicators
│   │   ├── GriUniversalSection.tsx      # GRI 2 General Disclosures form section
│   │   ├── GriMaterialTopics.tsx        # GRI 3 materiality checklist + management approach
│   │   ├── GriTopicSection.tsx          # Reusable Topic Standard disclosure fields (201-419)
│   │   ├── GriReportPreview.tsx         # Live HTML preview of the report
│   │   └── GriPdfDocument.tsx           # @react-pdf/renderer Document component
│   └── shared/
│       └── DisclosureField.tsx          # Generic disclosure field renderer (textarea/input/select by type)
├── hooks/
│   ├── useLocalStorageForm.ts           # Debounced localStorage persistence for react-hook-form
│   └── useGriCompletion.ts              # Section completion percentage calculator
├── lib/
│   └── utils.ts                         # Existing utility (cn)
└── pages/
    └── ModulePage.tsx                   # Updated to render GriForm for gri slug
```

### Pattern 1: Schema-Driven Form with Disclosure Metadata
**What:** Define GRI disclosures as a typed metadata array alongside the Zod schema. Each disclosure entry carries its code, label, section, field type, and whether it's required. The Zod schema is derived from this metadata, and the form UI is generated from it.
**When to use:** Any framework module -- this is the replication pattern for Phase 3.
**Example:**
```typescript
// src/schemas/gri.ts

import { z } from "zod";

// Disclosure field types
type FieldType = "textarea" | "text" | "number" | "select" | "boolean";

interface DisclosureDefinition {
  code: string;         // e.g., "2-1"
  label: string;        // e.g., "Organizational details"
  section: GriSection;  // which GRI section this belongs to
  fieldType: FieldType;
  required: boolean;
  options?: string[];   // for select fields
  unit?: string;        // for number fields (e.g., "tCO2e", "GJ")
}

type GriSection =
  | "gri1"    // Foundation (reporting approach)
  | "gri2"    // General Disclosures (2-1 through 2-30)
  | "gri3"    // Material Topics (3-1 through 3-3)
  | string;   // Topic Standard codes: "201", "202", ..., "419"

// Metadata array drives both schema and UI
export const griDisclosures: DisclosureDefinition[] = [
  { code: "2-1", label: "Organizational details", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-2", label: "Entities included in sustainability reporting", section: "gri2", fieldType: "textarea", required: true },
  // ... all 30 GRI 2 disclosures ...
  { code: "3-1", label: "Process to determine material topics", section: "gri3", fieldType: "textarea", required: true },
  { code: "3-2", label: "List of material topics", section: "gri3", fieldType: "textarea", required: true },
  { code: "3-3", label: "Management of material topics", section: "gri3", fieldType: "textarea", required: true },
  // Topic Standards (only rendered when topic is marked material)
  { code: "305-1", label: "Direct (Scope 1) GHG emissions", section: "305", fieldType: "number", required: false, unit: "tCO2e" },
  // ... etc
];

// Build Zod schema from metadata
// Universal disclosures: always present
// Topic disclosures: optional (only validated when topic is selected as material)
```

### Pattern 2: FormProvider + useWatch for Live Preview
**What:** Wrap the entire GRI form in react-hook-form's FormProvider. The preview component uses useWatch to subscribe to form values without causing re-renders in the form panel. This keeps typing responsive even with 100+ fields.
**When to use:** Any form that needs a live preview.
**Example:**
```typescript
// GriForm.tsx
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function GriForm() {
  const methods = useForm<GriFormData>({
    resolver: zodResolver(griSchema),
    defaultValues: loadFromLocalStorage() ?? getDefaultValues(),
    mode: "onSubmit", // validate on section submit, not onChange
  });

  return (
    <FormProvider {...methods}>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={55} minSize={30}>
          {/* Form panel with sidebar */}
          <div className="flex h-full">
            <GriSidebar />
            <div className="flex-1 overflow-y-auto">
              <GriFormContent />
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={45} minSize={25}>
          {/* Preview panel - independently scrollable */}
          <ScrollArea className="h-full">
            <GriReportPreview />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </FormProvider>
  );
}

// GriReportPreview.tsx -- uses useWatch for isolated re-renders
import { useWatch } from "react-hook-form";

export function GriReportPreview() {
  const values = useWatch(); // subscribes to all values
  // Render formatted report HTML from values
}
```

### Pattern 3: Materiality-Driven Conditional Sections
**What:** GRI 3 requires a materiality assessment. Students check off which Topic Standards are material; those expand with disclosure fields. Non-material topics stay collapsed. The Zod schema validates only material topic disclosures.
**When to use:** GRI module specifically -- other frameworks have different materiality approaches.
**Example:**
```typescript
// Materiality state is part of the form
const griSchema = z.object({
  // Universal Standards (always required)
  gri2: z.object({ /* 30 disclosures */ }),
  gri3: z.object({ /* 3 disclosures */ }),

  // Which topics are material (checklist)
  materialTopics: z.array(z.string()), // e.g., ["201", "305", "401"]

  // Topic Standard disclosures (validated only if topic is in materialTopics)
  topics: z.object({
    "201": z.object({ /* disclosures */ }).optional(),
    "305": z.object({ /* disclosures */ }).optional(),
    // ... all topic standards
  }),
}).superRefine((data, ctx) => {
  // Validate that material topics have required disclosures filled
  for (const topicCode of data.materialTopics) {
    const topicData = data.topics[topicCode];
    if (!topicData) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Material topic ${topicCode} has no disclosures filled`,
        path: ["topics", topicCode],
      });
    }
  }
});
```

### Pattern 4: localStorage Persistence with Debounced Watch
**What:** A custom hook that watches form values via useWatch and persists to localStorage with a debounce. On mount, it hydrates the form from localStorage.
**When to use:** Any form that needs session persistence.
**Example:**
```typescript
// hooks/useLocalStorageForm.ts
import { useEffect, useRef, useCallback } from "react";
import { useWatch, useFormContext } from "react-hook-form";

const STORAGE_KEY = "gri-form-data";
const DEBOUNCE_MS = 1000; // 1 second debounce

export function useLocalStorageForm() {
  const { reset } = useFormContext();
  const values = useWatch();
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  // Persist on change (debounced)
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    }, DEBOUNCE_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [values]);

  // Hydrate on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        reset(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, [reset]);
}
```

### Pattern 5: @react-pdf/renderer Corporate Report Document
**What:** A standalone React component tree using @react-pdf/renderer primitives (Document, Page, View, Text, Image) that renders the GRI report as a downloadable PDF. Completely separate from the HTML preview -- shares data but not components.
**When to use:** PDF export action.
**Example:**
```typescript
// components/gri/GriPdfDocument.tsx
import { Document, Page, View, Text, StyleSheet, Font } from "@react-pdf/renderer";

Font.register({ family: "Inter", src: "/fonts/Inter-Regular.ttf" });

const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: "Inter", fontSize: 10 },
  coverPage: { justifyContent: "center", alignItems: "center" },
  header: { fontSize: 8, color: "#666", marginBottom: 20 },
  sectionTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 8 },
  disclosure: { marginBottom: 12 },
  disclosureCode: { fontSize: 8, color: "#888" },
  notReported: { color: "#999", fontStyle: "italic" },
  contentIndex: { /* table styles */ },
});

interface GriPdfProps {
  data: GriFormData;
  materialTopics: string[];
  validationErrors?: string[];
}

export function GriPdfDocument({ data, materialTopics, validationErrors }: GriPdfProps) {
  return (
    <Document>
      {/* Cover Page */}
      <Page style={[styles.page, styles.coverPage]}>
        <Text style={{ fontSize: 28 }}>GRI Sustainability Report</Text>
        {/* Organization name, date, branding */}
      </Page>

      {/* Report Body */}
      <Page style={styles.page}>
        {validationErrors?.length > 0 && (
          <View style={styles.warningBanner}>
            <Text>This report contains incomplete sections</Text>
          </View>
        )}
        {/* GRI 2 General Disclosures */}
        {/* GRI 3 Material Topics */}
        {/* Selected Topic Standards */}
        {/* Unfilled disclosures marked "Not reported" */}
      </Page>

      {/* GRI Content Index */}
      <Page style={styles.page}>
        <Text style={styles.sectionTitle}>GRI Content Index</Text>
        {/* Table: Disclosure Code | Disclosure Title | Page | Status */}
      </Page>
    </Document>
  );
}
```

### Anti-Patterns to Avoid
- **Single monolithic form component:** With 130+ fields, a single component will be unmanageable. Split into section components (GriUniversalSection, GriMaterialTopics, GriTopicSection) that use useFormContext.
- **Using watch() instead of useWatch():** watch() triggers re-renders at the form root. useWatch() isolates re-renders to the subscribing component. Critical for the live preview pattern.
- **Sharing components between HTML preview and PDF:** @react-pdf/renderer uses its own View/Text primitives, not HTML divs. The preview (HTML) and PDF document (react-pdf) must be separate component trees that consume the same data.
- **Eagerly rendering all Topic Standard fields:** With 33 Topic Standards containing ~90 disclosure fields total, rendering all of them at once wastes resources. Only render expanded sections for material topics.
- **Validating on every keystroke:** The user decision specifies validation on section submit/navigation. Setting react-hook-form mode to "onChange" would cause constant validation of the entire schema. Use mode: "onSubmit" and trigger validation manually with trigger() on section navigation.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Resizable split panels | Custom drag-to-resize with mouse events | shadcn/ui Resizable (react-resizable-panels) | Keyboard accessibility, touch support, min/max constraints, performance optimization all built in |
| PDF generation | html2canvas screenshot or manual canvas drawing | @react-pdf/renderer | True PDF with selectable text, multi-page support, page numbers, flexbox layout, font embedding |
| Form state management | Custom useState per field or Context-based form state | react-hook-form | Uncontrolled component performance, validation integration, error handling, field arrays, deep nesting support |
| Schema validation | Manual validation functions | Zod schemas with @hookform/resolvers | Type inference, composable validators, error messages, framework-specific rules in one declaration |
| Accessible form fields | Custom label/error association with htmlFor/aria-describedby | shadcn/ui Field components | Built-in accessibility, error display, consistent styling, proper ARIA attributes |
| Scroll containers | Custom overflow-y with styled scrollbars | shadcn/ui ScrollArea | Cross-browser consistent scrollbar styling, proper event handling |

**Key insight:** Every hand-rolled solution in this phase would either miss accessibility requirements (resizable panels, form fields) or produce inferior output quality (PDF generation). The ecosystem libraries are mature and battle-tested for exactly these use cases.

## Common Pitfalls

### Pitfall 1: useWatch Causing Full-Form Re-renders in Preview
**What goes wrong:** Using `useWatch()` with no arguments at the form root level triggers re-renders of the entire component tree on every keystroke across all fields.
**Why it happens:** useWatch subscribes to ALL form values by default. If called in a parent component that also renders the form fields, typing in any field re-renders everything.
**How to avoid:** Isolate the preview into its own component that calls useWatch. The form fields should be in a sibling component tree. FormProvider wraps both, but re-renders are isolated to the useWatch consumer.
**Warning signs:** Noticeable lag when typing in form fields; React DevTools shows the entire form re-rendering on every keystroke.

### Pitfall 2: Zod Schema Too Large for Single Validation Pass
**What goes wrong:** With 130+ fields, running the full Zod schema validation on every section submit creates perceptible lag.
**Why it happens:** Zod validates the entire object, not just the changed section.
**How to avoid:** Use react-hook-form's `trigger()` method with specific field names to validate only the current section. Example: `trigger(["gri2.disclosure_2_1", "gri2.disclosure_2_2"])` validates only GRI 2 fields.
**Warning signs:** 200ms+ delay after clicking validate; user perceives form as sluggish.

### Pitfall 3: @react-pdf/renderer Font Registration Issues
**What goes wrong:** PDF renders with fallback fonts instead of the intended Inter font, or throws errors about missing font families.
**Why it happens:** @react-pdf/renderer requires explicit font registration with Font.register() pointing to actual font files (.ttf/.otf). It cannot use CSS @font-face or Google Fonts CDN links. The project uses @fontsource-variable/inter which provides WOFF2, not the raw TTF files @react-pdf/renderer needs.
**How to avoid:** Include Inter .ttf files in the public/ directory and register them with Font.register(). Use static font weights (Regular, Bold) rather than variable fonts, as @react-pdf/renderer does not support variable font files.
**Warning signs:** PDF shows Times New Roman or Helvetica instead of Inter; console errors about font not found.

### Pitfall 4: localStorage Quota Exceeded
**What goes wrong:** Large form data exceeds the ~5MB localStorage limit, causing silent write failures.
**Why it happens:** With 130+ text fields, especially narrative disclosures that can be paragraphs long, serialized form data can grow significantly.
**How to avoid:** Estimate worst case: 130 fields x ~2KB average = ~260KB, well within 5MB. Still, wrap localStorage.setItem in a try/catch and show a warning if it fails. Consider compressing with LZ-string if needed, but likely unnecessary.
**Warning signs:** Data loss on page reload; no error visible to user because localStorage.setItem fails silently in some browsers.

### Pitfall 5: PDF Content Index Page Numbers Are Wrong
**What goes wrong:** The Content Index table lists incorrect page numbers for disclosures because pages haven't been rendered yet when the index is generated.
**Why it happens:** @react-pdf/renderer processes the document in a single pass. You cannot query "what page is this element on?" during render.
**How to avoid:** Use @react-pdf/renderer's `render` prop on Page components or use `fixed` elements for headers/footers with page counts via `pageNumber` render prop. For the Content Index, place it at the END of the document (standard GRI practice) and use the built-in page numbering. The Content Index can reference section names and page ranges rather than exact pages, which is standard practice in real GRI reports.
**Warning signs:** Content Index shows all items on "page 1" or shows NaN for page numbers.

### Pitfall 6: react-resizable-panels v4 API Changes
**What goes wrong:** Import errors or TypeScript errors when using the ResizablePanelGroup/ResizablePanel/ResizableHandle components.
**Why it happens:** react-resizable-panels v4 changed export names (PanelGroup -> Group, PanelResizeHandle -> Separator). shadcn/ui's Resizable component wraps these with stable names, but there were compatibility issues in late 2025.
**How to avoid:** Install the Resizable component via `npx shadcn@latest add resizable` which handles the v4 wrapper. If TypeScript errors occur, check the shadcn/ui GitHub issues for the current workaround. Pin react-resizable-panels to a working version if needed.
**Warning signs:** TypeScript errors about PanelGroup not existing; runtime errors about missing exports.

## Code Examples

Verified patterns from official sources:

### shadcn/ui Field + react-hook-form Controller Pattern
```typescript
// Source: https://ui.shadcn.com/docs/forms/react-hook-form
import { Controller, useFormContext } from "react-hook-form";
import { Field, FieldLabel, FieldError, FieldDescription } from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";

interface DisclosureFieldProps {
  name: string;
  code: string;
  label: string;
  description?: string;
  fieldType: "textarea" | "text" | "number";
}

export function DisclosureField({ name, code, label, description, fieldType }: DisclosureFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid || undefined}>
          <FieldLabel>
            <span className="text-xs text-muted-foreground">GRI {code}</span>
            <br />
            {label}
          </FieldLabel>
          {fieldType === "textarea" ? (
            <Textarea {...field} aria-invalid={fieldState.invalid || undefined} />
          ) : (
            <Input type={fieldType} {...field} aria-invalid={fieldState.invalid || undefined} />
          )}
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
}
```

### shadcn/ui Resizable Panel Layout
```typescript
// Source: https://ui.shadcn.com/docs/components/radix/resizable
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";

<ResizablePanelGroup direction="horizontal" className="h-[calc(100vh-var(--nav-height))]">
  <ResizablePanel defaultSize={55} minSize={30}>
    {/* Form + sidebar content */}
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={45} minSize={25}>
    {/* Preview content */}
  </ResizablePanel>
</ResizablePanelGroup>
```

### @react-pdf/renderer Download Pattern
```typescript
// Source: https://react-pdf.org/ (PDFDownloadLink component)
import { PDFDownloadLink } from "@react-pdf/renderer";
import { GriPdfDocument } from "./GriPdfDocument";

export function PdfExportButton({ formData, materialTopics, errors }) {
  return (
    <PDFDownloadLink
      document={<GriPdfDocument data={formData} materialTopics={materialTopics} validationErrors={errors} />}
      fileName="gri-sustainability-report.pdf"
    >
      {({ loading }) => (
        <Button disabled={loading}>
          {loading ? "Generating PDF..." : "Download PDF Report"}
        </Button>
      )}
    </PDFDownloadLink>
  );
}
```

### react-hook-form Section Validation with trigger()
```typescript
// Source: https://react-hook-form.com/docs/useform/trigger
import { useFormContext } from "react-hook-form";

function handleSectionNavigate(fromSection: string, toSection: string) {
  const { trigger } = useFormContext();

  // Only validate the section being left
  const sectionFields = griDisclosures
    .filter(d => d.section === fromSection)
    .map(d => `${fromSection}.disclosure_${d.code.replace("-", "_")}`);

  const isValid = await trigger(sectionFields);
  if (!isValid) {
    // Show error summary for this section
  }
  // Navigate to toSection regardless (validation errors are shown but don't block navigation)
}
```

## GRI Standards Reference Data

### Universal Standards Structure
| Standard | Disclosures | Section | Notes |
|----------|-------------|---------|-------|
| GRI 1: Foundation 2021 | N/A (principles only) | gri1 | No disclosure fields -- just reporting principles. Include as an intro/guidance section |
| GRI 2: General Disclosures 2021 | 2-1 through 2-30 (30 disclosures) | gri2 | Always required. 5 subsections: Organization, Activities, Governance, Strategy, Stakeholder Engagement |
| GRI 3: Material Topics 2021 | 3-1 through 3-3 (3 disclosures) | gri3 | Always required. Includes the materiality checklist that gates Topic Standards |

### GRI 2 Subsections (for sidebar grouping)
| Subsection | Disclosures | Theme |
|------------|-------------|-------|
| The Organization | 2-1 to 2-5 | Identity, entities, reporting period, restatements, assurance |
| Activities and Workers | 2-6 to 2-8 | Value chain, employees, non-employee workers |
| Governance | 2-9 to 2-21 | Board structure, nomination, oversight, remuneration |
| Strategy, Policies, Practices | 2-22 to 2-28 | Sustainability strategy, policy commitments, compliance |
| Stakeholder Engagement | 2-29 to 2-30 | Engagement approach, collective bargaining |

### Topic Standards (materiality-gated)
| Series | Standards | Theme | Disclosure Count |
|--------|-----------|-------|-----------------|
| Economic (200) | 201-207 | Economic performance, market presence, procurement, anti-corruption, tax | ~18 disclosures |
| Environmental (300) | 301-308 | Materials, energy, water, biodiversity, emissions, waste, compliance, suppliers | ~30 disclosures |
| Social (400) | 401-419 | Employment, health/safety, training, diversity, human rights, communities, privacy | ~34 disclosures |
| **Total** | **33 Topic Standards** | | **~82 disclosures** |

### Key Topic Standards with Quantitative Fields
These standards have structured numeric inputs (not just narrative textareas):
- **GRI 302 Energy:** consumption in GJ, intensity ratios, reduction amounts
- **GRI 303 Water:** withdrawal/discharge/consumption in megalitres
- **GRI 305 Emissions:** Scope 1/2/3 in tCO2e, intensity ratios, ODS in tonnes CFC-11 eq
- **GRI 306 Waste:** generated/diverted/disposed in metric tonnes
- **GRI 401 Employment:** hire/turnover counts and rates
- **GRI 403 OHS:** injury rates (LTIR, TRIR), fatality counts
- **GRI 405 Diversity:** percentage breakdowns by gender/age group

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Formik + Yup | react-hook-form + Zod | 2022-2023 shift | Better performance (uncontrolled), native TypeScript inference |
| shadcn/ui FormField/FormItem | shadcn/ui Field/FieldLabel/FieldError | October 2025 | New Field-based API replaces old Form component; more composable |
| react-resizable-panels v3 | react-resizable-panels v4 | Late 2025 | New export names (Group, Panel, Separator), pixel/rem unit support, but breaking changes |
| Zod v3 | Zod v4 available | Mid 2025 | 14x faster parsing, but breaking changes. v3 still maintained and recommended for stability |
| @react-pdf/renderer v3 | @react-pdf/renderer v4 | 2024 | React 19 support (since v4.1.0), improved performance |

**Deprecated/outdated:**
- shadcn/ui `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormMessage`: Replaced by the new `Field`, `FieldLabel`, `FieldError`, `FieldDescription` components (October 2025 update)
- `PanelGroup`, `Panel`, `PanelResizeHandle` direct imports from react-resizable-panels: Use shadcn/ui Resizable wrapper which handles v4 API changes

## Open Questions

1. **Inter font files for @react-pdf/renderer**
   - What we know: The project uses @fontsource-variable/inter for web rendering. @react-pdf/renderer needs .ttf files, not variable WOFF2.
   - What's unclear: Exact path to download and bundle Inter .ttf files for PDF generation
   - Recommendation: Download Inter Regular/Bold/SemiBold .ttf files from Google Fonts and place in `public/fonts/`. Register with Font.register() in the PDF component. This is a straightforward task -- just needs to be done explicitly.

2. **GRI Topic Standard field type mappings**
   - What we know: Each of the ~82 Topic Standard disclosures needs a field type (textarea, number, select). The user decided on mixed field types.
   - What's unclear: Exact per-disclosure field type for all 82 Topic disclosures -- this is domain knowledge work.
   - Recommendation: Default all disclosures to textarea. Override to number+unit for known quantitative disclosures (305-1 through 305-7 emissions, 302-1 through 302-5 energy, 303-3 through 303-5 water, 306-3 through 306-5 waste, etc.). This can be refined iteratively.

3. **Full-page layout height calculation**
   - What we know: The app uses a TopNav and a `max-w-7xl` centered container. The GRI module needs to break out of this container for a full-height resizable layout.
   - What's unclear: Whether to override AppLayout for the GRI route or create a new layout.
   - Recommendation: The GRI module page should use `calc(100vh - nav-height)` for the resizable panel group height. May need to adjust the ModulePage rendering to pass through full width/height when in "assessment mode" vs the current intro view. This is an architecture decision for the planner.

## Sources

### Primary (HIGH confidence)
- [shadcn/ui Field docs](https://ui.shadcn.com/docs/components/radix/field) - Field component API, installation, react-hook-form integration
- [shadcn/ui Resizable docs](https://ui.shadcn.com/docs/components/radix/resizable) - ResizablePanelGroup API, installation
- [react-hook-form Advanced Usage](https://react-hook-form.com/advanced-usage) - FormProvider, useFormContext, multi-step forms, performance
- [react-hook-form useWatch](https://react-hook-form.com/docs/usewatch) - Isolated subscription API for preview rendering
- [@react-pdf/renderer docs](https://react-pdf.org/) - Components, styling, font registration, PDFDownloadLink
- [@react-pdf/renderer compatibility](https://react-pdf.org/compatibility) - React 19 support confirmed in v4.1.0+
- [GRI 2: General Disclosures 2021](https://www.globalreporting.org/publications/documents/english/gri-2-general-disclosures-2021/) - Official standard structure
- [Brother GRI Content Index](https://global.brother/en/sustainability/table/gri) - Complete GRI disclosure enumeration with codes and titles verified

### Secondary (MEDIUM confidence)
- [react-resizable-panels v4 PR](https://github.com/bvaughn/react-resizable-panels/pull/528) - Breaking changes documentation
- [shadcn/ui react-resizable-panels v4 compatibility](https://github.com/shadcn-ui/ui/issues/9136) - Known issues and workarounds
- [Zod v4 release notes](https://zod.dev/v4) - v4 changes and migration guide
- [react-hook-form-storage](https://github.com/francogabriel92/react-hook-form-storage) - localStorage persistence patterns for react-hook-form

### Tertiary (LOW confidence)
- GRI Topic Standard field type mappings (quantitative vs narrative): Based on domain knowledge of GRI reporting practice, not verified against a structured data source. Field type assignments should be validated during implementation.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries are well-documented, widely used, and verified against official sources. React 19 compatibility confirmed for all.
- Architecture: HIGH - Patterns follow official react-hook-form and shadcn/ui documentation. Schema-driven form pattern is well-established.
- Pitfalls: HIGH - Based on documented issues (react-resizable-panels v4 breaking changes, font registration, useWatch performance) from official GitHub issues and docs.
- GRI domain accuracy: MEDIUM - Disclosure structure verified against real GRI Content Index (Brother Corporation), but per-disclosure field types are estimated based on domain knowledge.

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable domain -- GRI Standards updated infrequently, libraries on stable major versions)
