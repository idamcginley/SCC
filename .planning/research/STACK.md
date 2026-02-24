# Stack Research

**Domain:** React SPA assessment platform with structured forms, live report preview, and PDF export
**Researched:** 2026-02-24
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| React | ^19.2.0 | UI framework | Current stable release (19.2.3). Functional components + hooks are the standard. No need for server components or RSC in a client-side SPA -- React 19 is still the right baseline for ecosystem compatibility. |
| TypeScript | ^5.5.0 | Type safety | Required by Zod 4 (strict mode). Catches form schema errors at compile time. The entire stack (react-hook-form, Zod, shadcn) has first-class TS support. |
| Vite | ^7.3.0 | Build tool / dev server | The uncontested standard for React SPAs in 2025-2026. Near-instant HMR, native ES module dev serving, Rollup-based production builds with tree-shaking. Requires Node.js 20.19+ or 22.12+. |
| Tailwind CSS | ^4.2.0 | Utility-first CSS | v4 landed January 2025 with the Oxide engine (5x faster full builds, 100x faster incremental). Zero-config content detection. CSS-first configuration via `@theme` directives replaces the old JS config file. Native Vite plugin via `@tailwindcss/vite`. |
| React Router | ^7.5.0 | Client-side routing | Used in "library mode" (not framework mode) for this SPA. Provides declarative routing between the 5 module views, dashboard, and instructor review. Mature, well-documented, near-universal adoption. |

### Form Management

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| react-hook-form | ^7.71.0 | Form state management | The dominant React form library. Uncontrolled components minimize re-renders -- critical when forms have 50+ fields per framework module. Zero dependencies. ~9KB gzipped. TypeScript-first generics system provides end-to-end type safety from schema to form field. |
| Zod | ^4.0.0 | Schema validation | Zod 4 is stable. 2KB core bundle (gzipped). Zero external dependencies. TypeScript-first with automatic type inference from schemas. Defines the shape of each sustainability framework's disclosure requirements as typed schemas -- single source of truth for form structure, validation rules, and TypeScript types. |
| @hookform/resolvers | ^5.0.0 | Bridge RHF + Zod | Official resolver package connecting react-hook-form to Zod. Handles nested object/array validation errors correctly (hierarchical error keys, not flat dot-notation). |

### UI Components

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| shadcn/ui | latest (CLI) | Component library | Copy-paste components built on Radix UI + Tailwind CSS. You own the code -- no dependency lock-in. Provides Form, Input, Textarea, Select, Tabs, Card, Dialog, Sheet, and other components needed for a professional assessment UI. Official Vite installation path documented. Corporate-appropriate aesthetic out of the box. |
| Radix UI Primitives | (via shadcn) | Accessible primitives | Headless, unstyled, WAI-ARIA compliant components. shadcn wraps these with Tailwind styles. Handles keyboard navigation, focus management, screen reader support automatically. |
| lucide-react | ^0.575.0 | Icons | 1700+ consistent SVG icons. Tree-shakeable (only ships icons you import). The default icon library in shadcn/ui -- seamless integration. |
| clsx | ^2.1.0 | Conditional classes | Tiny (239B) utility for building className strings conditionally. |
| tailwind-merge | ^3.0.0 | Class conflict resolution | Resolves Tailwind class conflicts (e.g., `p-4` vs `p-2` in component overrides). Combined with clsx in the `cn()` utility function that shadcn components use throughout. |

### PDF Generation

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| @react-pdf/renderer | ^4.3.0 | PDF document creation | React-first PDF generation using JSX components. Produces real PDFs with searchable/selectable text (not screenshot-based). Full control over layout, fonts, headers, footers, page breaks. React 19 supported since v4.1.0. Ideal for producing framework-accurate sustainability reports with proper structure. |

**Critical note on PDF approach:** This project uses @react-pdf/renderer to define PDF documents as React components with its own layout primitives (Document, Page, View, Text, etc.). These are NOT regular DOM components -- they render to PDF, not HTML. The live preview uses the `<PDFViewer>` component (renders an iframe with the generated PDF) or `usePDF()` hook for download triggers. The on-screen form preview and the PDF export are two separate rendering paths -- you build both, sharing the same data but with different component trees.

### State Management

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Zustand | ^5.0.0 | Global application state | Lightweight (1.2KB), no boilerplate, no providers. Handles cross-module state: which module is active, instructor view toggle, shared case study data. Simple API: `create()` a store, use it as a hook. Perfect for the modest global state needs of this SPA (~30 concurrent users, no auth, no server state). |

**Form state stays in react-hook-form.** Each module's form state lives in its own `useForm()` instance. Zustand only manages application-level concerns (active module, UI preferences, export state). Do NOT put form field values in Zustand -- react-hook-form handles that with better performance.

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Vitest | Unit/component testing | Native Vite integration, Jest-compatible API. Runs in the same build pipeline as the app. |
| ESLint + eslint-plugin-react-hooks | Linting | Catches hooks rule violations, unused imports. |
| Prettier | Code formatting | Consistent formatting across the team. |
| @testing-library/react | Component testing | Standard for testing React components by user behavior, not implementation details. |

## Installation

```bash
# Scaffold project
npm create vite@latest sustainability-platform -- --template react-ts

# Core dependencies
npm install react-router react-hook-form zod @hookform/resolvers zustand @react-pdf/renderer

# UI dependencies (Tailwind + shadcn prerequisites)
npm install tailwindcss @tailwindcss/vite clsx tailwind-merge lucide-react

# Initialize shadcn/ui (after configuring path aliases)
npx shadcn@latest init

# Add shadcn components as needed
npx shadcn@latest add button card form input textarea select tabs dialog sheet separator badge scroll-area

# Dev dependencies
npm install -D @types/node vitest @testing-library/react @testing-library/jest-dom jsdom eslint prettier eslint-plugin-react-hooks
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| react-hook-form | Formik | Never for this project. Formik uses controlled components (more re-renders), has 7 internal dependencies, is roughly 2x the bundle size, and is effectively in maintenance mode. react-hook-form is the clear winner for complex, performance-sensitive forms. |
| Zod | Yup | Only if the team already has deep Yup expertise. Zod 4 is smaller (2KB vs ~12KB), TypeScript-first (Yup bolted on TS later), and produces cleaner inferred types. Zod is the modern standard. |
| @react-pdf/renderer | jsPDF + html2canvas | Only for trivially simple PDFs. The html2canvas approach screenshots DOM elements -- producing blurry, non-searchable image-based PDFs. Unacceptable for professional sustainability reports that need selectable text, precise layout, and framework-accurate formatting. |
| @react-pdf/renderer | pdfmake | If you prefer JSON-based document definitions over JSX. pdfmake is solid (940K weekly downloads) but forces you into a JSON DSL rather than React components. Since the team is React-native, @react-pdf/renderer's JSX approach is more natural and maintainable. |
| @react-pdf/renderer | react-to-pdf | Never for this project. react-to-pdf wraps html2canvas + jsPDF -- same image-based problems. Not suitable for professional document output. |
| React Router | TanStack Router | If you want maximum type-safe routing with automatic type generation for route params/search params. TanStack Router is excellent but newer with a smaller community. For this SPA with ~6 routes, React Router's maturity and simpler setup wins. Consider TanStack Router for future projects with complex routing needs. |
| Zustand | Jotai | If form state interdependencies become complex (e.g., cross-module calculations). Jotai's atomic model handles fine-grained reactive state better. But for this project's simple global state needs, Zustand's store-based approach is more intuitive and has better DevTools. |
| Zustand | React Context | For trivially small state. Context re-renders all consumers on any change -- problematic with frequent form updates. Zustand provides granular subscriptions out of the box. |
| shadcn/ui | Ant Design | If you want a batteries-included enterprise component library with built-in form components, tables, and data visualization. Ant Design is comprehensive but opinionated (its own design language), large bundle, and harder to customize to match a specific corporate aesthetic. shadcn/ui gives you full code ownership and Tailwind-based styling. |
| shadcn/ui | MUI (Material UI) | If your design specifically requires Material Design. MUI is mature but carries Google's design language. For a PwC-partnered academic platform, a neutral professional aesthetic (which shadcn provides) is more appropriate than Material Design. |
| Tailwind CSS | CSS Modules | If the team strongly prefers traditional CSS authoring. But Tailwind v4's utility approach is faster for building consistent UIs, eliminates naming decisions, and is the foundation shadcn/ui is built on. Using CSS Modules would mean abandoning shadcn. |
| Vite | Next.js | If you need SSR, API routes, or server components. This project is explicitly a static SPA with no backend -- Next.js adds unnecessary complexity, server infrastructure concerns, and deployment constraints. Vite is purpose-built for this use case. |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Create React App (CRA) | Deprecated. No longer maintained. Slow builds, no ESM support. | Vite |
| Formik | Effectively in maintenance mode. Controlled components cause re-render storms on large forms. Larger bundle. | react-hook-form |
| html2canvas + jsPDF | Produces image-based PDFs: blurry text, not searchable, no proper page breaks. Completely inadequate for professional report output. | @react-pdf/renderer |
| Redux / Redux Toolkit | Massive overkill for this project's state needs. Boilerplate-heavy. The app has no async server state, no complex middleware needs. | Zustand |
| Styled Components / Emotion | CSS-in-JS with runtime overhead. Not compatible with shadcn/ui which requires Tailwind. The industry has moved toward zero-runtime CSS solutions. | Tailwind CSS |
| Webpack | Slower than Vite, more complex configuration. No longer the default for new React projects. | Vite (uses Rollup under the hood) |

## Stack Patterns by Variant

**If live preview needs to exactly match PDF output:**
- Define report structure once as @react-pdf/renderer components
- Use `<PDFViewer>` for the live preview (renders actual PDF in an iframe)
- This ensures pixel-perfect match between preview and export
- Tradeoff: slower preview updates (PDF re-generation on each form change), less styling flexibility in preview

**If live preview needs to be fast and responsive (RECOMMENDED):**
- Build the live preview as regular React DOM components styled with Tailwind
- Build a separate @react-pdf/renderer document component tree for PDF export
- Share the same Zod schema and form data between both
- Preview updates instantly on form change; PDF generates only on export
- Tradeoff: two rendering paths to maintain, slight possibility of visual drift between preview and PDF

**If PDF requirements change to simple/basic:**
- Could simplify to browser `window.print()` with a print-specific CSS stylesheet
- Would eliminate @react-pdf/renderer dependency entirely
- Only viable if instructor accepts browser print quality (no custom fonts, limited layout control)

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| @react-pdf/renderer@^4.3 | React 19.x | React 19 support confirmed since v4.1.0 |
| react-hook-form@^7.71 | React 19.x | Full React 19 support in v7 |
| Zod@^4.0 | TypeScript 5.5+ | Requires `strict: true` in tsconfig.json |
| shadcn/ui | Tailwind CSS 4.x | Official Tailwind v4 support documented |
| @tailwindcss/vite | Vite 7.x | Official Vite plugin for Tailwind v4 |
| Zustand@^5.0 | React 19.x | Full React 19 support |
| Vite@^7.3 | Node.js 20.19+ or 22.12+ | Node 18 EOL, requires Node 20+ |

## Sources

- [shadcn/ui Vite Installation](https://ui.shadcn.com/docs/installation/vite) -- Official setup guide for Vite + React + shadcn/ui (HIGH confidence)
- [React Hook Form](https://react-hook-form.com/) -- Official site, feature overview, v7.71 current (HIGH confidence)
- [Zod Official Docs](https://zod.dev/) -- Zod 4 stable, 2KB core, TypeScript 5.5+ required (HIGH confidence)
- [@react-pdf/renderer npm](https://www.npmjs.com/package/@react-pdf/renderer) -- v4.3.2 current, React 19 supported since v4.1.0 (HIGH confidence)
- [@react-pdf/renderer Compatibility](https://react-pdf.org/compatibility) -- Explicit React 16/17/18/19 compatibility matrix (HIGH confidence)
- [Zustand npm](https://www.npmjs.com/package/zustand) -- v5.0.11 current, 20M weekly downloads (HIGH confidence)
- [Vite Releases](https://vite.dev/releases) -- v7.3.1 current, Node 20.19+ required (HIGH confidence)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4) -- v4.2.1 current, Oxide engine, zero-config (HIGH confidence)
- [React Versions](https://react.dev/versions) -- v19.2.3 current stable (HIGH confidence)
- [React Router SPA Guide](https://reactrouter.com/how-to/spa) -- Official SPA mode documentation (HIGH confidence)
- [React Hook Form vs Formik](https://blog.logrocket.com/react-hook-form-vs-formik-comparison/) -- Performance comparison, bundle size analysis (MEDIUM confidence)
- [6 Open-Source PDF Libraries 2025](https://dev.to/ansonch/6-open-source-pdf-generation-and-modification-libraries-every-react-dev-should-know-in-2025-13g0) -- Ecosystem overview with download stats (MEDIUM confidence)
- [React UI Libraries 2025 Comparison](https://makersden.io/blog/react-ui-libs-2025-comparing-shadcn-radix-mantine-mui-chakra) -- shadcn vs MUI vs Mantine landscape (MEDIUM confidence)
- [State Management 2025](https://makersden.io/blog/react-state-management-in-2025) -- Zustand vs Jotai vs Redux analysis (MEDIUM confidence)
- [PDF Libraries Comparison](https://dmitriiboikov.com/posts/2025/01/pdf-generation-comarison/) -- jsPDF vs @react-pdf/renderer vs pdfmake benchmarks (MEDIUM confidence)
- [TanStack Router vs React Router](https://betterstack.com/community/comparisons/tanstack-router-vs-react-router/) -- Routing comparison for SPAs (MEDIUM confidence)
- [Lucide React npm](https://www.npmjs.com/package/lucide-react) -- v0.575.0, 10K+ dependent projects (HIGH confidence)

---
*Stack research for: Sustainability Reporting Assessment Platform*
*Researched: 2026-02-24*
