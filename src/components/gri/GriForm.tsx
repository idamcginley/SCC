import { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, FileDown } from "lucide-react";
import {
  griSections,
  type GriFormData,
} from "@/schemas/gri";
import { useLocalStorageForm } from "@/hooks/useLocalStorageForm";
import { GriSidebar } from "@/components/gri/GriSidebar";
import { GriUniversalSection } from "@/components/gri/GriUniversalSection";
import { GriMaterialTopics } from "@/components/gri/GriMaterialTopics";
import { GriTopicSection } from "@/components/gri/GriTopicSection";
import { GriPdfDocument } from "@/components/gri/GriPdfDocument";

// Field name prefixes per section for targeted validation on navigate
function getSectionFieldPrefix(section: string): string | null {
  if (section === "gri2") return "gri2";
  if (section === "gri3") return "gri3";
  if (/^\d{3}$/.test(section)) return `topics.${section}`;
  return null;
}

export function GriFormContent() {
  const [activeSection, setActiveSection] = useState("gri2");
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");

  const [pdfErrors, setPdfErrors] = useState<string[]>([]);
  const { trigger, getValues, formState } = useFormContext<GriFormData>();

  // Wire localStorage persistence inside FormProvider
  useLocalStorageForm("gri-form-data");

  const handleNavigate = useCallback(
    (sectionId: string) => {
      // Validate departing section -- fire and forget (show errors but don't block)
      const prefix = getSectionFieldPrefix(activeSection);
      if (prefix) {
        void trigger(prefix as keyof GriFormData);
      }
      setActiveSection(sectionId);
      setValidationStatus("idle");
    },
    [activeSection, trigger]
  );

  async function handleValidateAll() {
    const result = await trigger();
    setValidationStatus(result ? "valid" : "invalid");
  }

  /** Collect validation error section names for the PDF warning banner */
  async function collectValidationErrors(): Promise<string[]> {
    const valid = await trigger();
    if (valid) return [];

    const errors = formState.errors;
    const errorSections: string[] = [];

    if (errors.gri2) errorSections.push("GRI 2: General Disclosures");
    if (errors.gri3) errorSections.push("GRI 3: Material Topics");
    if (errors.topics && typeof errors.topics === "object") {
      for (const topicCode of Object.keys(errors.topics)) {
        const meta = griSections.find((s) => s.id === topicCode);
        errorSections.push(meta?.name ?? `GRI ${topicCode}`);
      }
    }

    return errorSections;
  }

  /** Prepare PDF download -- collects errors then renders the link */
  async function handlePreparePdf() {
    const errors = await collectValidationErrors();
    setPdfErrors(errors);
    // State update triggers re-render with updated PDFDownloadLink
  }

  return (
    <div className="flex h-full">
      <GriSidebar activeSection={activeSection} onNavigate={handleNavigate} />

      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-2 border-b border-border bg-card px-4 py-2">
          <Button variant="secondary" size="sm" onClick={handleValidateAll}>
            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
            Validate All
          </Button>

          {validationStatus === "valid" && (
            <span className="flex items-center gap-1 text-xs text-primary">
              <CheckCircle2 className="h-3.5 w-3.5" />
              All sections valid
            </span>
          )}
          {validationStatus === "invalid" && (
            <span className="flex items-center gap-1 text-xs text-destructive">
              <AlertTriangle className="h-3.5 w-3.5" />
              Some fields have errors
            </span>
          )}

          <div className="flex-1" />

          {/* PDF export -- PDFDownloadLink generates in-browser */}
          <PDFDownloadLink
            document={
              <GriPdfDocument
                data={getValues()}
                materialTopics={getValues("materialTopics") ?? []}
                validationErrors={pdfErrors.length > 0 ? pdfErrors : undefined}
              />
            }
            fileName="gri-sustainability-report.pdf"
            onClick={() => void handlePreparePdf()}
          >
            {({ loading }) => (
              <Button variant="outline" size="sm" asChild>
                <span>
                  <FileDown className="mr-1.5 h-3.5 w-3.5" />
                  {loading ? "Generating PDF..." : "Download PDF Report"}
                </span>
              </Button>
            )}
          </PDFDownloadLink>
        </div>

        {/* Section content - scrollable */}
        <ScrollArea className="flex-1">
          <div className="p-6">
            {activeSection === "gri1" && <Gri1Info />}
            {activeSection === "gri2" && <GriUniversalSection />}
            {activeSection === "gri3" && <GriMaterialTopics />}
            {/^\d{3}$/.test(activeSection) && (
              <GriTopicSection topicCode={activeSection} />
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

/** GRI 1 Foundation - informational only, no fields */
function Gri1Info() {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold tracking-tight">
        GRI 1: Foundation 2021
      </h2>
      <div className="rounded-lg border border-border bg-card p-6 text-sm leading-relaxed text-foreground/80">
        <p>
          GRI 1 establishes the reporting principles and requirements that
          organizations must comply with to report in accordance with the GRI
          Standards. It does not contain disclosure fields -- instead it defines
          the eight reporting principles:
        </p>
        <ul className="mt-3 list-inside list-disc space-y-1 text-muted-foreground">
          <li>Accuracy</li>
          <li>Balance</li>
          <li>Clarity</li>
          <li>Comparability</li>
          <li>Completeness</li>
          <li>Sustainability context</li>
          <li>Timeliness</li>
          <li>Verifiability</li>
        </ul>
        <p className="mt-3">
          Navigate to GRI 2 (General Disclosures) or GRI 3 (Material Topics)
          to begin filling in your report.
        </p>
      </div>
    </div>
  );
}

