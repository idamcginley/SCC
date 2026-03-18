import { Leaf, BarChart3, FileText, ClipboardList, Target, Building2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface FrameworkInputBox {
  id: string;
  label: string;
  sublabel: string;
  placeholder: string;
  isExcluded: boolean; // true = "DO NOT REPORT" box
  hint?: string; // optional cross-framework hint shown on the excluded box
}

export interface Framework {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  icon: LucideIcon;
  sectionHeader: string;
  inputBoxes: [FrameworkInputBox, FrameworkInputBox];
}

export const frameworks: Framework[] = [
  {
    slug: "gri",
    name: "GRI Standards",
    shortName: "GRI",
    description:
      "Global Reporting Initiative standards for broad stakeholder-focused sustainability disclosure.",
    icon: Leaf,
    sectionHeader: "GRI - Impact Materiality & Stakeholder Concerns",
    inputBoxes: [
      {
        id: "gri-outward-impact",
        label: "Outward Environmental & Social Impact",
        sublabel:
          "Identify specific organisational activities that directly impact local communities, ecosystems, or the broader public.",
        placeholder:
          "e.g. Chemical cooling process impacts on St. Lawrence biodiversity and local health.",
        isExcluded: false,
      },
      {
        id: "gri-excluded",
        label: "Excluded Financial Risks",
        sublabel:
          "Identify inward-facing financial vulnerabilities that affect corporate valuation rather than public/environmental well-being.",
        placeholder:
          "e.g. 15% depreciation in testing infrastructure value due to fluctuating water levels.",
        isExcluded: true,
        hint: "Financial risks of this nature belong in the ISSB or SASB tabs.",
      },
    ],
  },
  {
    slug: "sasb",
    name: "SASB Standards",
    shortName: "SASB",
    description:
      "Industry-specific standards for financially material sustainability information relevant to investors.",
    icon: Building2,
    sectionHeader: "SASB - Technology & Communications Sector",
    inputBoxes: [
      {
        id: "sasb-material-risk",
        label: "Material Risk Factors",
        sublabel:
          "Identify specific physical or transition risks that materially impact operations.",
        placeholder:
          "e.g. 15% depreciation in testing infrastructure value due to fluctuating water levels.",
        isExcluded: false,
      },
      {
        id: "sasb-excluded",
        label: "Excluded PR & General Awards",
        sublabel:
          "Identify marketing achievements that have no standard financial materiality.",
        placeholder:
          'e.g. Named Montreal\'s Top Green Tech Startup of the Year.',
        isExcluded: true,
        hint: "General award recognition does not constitute a financially material disclosure.",
      },
    ],
  },
  {
    slug: "issb",
    name: "ISSB (IFRS S2)",
    shortName: "ISSB",
    description:
      "International Sustainability Standards Board framework for investor-focused financial materiality.",
    icon: BarChart3,
    sectionHeader: "ISSB - Financial Impact of Climate Risks",
    inputBoxes: [
      {
        id: "issb-financial-effects",
        label: "Anticipated Financial Effects",
        sublabel:
          "Enter data showing how environmental factors will directly impact enterprise valuation.",
        placeholder:
          "e.g. 15% depreciation in testing infrastructure value due to fluctuating water levels.",
        isExcluded: false,
      },
      {
        id: "issb-excluded",
        label: "Excluded Standard Financials",
        sublabel:
          "Identify general financial goals that are not driven by sustainability or climate risks.",
        placeholder:
          "e.g. Aiming to reach $5M in Annual Recurring Revenue (ARR) by the end of Q3.",
        isExcluded: true,
        hint: "Revenue targets without a climate or sustainability driver do not qualify under ISSB.",
      },
    ],
  },
  {
    slug: "csrd",
    name: "CSRD",
    shortName: "CSRD",
    description:
      "EU Corporate Sustainability Reporting Directive requiring double materiality assessment.",
    icon: FileText,
    sectionHeader: "CSRD - Jurisdictional Compliance",
    inputBoxes: [
      {
        id: "csrd-double-materiality",
        label: "Double Materiality Triggers",
        sublabel:
          "Identify the specific operational expansion that triggers mandatory legal reporting.",
        placeholder:
          "e.g. Mandatory legal requirement to report for the European headquarters in Lyon, France.",
        isExcluded: false,
      },
      {
        id: "csrd-excluded",
        label: "Excluded Non-Applicable Jurisdictions",
        sublabel:
          "Identify domestic or non-EU expansions that do not trigger this directive.",
        placeholder:
          "e.g. New satellite office in Toronto to capture the Great Lakes market.",
        isExcluded: true,
        hint: "Non-EU expansions do not trigger CSRD reporting obligations.",
      },
    ],
  },
  {
    slug: "esrs",
    name: "ESRS",
    shortName: "ESRS",
    description:
      "European Sustainability Reporting Standards implementing CSRD disclosure requirements.",
    icon: ClipboardList,
    sectionHeader: "ESRS E1 & S1 - Specific European Metrics",
    inputBoxes: [
      {
        id: "esrs-governance-data",
        label: "Required Governance & Environmental Data",
        sublabel:
          "Enter the specific internal metrics required for European market compliance.",
        placeholder:
          "e.g. Reporting on carbon footprint and board gender diversity.",
        isExcluded: false,
      },
      {
        id: "esrs-excluded",
        label: "Excluded Product Specs",
        sublabel:
          "Identify product-level R&D metrics that do not fall under ESRS corporate reporting.",
        placeholder:
          "e.g. V3 Sensor boasts a 20% longer battery life and improved machine-learning diagnostic speeds.",
        isExcluded: true,
        hint: "Product-level R&D specifications are not corporate sustainability disclosures.",
      },
    ],
  },
  {
    slug: "sbti",
    name: "SBTi",
    shortName: "SBTi",
    description:
      "Science Based Targets initiative for validated emissions reduction target-setting.",
    icon: Target,
    sectionHeader: "SBTi - Emissions Reduction Pathways",
    inputBoxes: [
      {
        id: "sbti-verified-targets",
        label: "Verified Climate Science Alignment",
        sublabel:
          "Enter the specific, verifiable metric tied to global climate thresholds.",
        placeholder:
          "e.g. Interim 2030 greenhouse gas reduction targets strictly aligned with the 1.5°C limit.",
        isExcluded: false,
      },
      {
        id: "sbti-excluded",
        label: "Excluded Unverified Pledges",
        sublabel:
          "Identify long-term leadership pledges that lack immediate mathematical validation.",
        placeholder:
          "e.g. CEO publicly pledged that HydroVue would become a 'Net-Zero' company by 2040.",
        isExcluded: true,
        hint: "Long-term pledges without near-term verified targets do not qualify as SBTi-aligned.",
      },
    ],
  },
];
