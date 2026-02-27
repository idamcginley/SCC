import { Link } from "react-router";
import { AppBreadcrumbs } from "@/components/layout/Breadcrumbs";

export function TopNav() {
  return (
    <header className="border-b border-navy-800 bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-baseline gap-2.5">
          <span className="text-base font-bold tracking-tight">
            SCC
          </span>
          <span className="hidden h-3.5 w-px bg-gold-400/50 sm:block" />
          <span className="hidden text-xs font-medium tracking-wide text-primary-foreground/70 sm:inline">
            PwC Case Study: Sustainability Reporting
          </span>
        </Link>
        <AppBreadcrumbs />
      </div>
    </header>
  );
}

