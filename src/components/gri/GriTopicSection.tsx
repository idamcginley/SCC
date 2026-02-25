import { DisclosureField } from "@/components/shared/DisclosureField";
import {
  griDisclosures,
  griSections,
  codeToFieldKey,
} from "@/schemas/gri";

interface GriTopicSectionProps {
  topicCode: string;
}

export function GriTopicSection({ topicCode }: GriTopicSectionProps) {
  const disclosures = griDisclosures.filter((d) => d.section === topicCode);
  const sectionMeta = griSections.find((s) => s.id === topicCode);
  const topicName = sectionMeta?.name ?? `GRI ${topicCode}`;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold tracking-tight">{topicName}</h2>
        {sectionMeta?.description && (
          <p className="mt-1 text-sm text-muted-foreground">
            {sectionMeta.description}
          </p>
        )}
      </div>

      {disclosures.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No specific disclosures defined for this standard. Use the management
          approach disclosure (GRI 3-3) to report on this topic.
        </div>
      ) : (
        <div className="space-y-4">
          {disclosures.map((d) => (
            <DisclosureField
              key={d.code}
              name={`topics.${topicCode}.${codeToFieldKey(d.code)}`}
              code={d.code}
              label={d.label}
              fieldType={d.fieldType}
              required={d.required}
              options={d.options}
              unit={d.unit}
            />
          ))}
        </div>
      )}
    </div>
  );
}
