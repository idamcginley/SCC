import { useFormContext } from "react-hook-form";
import { DisclosureField } from "@/components/shared/DisclosureField";
import { griDisclosures, codeToFieldKey } from "@/schemas/gri";

// GRI 2 subsection groupings by disclosure code range
const subsections = [
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

export function GriUniversalSection() {
  // Access form context (FormProvider is above us in GriForm)
  useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          GRI 2: General Disclosures
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          30 disclosures covering organization profile, governance, strategy,
          and stakeholder engagement.
        </p>
      </div>

      {subsections.map((sub) => {
        const disclosures = gri2Disclosures.filter((d) =>
          sub.range.includes(d.code)
        );
        if (disclosures.length === 0) return null;

        return (
          <div key={sub.name}>
            <div className="mb-4 border-b border-border pb-2">
              <h3 className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                {sub.name}
              </h3>
            </div>
            <div className="space-y-4">
              {disclosures.map((d) => (
                <DisclosureField
                  key={d.code}
                  name={`gri2.${codeToFieldKey(d.code)}`}
                  code={d.code}
                  label={d.label}
                  fieldType={d.fieldType}
                  required={d.required}
                  options={d.options}
                  unit={d.unit}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
