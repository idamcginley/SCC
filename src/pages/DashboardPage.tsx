import { usePDF } from "@react-pdf/renderer";
import { useEffect } from "react";
import { FileDown } from "lucide-react";
import { MultipleChoiceSection } from "@/components/dashboard/MultipleChoiceSection";
import { ShortAnswerSection } from "@/components/dashboard/ShortAnswerSection";
import { WorkshopPdfDocument } from "@/components/dashboard/WorkshopPdfDocument";
import { useAnswers } from "@/context/AnswersContext";

export function DashboardPage() {
  const { answers } = useAnswers();
  const [instance, updateInstance] = usePDF({
    document: <WorkshopPdfDocument answers={answers} />,
  });

  // Re-generate the PDF blob every time answers change
  useEffect(() => {
    updateInstance(<WorkshopPdfDocument answers={answers} />);
  }, [answers]);

  return (
    <div className="mx-auto max-w-3xl space-y-10 px-4 pt-24 pb-8">
      {/* Page header */}
      <div className="border-b border-border pb-5">
        <h1 className="text-xl font-bold tracking-tight">
          Workshop Assessment
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete all questions below. Your answers will be included in the
          downloadable PDF report.
        </p>
      </div>

      {/* Section 1 — Multiple Choice */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded bg-primary/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-primary">
            Section 1
          </span>
          <h2 className="text-base font-semibold">Multiple Choice</h2>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Select the single best answer for each question.
        </p>
        <MultipleChoiceSection />
      </section>

      {/* Section 2 — Short Answer */}
      <section>
        <div className="mb-4 flex items-center gap-3">
          <span className="inline-flex items-center rounded bg-gold-100 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-gold-800">
            Section 2
          </span>
          <h2 className="text-base font-semibold">Short Answer</h2>
        </div>
        <p className="mb-5 text-sm text-muted-foreground">
          Answer each question in 2–3 sentences. There is no character limit.
        </p>
        <ShortAnswerSection />
      </section>

      {/* PDF Export */}
      <div className="flex justify-center border-t border-border pt-8">
        {instance.loading ? (
          <button
            type="button"
            disabled
            className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm opacity-60"
          >
            <FileDown className="h-4 w-4 shrink-0" />
            Preparing PDF…
          </button>
        ) : instance.error ? (
          <span className="text-sm text-destructive">
            PDF generation failed. Please refresh and try again.
          </span>
        ) : (
          <a
            href={instance.url ?? "#"}
            download="workshop-assessment.pdf"
            style={{ backgroundColor: "#3aac96", borderColor: "#3aac96" }}
            className="inline-flex items-center gap-2 rounded border px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:opacity-90 no-underline"
          >
            <FileDown className="h-4 w-4 shrink-0" />
            Download Assessment Report (PDF)
          </a>
        )}
      </div>
    </div>
  );
}
