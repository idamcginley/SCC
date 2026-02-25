import { Leaf, BarChart3, FileText, ClipboardList, Target } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Framework {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
}

export const frameworks: Framework[] = [
  {
    slug: "gri",
    name: "GRI Standards",
    shortName: "GRI",
    description:
      "Global Reporting Initiative standards for broad stakeholder-focused sustainability disclosure.",
    icon: Leaf,
  },
  {
    slug: "issb",
    name: "ISSB (IFRS S1/S2)",
    shortName: "ISSB",
    description:
      "International Sustainability Standards Board framework for investor-focused financial materiality.",
    icon: BarChart3,
  },
  {
    slug: "csrd",
    name: "CSRD",
    shortName: "CSRD",
    description:
      "EU Corporate Sustainability Reporting Directive requiring double materiality assessment.",
    icon: FileText,
  },
  {
    slug: "esrs",
    name: "ESRS",
    shortName: "ESRS",
    description:
      "European Sustainability Reporting Standards implementing CSRD disclosure requirements.",
    icon: ClipboardList,
  },
  {
    slug: "sbti",
    name: "SBTi",
    shortName: "SBTi",
    description:
      "Science Based Targets initiative for validated emissions reduction target-setting.",
    icon: Target,
  },
];
