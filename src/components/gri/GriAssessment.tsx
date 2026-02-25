import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GriFormContent } from "@/components/gri/GriForm";
import { GriReportPreview } from "@/components/gri/GriReportPreview";
import {
  griSchema,
  getDefaultValues,
  type GriFormData,
} from "@/schemas/gri";

/**
 * GriAssessment: Top-level full-viewport layout for the GRI assessment.
 *
 * FormProvider lives here so both the form (left panel) and preview (right panel)
 * share the same react-hook-form context. This allows GriReportPreview to use
 * useWatch() for live updates.
 */
export function GriAssessment() {
  const methods = useForm<GriFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(griSchema) as any,
    defaultValues: getDefaultValues(),
    mode: "onSubmit",
  });

  return (
    <FormProvider {...methods}>
      <div className="h-[calc(100vh-var(--nav-height,3.5rem))]">
        <ResizablePanelGroup direction="horizontal" className="h-full">
          <ResizablePanel defaultSize={55} minSize={30}>
            <GriFormContent />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={45} minSize={25}>
            <ScrollArea className="h-full">
              <GriReportPreview />
            </ScrollArea>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </FormProvider>
  );
}
