# Phase 1: Foundation and Application Shell - Research

**Researched:** 2026-02-24
**Domain:** React/Vite/TypeScript application shell with Tailwind CSS v4 and shadcn/ui
**Confidence:** HIGH

## Summary

This phase bootstraps a greenfield React SPA using Vite 7, TypeScript, Tailwind CSS v4, and shadcn/ui. The core deliverable is a polished dashboard with 5 sustainability framework cards (GRI, ISSB, CSRD, ESRS, SBTi), client-side routing to module placeholder pages, a persistent top nav bar with breadcrumbs, and a library of shared UI primitives.

The toolchain is mature and well-documented. Vite 7 with the `@tailwindcss/vite` plugin provides zero-config Tailwind v4 integration. shadcn/ui supplies copy-paste components built on Radix UI primitives and Tailwind classes, giving full ownership of component code. React Router v7 in declarative mode (`BrowserRouter`) is the simplest path for a pure client-side SPA with no SSR needs.

**Primary recommendation:** Use `npm create vite@latest` with the `react-ts` template, add Tailwind v4 via `@tailwindcss/vite`, initialize shadcn/ui, install React Router v7 (`react-router`) in declarative/BrowserRouter mode, self-host Inter via `@fontsource-variable/inter`, and use Lucide React for icons. Define a forest-and-earth color palette using Tailwind v4's `@theme` directive with oklch values.

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- Even grid of 5 framework cards (responsive: 3+2 or 2+2+1 depending on viewport)
- Minimal header: "Sustainability Consulting Club (SCC) -- PwC Case Study: Sustainability Reporting" or similar branding. Clean, professional, not a hero section.
- Flat grid with no grouping labels or category dividers between frameworks
- Top navigation bar persistent across pages (app name, Home link, breadcrumbs when inside a module)
- Forest & earth direction: deep greens, warm tans, charcoal -- nature-inspired, grounded
- Light mode only (no dark mode toggle)
- Clean sans-serif typography (Inter, Geist, or similar -- modern, highly legible)
- Uniform palette across all frameworks -- no per-framework accent colors; frameworks distinguished by icons/labels only
- Each card shows: framework name, 1-2 sentence description of what the framework covers, and a simple distinguishing icon
- No status indicators in Phase 1 (no "Not Started" badges) -- cards are clean
- Entire card is clickable (navigates to module page)
- Subtle lift/shadow on hover for polished interaction feedback
- Framework intro page when navigating into a module: brief overview of the framework (purpose, who uses it, structure)
- Two-panel layout skeleton hinted (left panel for future form, right panel for future preview) even before forms exist
- Breadcrumb navigation in top nav (e.g., "Dashboard > GRI Standards")
- Module switching only through dashboard -- no cross-module switcher dropdown
- Header branding should reference "Sustainability Consulting Club (SCC)" and the PwC case study context
- Cards should feel corporate-polished: think consulting firm meets environmental report
- Forest & earth palette: not bright green -- muted, grounded tones (deep forest green, warm tan, charcoal)

### Claude's Discretion
- Exact icon choices for each framework card
- Specific font selection within the clean sans-serif family
- Spacing, padding, and responsive breakpoint details
- Framework intro page copy and depth of content
- Placeholder content in the two-panel layout skeleton
- shadcn/ui component customization details
- Error states and loading states

### Deferred Ideas (OUT OF SCOPE)
None -- discussion stayed within phase scope
</user_constraints>

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | React + Vite + TypeScript project with Tailwind CSS and shadcn/ui component library | Standard Stack section: Vite 7 + react-ts template, Tailwind v4 via @tailwindcss/vite plugin, shadcn/ui init with path aliases. Full installation sequence documented. |
| FOUND-02 | Module dashboard landing page with 5 framework cards (GRI, ISSB, CSRD, ESRS, SBTi) showing module status | Architecture Patterns section: responsive CSS grid layout, shadcn/ui Card component composition, React Router Links wrapping cards for navigation, route definitions for dashboard + 5 module pages |
| FOUND-03 | Corporate polished visual theme -- professional typography, clean layout, muted sustainability palette | Architecture Patterns section: @theme directive with oklch forest/earth palette, @fontsource-variable/inter for typography, shadcn/ui CSS variable theming, hover transitions on cards |
</phase_requirements>

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| Vite | 7.x | Build tool and dev server | Fastest HMR, native ESM, industry standard for React SPAs |
| React | 19.x | UI framework | Comes with Vite react-ts template, current stable |
| TypeScript | 5.x | Type safety | Comes with Vite react-ts template |
| Tailwind CSS | 4.2 | Utility-first CSS | CSS-first config via @theme, oklch palette, @tailwindcss/vite plugin eliminates PostCSS setup |
| shadcn/ui | latest (CLI) | UI component library | Copy-paste components, full code ownership, built on Radix + Tailwind, 70+ components |
| React Router | 7.x | Client-side routing | Declarative BrowserRouter mode for pure SPA, unified package (`react-router`) |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tailwindcss/vite | 4.x | Tailwind Vite plugin | Always -- replaces PostCSS config entirely for Tailwind v4 |
| @fontsource-variable/inter | latest | Self-hosted Inter variable font | Import once in entry file, reference in @theme |
| lucide-react | 0.564+ | Icon library | shadcn/ui default icon set, tree-shakable, 1000+ icons |
| @types/node | latest | Node type definitions | Required for path.resolve in vite.config.ts |
| clsx + tailwind-merge (via cn) | latest | Class name merging | Installed automatically by shadcn/ui init |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| React Router declarative | React Router framework mode | Framework mode adds SSR, code-splitting, loaders -- unnecessary complexity for this static-hosted SPA |
| @fontsource-variable/inter | Google Fonts CDN link | Self-hosted avoids external dependency, version-locks font, better performance |
| Inter | Geist | Both are excellent clean sans-serifs. Inter has broader ecosystem support, more weights, and is the de facto standard for professional web apps. Recommend Inter. |
| shadcn/ui | Material UI or Chakra UI | shadcn gives code ownership (no dependency lock-in), lighter bundles, full Tailwind integration |

**Installation:**
```bash
# 1. Scaffold project
npm create vite@latest module-dashboard -- --template react-ts
cd module-dashboard
npm install

# 2. Add Tailwind CSS v4
npm install tailwindcss @tailwindcss/vite

# 3. Add React Router v7
npm install react-router

# 4. Add font and icons
npm install @fontsource-variable/inter lucide-react

# 5. Add Node types for vite.config.ts path alias
npm install -D @types/node

# 6. Initialize shadcn/ui (after configuring vite.config.ts and tsconfig)
npx shadcn@latest init

# 7. Add needed components
npx shadcn@latest add button card tabs breadcrumb input label select textarea separator
```

## Architecture Patterns

### Recommended Project Structure
```
src/
├── components/
│   ├── ui/                # shadcn/ui generated components (button, card, tabs, etc.)
│   ├── layout/            # App-level layout components
│   │   ├── AppLayout.tsx  # Top nav + Outlet wrapper
│   │   ├── TopNav.tsx     # Persistent navigation bar
│   │   └── Breadcrumbs.tsx # Dynamic breadcrumb from route
│   └── dashboard/
│       └── FrameworkCard.tsx # Single framework card component
├── pages/
│   ├── DashboardPage.tsx  # Grid of 5 framework cards
│   └── ModulePage.tsx     # Framework intro + two-panel skeleton
├── data/
│   └── frameworks.ts      # Static data for 5 frameworks (name, description, icon, slug)
├── lib/
│   └── utils.ts           # cn() helper (created by shadcn init)
├── App.tsx                # Route definitions
├── main.tsx               # Entry point: BrowserRouter + App
└── index.css              # Tailwind import + @theme + font import
```

### Pattern 1: Declarative BrowserRouter Routing
**What:** Use React Router v7 in declarative mode with nested routes and an `<Outlet>` for shared layout.
**When to use:** Pure client-side SPA without SSR needs.
**Example:**
```typescript
// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "@fontsource-variable/inter";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

```typescript
// src/App.tsx
import { Routes, Route } from "react-router";
import { AppLayout } from "./components/layout/AppLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { ModulePage } from "./pages/ModulePage";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="module/:frameworkSlug" element={<ModulePage />} />
      </Route>
    </Routes>
  );
}
```

### Pattern 2: Tailwind v4 CSS-First Theming with @theme
**What:** Define all design tokens (colors, fonts, radius) in CSS using Tailwind v4's `@theme` directive and CSS variables. shadcn/ui CSS variables layer on top.
**When to use:** Always in Tailwind v4 -- replaces the old tailwind.config.js approach.
**Example:**
```css
/* src/index.css */
@import url("https://fonts.googleapis.com/css2?family=Inter:wght@300..800&display=swap");
@import "tailwindcss";

@theme {
  --font-sans: 'Inter Variable', 'Inter', ui-sans-serif, system-ui, sans-serif;
  --color-forest-50: oklch(0.97 0.01 155);
  --color-forest-100: oklch(0.93 0.02 155);
  --color-forest-200: oklch(0.87 0.04 155);
  --color-forest-300: oklch(0.78 0.06 155);
  --color-forest-400: oklch(0.65 0.09 155);
  --color-forest-500: oklch(0.52 0.10 155);
  --color-forest-600: oklch(0.42 0.09 155);
  --color-forest-700: oklch(0.35 0.08 155);
  --color-forest-800: oklch(0.28 0.06 155);
  --color-forest-900: oklch(0.22 0.05 155);
  --color-forest-950: oklch(0.15 0.04 155);
  --color-earth-50: oklch(0.97 0.01 80);
  --color-earth-100: oklch(0.93 0.02 80);
  --color-earth-200: oklch(0.87 0.04 75);
  --color-earth-300: oklch(0.78 0.05 70);
  --color-earth-400: oklch(0.68 0.06 65);
  --color-earth-500: oklch(0.58 0.06 60);
  --color-earth-600: oklch(0.50 0.05 55);
  --color-earth-700: oklch(0.42 0.04 50);
  --color-earth-800: oklch(0.35 0.03 45);
  --color-earth-900: oklch(0.28 0.02 40);
  --color-charcoal-50: oklch(0.95 0.005 250);
  --color-charcoal-100: oklch(0.88 0.005 250);
  --color-charcoal-200: oklch(0.78 0.005 250);
  --color-charcoal-300: oklch(0.65 0.005 250);
  --color-charcoal-400: oklch(0.52 0.005 250);
  --color-charcoal-500: oklch(0.42 0.005 250);
  --color-charcoal-600: oklch(0.35 0.005 250);
  --color-charcoal-700: oklch(0.28 0.005 250);
  --color-charcoal-800: oklch(0.22 0.005 250);
  --color-charcoal-900: oklch(0.16 0.005 250);
}

/* shadcn/ui CSS variables -- forest/earth override */
:root {
  --background: oklch(0.985 0.005 80);
  --foreground: oklch(0.16 0.005 250);
  --card: oklch(1.0 0 0);
  --card-foreground: oklch(0.16 0.005 250);
  --primary: oklch(0.35 0.08 155);
  --primary-foreground: oklch(0.985 0.005 80);
  --secondary: oklch(0.93 0.02 80);
  --secondary-foreground: oklch(0.22 0.005 250);
  --muted: oklch(0.95 0.01 80);
  --muted-foreground: oklch(0.45 0.01 250);
  --accent: oklch(0.93 0.02 155);
  --accent-foreground: oklch(0.22 0.05 155);
  --destructive: oklch(0.55 0.2 25);
  --border: oklch(0.90 0.01 80);
  --input: oklch(0.90 0.01 80);
  --ring: oklch(0.42 0.09 155);
  --radius: 0.5rem;
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
}
```

### Pattern 3: Shared Layout with Outlet
**What:** Use a layout route that renders persistent UI (top nav, breadcrumbs) and an `<Outlet>` for page content.
**When to use:** When multiple routes share navigation chrome.
**Example:**
```typescript
// src/components/layout/AppLayout.tsx
import { Outlet } from "react-router";
import { TopNav } from "./TopNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
```

### Pattern 4: Framework Data as Static Config
**What:** Define all 5 frameworks as a typed array of objects so dashboard and module pages share a single source of truth.
**When to use:** When framework metadata is static and used in multiple places.
**Example:**
```typescript
// src/data/frameworks.ts
import { Leaf, BarChart3, FileText, ClipboardList, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Framework {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
}

export const frameworks: Framework[] = [
  {
    slug: "gri",
    name: "GRI Standards",
    shortName: "GRI",
    description: "Global Reporting Initiative standards for broad stakeholder-focused sustainability disclosure.",
    icon: Leaf,
  },
  {
    slug: "issb",
    name: "ISSB (IFRS S1/S2)",
    shortName: "ISSB",
    description: "International Sustainability Standards Board framework for investor-focused financial materiality.",
    icon: BarChart3,
  },
  {
    slug: "csrd",
    name: "CSRD",
    shortName: "CSRD",
    description: "EU Corporate Sustainability Reporting Directive requiring double materiality assessment.",
    icon: FileText,
  },
  {
    slug: "esrs",
    name: "ESRS",
    shortName: "ESRS",
    description: "European Sustainability Reporting Standards implementing CSRD disclosure requirements.",
    icon: ClipboardList,
  },
  {
    slug: "sbti",
    name: "SBTi",
    shortName: "SBTi",
    description: "Science Based Targets initiative for validated emissions reduction target-setting.",
    icon: Target,
  },
];
```

### Pattern 5: Clickable Card with Router Link
**What:** Wrap shadcn/ui Card in a React Router `<Link>` to make the entire card a navigation target with hover lift.
**When to use:** Dashboard framework cards.
**Example:**
```typescript
// src/components/dashboard/FrameworkCard.tsx
import { Link } from "react-router";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import type { Framework } from "@/data/frameworks";

interface FrameworkCardProps {
  framework: Framework;
}

export function FrameworkCard({ framework }: FrameworkCardProps) {
  const Icon = framework.icon;
  return (
    <Link to={`/module/${framework.slug}`} className="group block">
      <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle>{framework.name}</CardTitle>
          <CardDescription>{framework.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
```

### Pattern 6: Breadcrumb from Route Params
**What:** Use `useLocation` and `useParams` to dynamically build breadcrumbs from the current route.
**When to use:** Top nav breadcrumb that updates as user navigates between dashboard and module pages.
**Example:**
```typescript
// src/components/layout/Breadcrumbs.tsx
import { useLocation, useParams, Link } from "react-router";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink,
  BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { frameworks } from "@/data/frameworks";

export function AppBreadcrumbs() {
  const location = useLocation();
  const { frameworkSlug } = useParams();

  if (location.pathname === "/") return null;

  const framework = frameworks.find((f) => f.slug === frameworkSlug);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {framework && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{framework.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### Anti-Patterns to Avoid
- **Importing all Lucide icons:** Only import the specific icons used. Lucide is tree-shakable but barrel imports defeat this.
- **Using tailwind.config.js with v4:** Tailwind v4 uses CSS-first config via `@theme`. The old JS config file is not needed and will cause confusion.
- **Installing `react-router-dom`:** In React Router v7, the unified package is `react-router`. The `react-router-dom` package is v6 and should not be mixed.
- **Using `@tailwind base; @tailwind components; @tailwind utilities;`:** This is Tailwind v3 syntax. In v4, use `@import "tailwindcss";`.
- **Putting page components in `components/`:** Pages are route-level, not reusable components. Keep them in `pages/` for clarity.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| UI primitives (buttons, cards, tabs, inputs) | Custom component library | shadcn/ui (`npx shadcn@latest add ...`) | Accessible, keyboard-navigable, composable, Tailwind-native |
| Class name merging | String concatenation | `cn()` from shadcn/ui (clsx + tailwind-merge) | Handles Tailwind class conflicts correctly |
| Icon set | Custom SVGs or icon font | lucide-react | Tree-shakable, 1000+ icons, shadcn default, consistent stroke style |
| Font loading | Manual @font-face rules | @fontsource-variable/inter | NPM-managed, version-locked, variable font single file |
| Color system | Hand-picked hex values | Tailwind v4 oklch @theme + shadcn CSS vars | Perceptually uniform, generated utility classes, dark mode ready |
| Responsive grid | CSS media query spaghetti | Tailwind responsive grid utilities | `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` handles all breakpoints |

**Key insight:** shadcn/ui + Tailwind v4 + Lucide React cover 100% of the UI primitive needs for this phase. Zero custom component engineering needed -- just composition and theming.

## Common Pitfalls

### Pitfall 1: Tailwind v3 vs v4 Configuration Confusion
**What goes wrong:** Using `tailwind.config.js`, PostCSS config, or v3 `@tailwind` directives with v4 setup.
**Why it happens:** Most tutorials and Stack Overflow answers still reference v3. Even recent blog posts may mix v3 and v4 syntax.
**How to avoid:** Use ONLY the `@tailwindcss/vite` plugin and `@import "tailwindcss"` in CSS. All theming goes in `@theme {}` blocks. No `tailwind.config.js` file.
**Warning signs:** `@tailwind base` in CSS, PostCSS config referencing tailwindcss, `tailwind.config.js` file in project root.

### Pitfall 2: Path Alias Mismatch Between TypeScript and Vite
**What goes wrong:** `@/` imports work in IDE but fail at build time, or vice versa.
**Why it happens:** TypeScript and Vite resolve paths independently. Both need `@/ -> ./src/*` configured.
**How to avoid:** Set `baseUrl: "."` and `paths: { "@/*": ["./src/*"] }` in BOTH `tsconfig.json` and `tsconfig.app.json`. Add `resolve.alias` in `vite.config.ts` with `path.resolve(__dirname, "./src")`.
**Warning signs:** "Cannot find module '@/...'" errors, imports resolving in editor but not in browser.

### Pitfall 3: React Router v7 Package Name
**What goes wrong:** Installing `react-router-dom` (v6) instead of `react-router` (v7).
**Why it happens:** v6 used `react-router-dom` and most existing guides reference it.
**How to avoid:** Install `react-router` (no `-dom` suffix). All imports come from `"react-router"`.
**Warning signs:** Import errors, `BrowserRouter` not found, conflicting type definitions.

### Pitfall 4: shadcn/ui Init Before Vite Config
**What goes wrong:** `npx shadcn@latest init` fails or misconfigures because Vite config or Tailwind isn't set up yet.
**Why it happens:** shadcn CLI validates the project setup (checks for Tailwind, path aliases) during init.
**How to avoid:** Complete ALL these steps before running `shadcn init`: (1) install tailwindcss + @tailwindcss/vite, (2) add `@import "tailwindcss"` to index.css, (3) configure vite.config.ts with tailwindcss plugin and @ alias, (4) configure tsconfig paths.
**Warning signs:** CLI errors about missing Tailwind config, unstyled components after init.

### Pitfall 5: oklch Color Values Out of Gamut
**What goes wrong:** Colors look washed out or different from expectations in the browser.
**Why it happens:** oklch values need careful tuning -- chroma and hue interact differently than in HSL.
**How to avoid:** Use low chroma values (0.01-0.10) for muted earth/forest tones. Test in browser with DevTools color picker. Iterate on the palette visually, not just mathematically.
**Warning signs:** Colors appear too saturated, too gray, or shift hue unexpectedly at different lightness levels.

### Pitfall 6: Card Link Accessibility
**What goes wrong:** Wrapping a Card in a `<Link>` creates a large interactive region but may lose semantic meaning for screen readers.
**Why it happens:** The entire card becomes one big link without a clear label.
**How to avoid:** Ensure the `<Link>` has an accessible label (the card title text serves this role). Use `group` hover patterns on the Link wrapper so hover state applies to the Card child.
**Warning signs:** Lighthouse accessibility warnings, screen reader announcing unhelpful link text.

## Code Examples

Verified patterns from official sources:

### Vite Configuration (Complete)
```typescript
// vite.config.ts
// Source: https://ui.shadcn.com/docs/installation/vite + https://tailwindcss.com/docs
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### TypeScript Config (Path Aliases)
```json
// tsconfig.json (add to compilerOptions)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

```json
// tsconfig.app.json (add to compilerOptions)
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Responsive Dashboard Grid
```typescript
// Source: Tailwind CSS responsive grid utilities
<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
  {frameworks.map((fw) => (
    <FrameworkCard key={fw.slug} framework={fw} />
  ))}
</div>
// 1 column on mobile, 2 on sm (2+2+1 layout), 3 on lg (3+2 layout)
```

### Two-Panel Module Layout Skeleton
```typescript
// src/pages/ModulePage.tsx
import { useParams, Navigate } from "react-router";
import { frameworks } from "@/data/frameworks";
import { Separator } from "@/components/ui/separator";

export function ModulePage() {
  const { frameworkSlug } = useParams();
  const framework = frameworks.find((f) => f.slug === frameworkSlug);

  if (!framework) return <Navigate to="/" replace />;

  const Icon = framework.icon;

  return (
    <div>
      {/* Framework intro section */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{framework.name}</h1>
            <p className="text-muted-foreground">{framework.description}</p>
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Two-panel skeleton */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          Assessment form coming in a future phase
        </div>
        <div className="rounded-lg border border-dashed border-border p-8 text-center text-muted-foreground">
          Report preview coming in a future phase
        </div>
      </div>
    </div>
  );
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| tailwind.config.js | @theme directive in CSS | Tailwind v4 (Jan 2025) | All config lives in CSS, no JS config file |
| @tailwind base/components/utilities | @import "tailwindcss" | Tailwind v4 (Jan 2025) | Single CSS import replaces three directives |
| PostCSS for Tailwind + Autoprefixer | @tailwindcss/vite plugin | Tailwind v4 (Jan 2025) | Zero PostCSS config needed with Vite |
| react-router-dom package | react-router package | React Router v7 (late 2024) | Unified package, -dom suffix removed |
| HSL color values | oklch color values | Tailwind v4 (Jan 2025) | Wider gamut, perceptually uniform |
| npm install component libraries | npx shadcn@latest add | shadcn/ui model | Copy-paste components, no node_modules dependency |

**Deprecated/outdated:**
- `tailwind.config.js` / `tailwind.config.ts`: Replaced by `@theme` in CSS for Tailwind v4
- `react-router-dom` package: Replaced by `react-router` in v7
- `@tailwind base; @tailwind components; @tailwind utilities;`: Replaced by `@import "tailwindcss"` in v4
- `PostCSS + autoprefixer` setup for Tailwind: Replaced by `@tailwindcss/vite` plugin

## Open Questions

1. **Exact oklch values for the forest/earth palette**
   - What we know: oklch format with low chroma values (0.01-0.10) produces muted tones. Hue ~155 for green, ~60-80 for tan/earth, ~250 for neutral charcoal.
   - What's unclear: The exact values will need visual iteration in the browser -- mathematical estimation gets close but visual tuning is required.
   - Recommendation: Start with the values in the code example above, then adjust visually during implementation. This is discretionary per CONTEXT.md.

2. **shadcn/ui Tailwind v4 compatibility edge cases**
   - What we know: shadcn/ui officially supports Tailwind v4 and the CLI detects it during init. The `@theme inline` directive bridges shadcn CSS variables to Tailwind utility classes.
   - What's unclear: Whether all 70+ components work perfectly with v4 theming or if some have v3 assumptions.
   - Recommendation: Install only the components needed for Phase 1 (button, card, tabs, breadcrumb, input, label, select, textarea, separator). Verify each renders correctly after theming.

3. **Framework intro page content depth**
   - What we know: Each module page needs a brief overview of the framework (purpose, who uses it, structure). This is marked as Claude's discretion.
   - What's unclear: How much text is appropriate -- 2 sentences or 2 paragraphs?
   - Recommendation: 1 short paragraph (3-4 sentences) per framework covering purpose, primary audience, and structure. Keep it scannable.

## Sources

### Primary (HIGH confidence)
- [Tailwind CSS v4 official docs](https://tailwindcss.com/docs) - Installation with Vite, @theme directive, oklch colors
- [shadcn/ui Vite installation guide](https://ui.shadcn.com/docs/installation/vite) - Step-by-step setup with Tailwind v4
- [shadcn/ui theming docs](https://ui.shadcn.com/docs/theming) - CSS variable system, color customization
- [shadcn/ui Card component](https://ui.shadcn.com/docs/components/radix/card) - Component API and subcomponents
- [shadcn/ui Tabs component](https://ui.shadcn.com/docs/components/radix/tabs) - Component API and variants
- [shadcn/ui Breadcrumb component](https://ui.shadcn.com/docs/components/radix/breadcrumb) - Component API and React Router integration
- [React Router v7 modes](https://reactrouter.com/start/modes) - Declarative vs Data vs Framework mode comparison
- [React Router SPA guide](https://reactrouter.com/how-to/spa) - SPA-specific configuration
- [React Router component routes](https://reactrouter.com/upgrading/component-routes) - v7 package name (react-router, not react-router-dom)
- [Vite official docs](https://vite.dev/guide/) - Version 7.x, react-ts template
- [Lucide React guide](https://lucide.dev/guide/packages/lucide-react) - Installation, usage, tree-shaking
- [Fontsource Inter install](https://fontsource.org/fonts/inter/install) - @fontsource-variable/inter package

### Secondary (MEDIUM confidence)
- [Tailwind CSS v4 theme variables](https://tailwindcss.com/docs/theme) - @theme directive documentation, verified against official docs
- [Tailwind CSS oklch color discussion](https://github.com/tailwindlabs/tailwindcss/discussions/13890) - Custom font setup with @theme in v4

### Tertiary (LOW confidence)
- oklch palette exact values for forest/earth tones - Based on color theory principles, needs visual validation during implementation

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries verified via official documentation, versions confirmed
- Architecture: HIGH - Patterns derived from official docs for each library, well-established React SPA patterns
- Pitfalls: HIGH - Based on documented breaking changes (v3->v4, v6->v7) and official migration guides

**Research date:** 2026-02-24
**Valid until:** 2026-03-24 (stable ecosystem, no major releases expected)
