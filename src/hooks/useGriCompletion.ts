import { useMemo } from "react";
import { useWatch } from "react-hook-form";
import {
  griDisclosures,
  codeToFieldKey,
  type GriSection,
} from "@/schemas/gri";

/**
 * Calculates completion percentage per GRI section using useWatch.
 *
 * Returns a Record mapping section id to 0-100 completion percentage.
 * For topic standards, only sections that are in materialTopics are calculated;
 * non-material topics return 0%.
 */
export function useGriCompletion(): Record<string, number> {
  const values = useWatch({ name: undefined });

  return useMemo(() => {
    if (!values) return {};

    const result: Record<string, number> = {};
    const materialTopics: string[] =
      (values as Record<string, unknown>).materialTopics as string[] ?? [];

    // Get unique sections
    const sections = new Set<GriSection>();
    for (const d of griDisclosures) {
      sections.add(d.section);
    }

    for (const section of sections) {
      const sectionDisclosures = griDisclosures.filter(
        (d) => d.section === section
      );
      if (sectionDisclosures.length === 0) {
        result[section] = 0;
        continue;
      }

      // For topic standards (numeric codes), only count if material
      const isTopicStandard = /^\d{3}$/.test(section);
      if (isTopicStandard && !materialTopics.includes(section)) {
        result[section] = 0;
        continue;
      }

      // Determine where to look for this section's values
      let sectionValues: Record<string, unknown> | undefined;
      if (section === "gri2") {
        sectionValues = (values as Record<string, unknown>).gri2 as
          | Record<string, unknown>
          | undefined;
      } else if (section === "gri3") {
        sectionValues = (values as Record<string, unknown>).gri3 as
          | Record<string, unknown>
          | undefined;
      } else {
        // Topic standard
        const topics = (values as Record<string, unknown>).topics as
          | Record<string, unknown>
          | undefined;
        sectionValues = topics?.[section] as
          | Record<string, unknown>
          | undefined;
      }

      if (!sectionValues) {
        result[section] = 0;
        continue;
      }

      let filledCount = 0;
      for (const d of sectionDisclosures) {
        const key = codeToFieldKey(d.code);
        const val = sectionValues[key];
        if (val !== undefined && val !== "" && val !== null && val !== false) {
          filledCount++;
        }
      }

      result[section] = Math.round(
        (filledCount / sectionDisclosures.length) * 100
      );
    }

    return result;
  }, [values]);
}
