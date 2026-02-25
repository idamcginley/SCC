import { useState, useCallback } from "react";
import { useForm, useFormContext, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, FileDown } from "lucide-react";
import { griSchema, getDefaultValues, type GriFormData } from "@/schemas/gri";
import { useLocalStorageForm } from "@/hooks/useLocalStorageForm";
import { GriSidebar } from "@/components/gri/GriSidebar";
import { GriUniversalSection } from "@/components/gri/GriUniversalSection";
import { GriMaterialTopics } from "@/components/gri/GriMaterialTopics";
import { GriTopicSection } from "@/components/gri/GriTopicSection";

// Field name prefixes per section for targeted validation on navigate
function getSectionFieldPrefix(section: string): string | null {
  if (section === "gri2") return "gri2";
  if (section === "gri3") return "gri3";
  if (/^\d{3}$/.test(section)) return `topics.${section}`;
  return null;
}

function FormContent() {
  const [activeSection, setActiveSection] = useState("gri2");
  const [validationStatus, setValidationStatus] = useState<
    "idle" | "valid" | "invalid"
  >("idle");

  const { trigger } = useFormContext<GriFormData>();

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

          {/* PDF export placeholder (Plan 03) */}
          <Button variant="outline" size="sm" disabled>
            <FileDown className="mr-1.5 h-3.5 w-3.5" />
            Export PDF
          </Button>
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

export function GriForm() {
  const methods = useForm<GriFormData>({
    resolver: zodResolver(griSchema),
    defaultValues: getDefaultValues(),
    mode: "onSubmit",
  });

  return (
    <FormProvider {...methods}>
      <FormContent />
    </FormProvider>
  );
}
