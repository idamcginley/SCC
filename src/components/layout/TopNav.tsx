import { Link } from "react-router";
import { AppBreadcrumbs } from "@/components/layout/Breadcrumbs";

export function TopNav() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Sustainability Consulting Club
          </span>
          <span className="hidden text-sm text-muted-foreground sm:inline">
            | PwC Case Study: Sustainability Reporting
          </span>
        </Link>
        <AppBreadcrumbs />
      </div>
    </header>
  );
}
