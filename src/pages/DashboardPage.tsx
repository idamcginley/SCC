import { frameworks } from "@/data/frameworks";
import { FrameworkCard } from "@/components/dashboard/FrameworkCard";

export function DashboardPage() {
  return (
    <div>
      <div className="mb-6 border-b border-border pb-5">
        <h1 className="text-xl font-bold tracking-tight">
          Reporting Frameworks
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a sustainability reporting framework to begin your assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((fw) => (
          <FrameworkCard key={fw.slug} framework={fw} />
        ))}
      </div>
    </div>
  );
}

