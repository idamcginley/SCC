import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import type { Framework } from "@/data/frameworks";

// Category accent colors for left border
const accentColors: Record<string, string> = {
  gri: "border-l-navy-500",
  issb: "border-l-gold-500",
  csrd: "border-l-navy-400",
  esrs: "border-l-gold-600",
  sbti: "border-l-navy-600",
};

interface FrameworkCardProps {
  framework: Framework;
}

export function FrameworkCard({ framework }: FrameworkCardProps) {
  const Icon = framework.icon;
  const isActive = framework.slug === "gri";
  const accentClass = accentColors[framework.slug] ?? "border-l-navy-500";

  return (
    <Link to={`/module/${framework.slug}`} className="group block">
      <Card className={`h-full border-l-[3px] ${accentClass} transition-all duration-200 group-hover:-translate-y-0.5 group-hover:shadow-md group-hover:border-l-4`}>
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex h-8 w-8 items-center justify-center rounded bg-primary/8 text-primary">
              <Icon className="h-4 w-4" />
            </div>
            <span className={`inline-flex items-center rounded-sm px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${isActive
                ? "bg-gold-100 text-gold-800"
                : "bg-slate-100 text-slate-500"
              }`}>
              {isActive ? "Active" : "Coming Soon"}
            </span>
          </div>
          <CardTitle className="mt-2 text-sm font-semibold">{framework.name}</CardTitle>
          <CardDescription className="text-xs leading-relaxed">{framework.description}</CardDescription>
          <div className="mt-2 flex items-center gap-1 text-xs font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
            Open assessment <ArrowRight className="h-3 w-3" />
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

