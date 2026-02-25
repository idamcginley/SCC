import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GriForm } from "@/components/gri/GriForm";
import { GriReportPreview } from "@/components/gri/GriReportPreview";

/**
 * GriAssessment: Top-level full-viewport layout for the GRI assessment.
 *
 * Renders a horizontal ResizablePanelGroup with:
 *   Left panel (55%): GriForm (sidebar + scrollable form content)
 *   Right panel (45%): GriReportPreview in a ScrollArea
 *
 * Both panels scroll independently. A draggable handle separates them.
 */
export function GriAssessment() {
  return (
    <div className="h-[calc(100vh-var(--nav-height,3.5rem))]">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={55} minSize={30}>
          <GriForm />
        </ResizablePanel>

        <ResizableHandle withHandle />

        <ResizablePanel defaultSize={45} minSize={25}>
          <ScrollArea className="h-full">
            <GriReportPreview />
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
