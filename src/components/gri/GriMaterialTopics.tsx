import { useFormContext, useWatch } from "react-hook-form";
import { DisclosureField } from "@/components/shared/DisclosureField";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  griDisclosures,
  griSections,
  topicStandardGroups,
  codeToFieldKey,
  type GriFormData,
} from "@/schemas/gri";

const gri3Disclosures = griDisclosures.filter((d) => d.section === "gri3");

export function GriMaterialTopics() {
  const { setValue } = useFormContext<GriFormData>();
  const materialTopics: string[] =
    useWatch({ name: "materialTopics" }) ?? [];

  function toggleTopic(code: string) {
    const updated = materialTopics.includes(code)
      ? materialTopics.filter((t) => t !== code)
      : [...materialTopics, code];
    setValue("materialTopics", updated, { shouldDirty: true });
  }

  return (
    <div className="space-y-8">
      {/* Part 1: GRI 3 Disclosures */}
      <div>
        <h2 className="text-lg font-semibold tracking-tight">
          GRI 3: Material Topics
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Process for determining and managing material topics.
        </p>
      </div>

      <div className="space-y-4">
        {gri3Disclosures.map((d) => (
          <DisclosureField
            key={d.code}
            name={`gri3.${codeToFieldKey(d.code)}`}
            code={d.code}
            label={d.label}
            fieldType={d.fieldType}
            required={d.required}
            options={d.options}
            unit={d.unit}
          />
        ))}
      </div>

      {/* Part 2: Materiality Checklist */}
      <div className="border-t border-border pt-6">
        <h3 className="text-base font-semibold tracking-tight">
          Select Material Topics
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Check the topics that are material to your organization. Selected
          topics will appear in the form for detailed disclosure.
        </p>

        <Accordion
          type="multiple"
          defaultValue={["Economic", "Environmental", "Social"]}
          className="mt-4"
        >
          {topicStandardGroups.map((group) => (
            <AccordionItem key={group.name} value={group.name}>
              <AccordionTrigger className="text-sm font-medium">
                {group.name} ({group.series} series)
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 py-1">
                  {group.standards.map((code) => {
                    const meta = griSections.find((s) => s.id === code);
                    const checked = materialTopics.includes(code);
                    return (
                      <label
                        key={code}
                        className="flex cursor-pointer items-center gap-2.5 rounded px-2 py-1.5 hover:bg-accent/50"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleTopic(code)}
                        />
                        <span className="text-sm">
                          {meta?.name ?? `GRI ${code}`}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
