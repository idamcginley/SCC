import { useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { Framework } from "@/data/frameworks";
import { useAnswers } from "@/context/AnswersContext";

interface Props {
  framework: Framework;
}

export function FrameworkAssessment({ framework }: Props) {
  const { answers, setAnswer } = useAnswers();
  const stored = answers[framework.slug] ?? { included: "", excluded: "" };

  const [excludedFlagged, setExcludedFlagged] = useState(false);

  const includedBox = framework.inputBoxes[0];
  const excludedBox = framework.inputBoxes[1];
  const Icon = framework.icon;

  function handleIncludedChange(val: string) {
    setAnswer(framework.slug, "included", val);
  }

  function handleExcludedChange(val: string) {
    setAnswer(framework.slug, "excluded", val);
    setExcludedFlagged(val.trim().length > 5);
  }

  const includedHasContent = stored.included.trim().length > 0;

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-8">
      {/* Back arrow */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Dashboard
        </Link>
      </div>

      {/* Section Header */}
      <div className="flex items-start gap-3 border-b border-border pb-5">
        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded bg-primary/8 text-primary">
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight">{framework.sectionHeader}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{framework.description}</p>
        </div>
      </div>

      {/* Instructional note */}
      <div className="flex items-start gap-2 rounded border border-border bg-secondary/40 px-3 py-2.5 text-xs text-muted-foreground">
        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
        <p>
          For sections that do not require an entry, write{" "}
          <strong className="text-foreground">'Do Not Report'</strong>.
        </p>
      </div>

      {/* Input Box 1 — INCLUDE */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-sm bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
            Report
          </span>
          <h2 className="text-sm font-semibold">{includedBox.label}</h2>
        </div>
        <p className="text-xs text-muted-foreground">{includedBox.sublabel}</p>
        <div className="relative">
          <textarea
            id={includedBox.id}
            rows={4}
            className={[
              "w-full resize-none rounded border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-shadow",
              includedHasContent
                ? "border-primary/40 focus:ring-primary/25"
                : "border-border focus:ring-primary/20",
            ].join(" ")}
            placeholder={includedBox.placeholder}
            value={stored.included}
            onChange={(e) => handleIncludedChange(e.target.value)}
          />
          {includedHasContent && (
            <CheckCircle2 className="absolute right-3 top-3 h-3.5 w-3.5 text-primary/70" />
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-dashed border-border" />
        <span className="mx-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60">
          vs
        </span>
        <div className="flex-1 border-t border-dashed border-border" />
      </div>

      {/* Input Box 2 — EXCLUDED */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold">{excludedBox.label}</h2>
        </div>
        <p className="text-xs text-muted-foreground">{excludedBox.sublabel}</p>
        <div className="relative">
          <textarea
            id={excludedBox.id}
            rows={4}
            className={[
              "w-full resize-none rounded border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 transition-shadow",
              excludedFlagged
                ? "border-destructive/60 focus:ring-destructive/25"
                : "border-border focus:ring-primary/20",
            ].join(" ")}
            placeholder={excludedBox.placeholder}
            value={stored.excluded}
            onChange={(e) => handleExcludedChange(e.target.value)}
          />
          {excludedFlagged && (
            <AlertTriangle className="absolute right-3 top-3 h-3.5 w-3.5 text-destructive" />
          )}
        </div>

        {/* Cross-framework hint */}
        {excludedFlagged && excludedBox.hint && (
          <div className="flex items-start gap-2 rounded border border-destructive/25 bg-destructive/5 px-3 py-2.5 text-xs text-destructive">
            <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <div>
              <span className="font-semibold">Misplaced disclosure. </span>
              {excludedBox.hint}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
