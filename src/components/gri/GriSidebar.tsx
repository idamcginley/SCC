import { useWatch } from "react-hook-form";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGriCompletion } from "@/hooks/useGriCompletion";
import { griSections, topicStandardGroups } from "@/schemas/gri";
import { cn } from "@/lib/utils";

interface GriSidebarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

// Fixed sections that always appear
const fixedSections = griSections.filter(
  (s) => s.id === "gri1" || s.id === "gri2" || s.id === "gri3"
);

function CompletionIndicator({ percent }: { percent: number }) {
  // Small circular progress indicator
  const radius = 5;
  const circumference = 2 * Math.PI * radius;
  const filled = (percent / 100) * circumference;

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      className="shrink-0"
      aria-label={`${percent}% complete`}
    >
      {/* Background circle */}
      <circle
        cx="7"
        cy="7"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-sidebar-border"
      />
      {/* Progress arc */}
      {percent > 0 && (
        <circle
          cx="7"
          cy="7"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className={percent === 100 ? "text-gold-400" : "text-gold-500/60"}
          strokeDasharray={`${filled} ${circumference - filled}`}
          strokeDashoffset={circumference / 4}
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

export function GriSidebar({ activeSection, onNavigate }: GriSidebarProps) {
  const materialTopics: string[] =
    useWatch({ name: "materialTopics" }) ?? [];
  const completion = useGriCompletion();

  // Group material topics by series for display
  const materialByGroup = topicStandardGroups
    .map((group) => ({
      ...group,
      activeCodes: group.standards.filter((code) =>
        materialTopics.includes(code)
      ),
    }))
    .filter((g) => g.activeCodes.length > 0);

  return (
    <div className="flex h-full w-[200px] shrink-0 flex-col border-r border-sidebar-border bg-sidebar">
      <div className="border-b border-sidebar-border px-3 py-2.5">
        <h2 className="text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/50">
          GRI Sections
        </h2>
      </div>

      <ScrollArea className="flex-1">
        <nav className="space-y-0.5 p-1.5">
          {/* Fixed sections: GRI 1, 2, 3 */}
          {fixedSections.map((section) => {
            const isActive = activeSection === section.id;
            const percent = completion[section.id] ?? 0;
            const showCompletion = section.id !== "gri1"; // GRI 1 has no fields

            return (
              <button
                key={section.id}
                type="button"
                onClick={() => onNavigate(section.id)}
                className={cn(
                  "flex w-full items-center gap-2 rounded px-2.5 py-1.5 text-left text-xs font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {showCompletion && <CompletionIndicator percent={percent} />}
                <span className="truncate">
                  {section.id === "gri1" && "GRI 1: Foundation"}
                  {section.id === "gri2" && "GRI 2: General"}
                  {section.id === "gri3" && "GRI 3: Material Topics"}
                </span>
              </button>
            );
          })}

          {/* Material Topic Standards grouped by series */}
          {materialByGroup.length > 0 && (
            <div className="mt-2.5 border-t border-sidebar-border pt-2.5">
              <p className="mb-1 px-2.5 text-[9px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
                Topic Standards
              </p>

              {materialByGroup.map((group) => (
                <div key={group.name} className="mb-1.5">
                  <p className="px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-sidebar-foreground/30">
                    {group.name}
                  </p>
                  {group.activeCodes.map((code) => {
                    const isActive = activeSection === code;
                    const percent = completion[code] ?? 0;
                    const meta = griSections.find((s) => s.id === code);
                    // Show short name: "201: Economic Performance"
                    const shortName = meta
                      ? meta.name.replace(/^GRI\s+/, "")
                      : code;

                    return (
                      <button
                        key={code}
                        type="button"
                        onClick={() => onNavigate(code)}
                        className={cn(
                          "flex w-full items-center gap-1.5 rounded px-2.5 py-1 text-left text-[11px] transition-colors",
                          isActive
                            ? "bg-sidebar-primary text-sidebar-primary-foreground"
                            : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                        )}
                      >
                        <CompletionIndicator percent={percent} />
                        <span className="truncate">{shortName}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          )}
        </nav>
      </ScrollArea>
    </div>
  );
}

