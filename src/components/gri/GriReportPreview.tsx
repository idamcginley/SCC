import { useWatch } from "react-hook-form";
import {
  griDisclosures,
  griSections,
  topicStandardGroups,
  codeToFieldKey,
  type GriFormData,
} from "@/schemas/gri";

// GRI 2 subsection groupings for preview structure
const gri2Subsections = [
  { name: "The Organization", range: ["2-1", "2-2", "2-3", "2-4", "2-5"] },
  { name: "Activities and Workers", range: ["2-6", "2-7", "2-8"] },
  {
    name: "Governance",
    range: [
      "2-9", "2-10", "2-11", "2-12", "2-13", "2-14",
      "2-15", "2-16", "2-17", "2-18", "2-19", "2-20", "2-21",
    ],
  },
  {
    name: "Strategy, Policies and Practices",
    range: ["2-22", "2-23", "2-24", "2-25", "2-26", "2-27", "2-28"],
  },
  { name: "Stakeholder Engagement", range: ["2-29", "2-30"] },
];

const gri2Disclosures = griDisclosures.filter((d) => d.section === "gri2");
const gri3Disclosures = griDisclosures.filter((d) => d.section === "gri3");

/** Get a form value from nested object path */
function getNestedValue(
  data: Record<string, unknown>,
  path: string
): unknown {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/** Render a single disclosure value or placeholder */
function DisclosurePreviewItem({
  code,
  label,
  value,
  unit,
}: {
  code: string;
  label: string;
  value: unknown;
  unit?: string;
}) {
  const hasValue =
    value !== undefined && value !== null && value !== "" && value !== false;

  return (
    <div className="mb-3">
      <div className="flex items-baseline gap-2">
        <span className="text-[10px] font-medium text-muted-foreground/60">
          GRI {code}
        </span>
        <span className="text-xs font-medium text-muted-foreground">
          {label}
        </span>
      </div>
      {hasValue ? (
        <p className="mt-0.5 text-sm text-foreground whitespace-pre-wrap">
          {String(value)}
          {unit && (
            <span className="ml-1 text-xs text-muted-foreground">{unit}</span>
          )}
        </p>
      ) : (
        <p className="mt-0.5 text-sm italic text-muted-foreground/40">
          [{label.charAt(0).toUpperCase() + label.slice(1)} will appear here]
        </p>
      )}
    </div>
  );
}

export function GriReportPreview() {
  const values = useWatch({ name: undefined }) as GriFormData | undefined;

  if (!values) return null;

  const materialTopics: string[] = values.materialTopics ?? [];
  const orgName =
    (values.gri2 as Record<string, unknown> | undefined)?.[
    codeToFieldKey("2-1")
    ];
  const hasOrgName =
    orgName !== undefined && orgName !== null && orgName !== "";

  // Collect all applicable disclosures for Content Index
  const contentIndexEntries: {
    code: string;
    label: string;
    reported: boolean;
  }[] = [];

  // Helper to check if a disclosure value is filled
  function isValueFilled(path: string): boolean {
    const val = getNestedValue(values as unknown as Record<string, unknown>, path);
    return val !== undefined && val !== null && val !== "" && val !== false;
  }

  return (
    <div className="bg-white px-6 py-5">
      {/* Report Title */}
      <div className="mb-6 border-b-2 border-gold-400/40 pb-3">
        <h1 className="text-lg font-bold tracking-tight text-primary">
          GRI Sustainability Report
        </h1>
        {hasOrgName ? (
          <p className="mt-0.5 text-sm text-foreground/70">
            {String(orgName)}
          </p>
        ) : (
          <p className="mt-0.5 text-xs italic text-muted-foreground/40">
            [Organization name will appear here]
          </p>
        )}
      </div>

      {/* Section: GRI 2 - General Disclosures */}
      <section className="mb-6">
        <h2 className="mb-3 border-b-2 border-primary/10 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
          GRI 2 — General Disclosures
        </h2>

        {gri2Subsections.map((sub) => {
          const disclosures = gri2Disclosures.filter((d) =>
            sub.range.includes(d.code)
          );
          return (
            <div key={sub.name} className="mb-4">
              <h3 className="mb-1.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                {sub.name}
              </h3>
              {disclosures.map((d) => {
                const fieldPath = `gri2.${codeToFieldKey(d.code)}`;
                const val = getNestedValue(
                  values as unknown as Record<string, unknown>,
                  fieldPath
                );
                contentIndexEntries.push({
                  code: d.code,
                  label: d.label,
                  reported: isValueFilled(fieldPath),
                });
                return (
                  <DisclosurePreviewItem
                    key={d.code}
                    code={d.code}
                    label={d.label}
                    value={val}
                    unit={d.unit}
                  />
                );
              })}
            </div>
          );
        })}
      </section>

      {/* Section: GRI 3 - Material Topics */}
      <section className="mb-6">
        <h2 className="mb-3 border-b-2 border-primary/10 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
          GRI 3 — Material Topics
        </h2>
        {gri3Disclosures.map((d) => {
          const fieldPath = `gri3.${codeToFieldKey(d.code)}`;
          const val = getNestedValue(
            values as unknown as Record<string, unknown>,
            fieldPath
          );
          contentIndexEntries.push({
            code: d.code,
            label: d.label,
            reported: isValueFilled(fieldPath),
          });
          return (
            <DisclosurePreviewItem
              key={d.code}
              code={d.code}
              label={d.label}
              value={val}
              unit={d.unit}
            />
          );
        })}
      </section>

      {/* Section: Topic Standards */}
      {materialTopics.length > 0 && (
        <section className="mb-6">
          <h2 className="mb-3 border-b-2 border-primary/10 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
            Topic Standards
          </h2>
          {topicStandardGroups.map((group) => {
            const activeInGroup = group.standards.filter((code) =>
              materialTopics.includes(code)
            );
            if (activeInGroup.length === 0) return null;

            return (
              <div key={group.name} className="mb-5">
                <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60">
                  {group.name}
                </h3>
                {activeInGroup.map((topicCode) => {
                  const meta = griSections.find((s) => s.id === topicCode);
                  const topicDisclosures = griDisclosures.filter(
                    (d) => d.section === topicCode
                  );
                  return (
                    <div key={topicCode} className="mb-4">
                      <h4 className="mb-1.5 text-xs font-bold text-foreground/85">
                        {meta?.name ?? `GRI ${topicCode}`}
                      </h4>
                      {topicDisclosures.map((d) => {
                        const fieldPath = `topics.${topicCode}.${codeToFieldKey(d.code)}`;
                        const val = getNestedValue(
                          values as unknown as Record<string, unknown>,
                          fieldPath
                        );
                        contentIndexEntries.push({
                          code: d.code,
                          label: d.label,
                          reported: isValueFilled(fieldPath),
                        });
                        return (
                          <DisclosurePreviewItem
                            key={d.code}
                            code={d.code}
                            label={d.label}
                            value={val}
                            unit={d.unit}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </section>
      )}

      {/* Section: GRI Content Index */}
      <section>
        <h2 className="mb-3 border-b-2 border-primary/10 pb-1 text-sm font-bold uppercase tracking-wide text-primary">
          GRI Content Index
        </h2>
        <div className="overflow-hidden rounded border border-border">
          <table className="w-full text-[11px]">
            <thead>
              <tr className="border-b border-border bg-primary/5">
                <th className="px-2.5 py-1.5 text-left font-semibold text-primary/70">
                  Disclosure
                </th>
                <th className="px-2.5 py-1.5 text-left font-semibold text-primary/70">
                  Title
                </th>
                <th className="px-2.5 py-1.5 text-right font-semibold text-primary/70">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {contentIndexEntries.map((entry) => (
                <tr
                  key={entry.code}
                  className="border-b border-border/30 last:border-0 even:bg-muted/30"
                >
                  <td className="whitespace-nowrap px-2.5 py-1 font-mono text-muted-foreground">
                    GRI {entry.code}
                  </td>
                  <td className="px-2.5 py-1 text-foreground/80">
                    {entry.label}
                  </td>
                  <td className="whitespace-nowrap px-2.5 py-1 text-right">
                    {entry.reported ? (
                      <span className="font-semibold text-gold-700">
                        Reported
                      </span>
                    ) : (
                      <span className="text-muted-foreground/40">
                        Not reported
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
