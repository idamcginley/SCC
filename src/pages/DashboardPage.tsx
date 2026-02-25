import { frameworks } from "@/data/frameworks";
import { FrameworkCard } from "@/components/dashboard/FrameworkCard";

export function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Sustainability Reporting Assessment
        </h1>
        <p className="mt-1 text-muted-foreground">
          Select a framework to begin your assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((fw) => (
          <FrameworkCard key={fw.slug} framework={fw} />
        ))}
      </div>
    </div>
  );
}
