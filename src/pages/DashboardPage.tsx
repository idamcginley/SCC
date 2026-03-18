import { PDFDownloadLink } from "@react-pdf/renderer";
import { FileDown } from "lucide-react";
import { frameworks } from "@/data/frameworks";
import { FrameworkCard } from "@/components/dashboard/FrameworkCard";
import { WorkshopPdfDocument } from "@/components/dashboard/WorkshopPdfDocument";
import { useAnswers } from "@/context/AnswersContext";

export function DashboardPage() {
  const { answers } = useAnswers();

  return (
    <div>
      <div className="mb-6 border-b border-border pb-5">
        <h1 className="text-xl font-bold tracking-tight">Reporting Frameworks</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Select a sustainability reporting framework to begin your assessment.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((fw) => (
          <FrameworkCard key={fw.slug} framework={fw} />
        ))}
      </div>

      {/* PDF Export */}
      <div className="mt-10 flex justify-center border-t border-border pt-8">
        <PDFDownloadLink
          document={<WorkshopPdfDocument answers={answers} />}
          fileName="sustainability-workshop-assessment.pdf"
        >
          {({ loading }) => (
            <button
              type="button"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded border border-primary bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:opacity-90 disabled:opacity-60"
            >
              <FileDown className="h-4 w-4" />
              {loading ? "Preparing PDF…" : "Download Assessment Report (PDF)"}
            </button>
          )}
        </PDFDownloadLink>
      </div>
    </div>
  );
}
