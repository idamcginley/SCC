import { z } from "zod";

// ---------------------------------------------------------------------------
// Type definitions
// ---------------------------------------------------------------------------

export type FieldType = "textarea" | "text" | "number" | "select" | "boolean";

export type GriSection =
  | "gri1"
  | "gri2"
  | "gri3"
  | string; // Topic Standard codes: "201", "202", ..., "419"

export interface DisclosureDefinition {
  code: string;
  label: string;
  section: GriSection;
  fieldType: FieldType;
  required: boolean;
  options?: string[];
  unit?: string;
}

export interface GriSectionMeta {
  id: GriSection;
  name: string;
  description: string;
}

// ---------------------------------------------------------------------------
// Section metadata
// ---------------------------------------------------------------------------

export const griSections: GriSectionMeta[] = [
  { id: "gri1", name: "GRI 1: Foundation 2021", description: "Reporting principles and requirements -- no disclosure fields" },
  { id: "gri2", name: "GRI 2: General Disclosures 2021", description: "30 disclosures covering organization, governance, strategy, and stakeholder engagement" },
  { id: "gri3", name: "GRI 3: Material Topics 2021", description: "Process for determining and managing material topics" },
  // Economic
  { id: "201", name: "GRI 201: Economic Performance 2016", description: "Direct economic value generated and distributed" },
  { id: "202", name: "GRI 202: Market Presence 2016", description: "Ratios of entry-level wage and local hiring" },
  { id: "203", name: "GRI 203: Indirect Economic Impacts 2016", description: "Infrastructure investments and significant indirect impacts" },
  { id: "204", name: "GRI 204: Procurement Practices 2016", description: "Proportion of spending on local suppliers" },
  { id: "205", name: "GRI 205: Anti-corruption 2016", description: "Operations assessed, communication, and confirmed incidents" },
  { id: "206", name: "GRI 206: Anti-competitive Behavior 2016", description: "Legal actions for anti-competitive behavior" },
  { id: "207", name: "GRI 207: Tax 2019", description: "Approach to tax, governance, stakeholder engagement, and country-by-country reporting" },
  // Environmental
  { id: "301", name: "GRI 301: Materials 2016", description: "Materials used by weight or volume" },
  { id: "302", name: "GRI 302: Energy 2016", description: "Energy consumption, intensity, and reduction" },
  { id: "303", name: "GRI 303: Water and Effluents 2018", description: "Water withdrawal, discharge, and consumption" },
  { id: "304", name: "GRI 304: Biodiversity 2016", description: "Operational sites in or near areas of high biodiversity value" },
  { id: "305", name: "GRI 305: Emissions 2016", description: "GHG emissions (Scope 1, 2, 3), intensity, and reductions" },
  { id: "306", name: "GRI 306: Waste 2020", description: "Waste generation, diversion, and disposal" },
  { id: "307", name: "GRI 307: Environmental Compliance 2016", description: "Non-compliance with environmental laws and regulations" },
  { id: "308", name: "GRI 308: Supplier Environmental Assessment 2016", description: "New suppliers screened and negative impacts in supply chain" },
  // Social
  { id: "401", name: "GRI 401: Employment 2016", description: "New employee hires, turnover, and benefits" },
  { id: "402", name: "GRI 402: Labor/Management Relations 2016", description: "Minimum notice periods for operational changes" },
  { id: "403", name: "GRI 403: Occupational Health and Safety 2018", description: "OHS management system, hazard identification, injury rates" },
  { id: "404", name: "GRI 404: Training and Education 2016", description: "Average training hours and skill development programs" },
  { id: "405", name: "GRI 405: Diversity and Equal Opportunity 2016", description: "Governance body and employee diversity" },
  { id: "406", name: "GRI 406: Non-discrimination 2016", description: "Incidents of discrimination and corrective actions" },
  { id: "407", name: "GRI 407: Freedom of Association and Collective Bargaining 2016", description: "Operations where rights may be at risk" },
  { id: "408", name: "GRI 408: Child Labor 2016", description: "Operations and suppliers at significant risk" },
  { id: "409", name: "GRI 409: Forced or Compulsory Labor 2016", description: "Operations and suppliers at significant risk" },
  { id: "410", name: "GRI 410: Security Practices 2016", description: "Security personnel trained in human rights" },
  { id: "411", name: "GRI 411: Rights of Indigenous Peoples 2016", description: "Incidents of violations involving indigenous peoples" },
  { id: "412", name: "GRI 412: Human Rights Assessment 2016", description: "Operations subject to human rights reviews" },
  { id: "413", name: "GRI 413: Local Communities 2016", description: "Operations with community engagement and impact assessments" },
  { id: "414", name: "GRI 414: Supplier Social Assessment 2016", description: "New suppliers screened and negative social impacts" },
  { id: "415", name: "GRI 415: Public Policy 2016", description: "Political contributions" },
  { id: "416", name: "GRI 416: Customer Health and Safety 2016", description: "Health and safety impact assessment of products/services" },
  { id: "417", name: "GRI 417: Marketing and Labeling 2016", description: "Product and service information and labeling requirements" },
  { id: "418", name: "GRI 418: Customer Privacy 2016", description: "Substantiated complaints regarding customer privacy" },
  { id: "419", name: "GRI 419: Socioeconomic Compliance 2016", description: "Non-compliance with laws and regulations in the social and economic area" },
];

// ---------------------------------------------------------------------------
// Topic standard groupings
// ---------------------------------------------------------------------------

export const topicStandardGroups = [
  { name: "Economic", series: "200", standards: ["201", "202", "203", "204", "205", "206", "207"] },
  { name: "Environmental", series: "300", standards: ["301", "302", "303", "304", "305", "306", "307", "308"] },
  { name: "Social", series: "400", standards: ["401", "402", "403", "404", "405", "406", "407", "408", "409", "410", "411", "412", "413", "414", "415", "416", "417", "418", "419"] },
];

// ---------------------------------------------------------------------------
// Disclosure metadata array -- single source of truth
// ---------------------------------------------------------------------------

export const griDisclosures: DisclosureDefinition[] = [
  // =========================================================================
  // GRI 2: General Disclosures 2021 (30 disclosures, all required)
  // =========================================================================

  // --- The Organization (2-1 to 2-5) ---
  { code: "2-1", label: "Organizational details", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-2", label: "Entities included in the organization's sustainability reporting", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-3", label: "Reporting period, frequency and contact point", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-4", label: "Restatements of information", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-5", label: "External assurance", section: "gri2", fieldType: "textarea", required: true },

  // --- Activities and Workers (2-6 to 2-8) ---
  { code: "2-6", label: "Activities, value chain and other business relationships", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-7", label: "Employees", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-8", label: "Workers who are not employees", section: "gri2", fieldType: "textarea", required: true },

  // --- Governance (2-9 to 2-21) ---
  { code: "2-9", label: "Governance structure and composition", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-10", label: "Nomination and selection of the highest governance body", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-11", label: "Chair of the highest governance body", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-12", label: "Role of the highest governance body in overseeing the management of impacts", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-13", label: "Delegation of responsibility for managing impacts", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-14", label: "Role of the highest governance body in sustainability reporting", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-15", label: "Conflicts of interest", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-16", label: "Communication of critical concerns", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-17", label: "Collective knowledge of the highest governance body", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-18", label: "Evaluation of the performance of the highest governance body", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-19", label: "Remuneration policies", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-20", label: "Process to determine remuneration", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-21", label: "Annual total compensation ratio", section: "gri2", fieldType: "textarea", required: true },

  // --- Strategy, Policies and Practices (2-22 to 2-28) ---
  { code: "2-22", label: "Statement on sustainable development strategy", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-23", label: "Policy commitments", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-24", label: "Embedding policy commitments", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-25", label: "Processes to remediate negative impacts", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-26", label: "Mechanisms for seeking advice and raising concerns", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-27", label: "Compliance with laws and regulations", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-28", label: "Membership associations", section: "gri2", fieldType: "textarea", required: true },

  // --- Stakeholder Engagement (2-29 to 2-30) ---
  { code: "2-29", label: "Approach to stakeholder engagement", section: "gri2", fieldType: "textarea", required: true },
  { code: "2-30", label: "Collective bargaining agreements", section: "gri2", fieldType: "textarea", required: true },

  // =========================================================================
  // GRI 3: Material Topics 2021 (3 disclosures, all required)
  // =========================================================================
  { code: "3-1", label: "Process to determine material topics", section: "gri3", fieldType: "textarea", required: true },
  { code: "3-2", label: "List of material topics", section: "gri3", fieldType: "textarea", required: true },
  { code: "3-3", label: "Management of material topics", section: "gri3", fieldType: "textarea", required: true },

  // =========================================================================
  // Topic Standards (materiality-gated, all NOT required at form level)
  // =========================================================================

  // --- GRI 201: Economic Performance 2016 ---
  { code: "201-1", label: "Direct economic value generated and distributed", section: "201", fieldType: "textarea", required: false },
  { code: "201-2", label: "Financial implications and other risks and opportunities due to climate change", section: "201", fieldType: "textarea", required: false },
  { code: "201-3", label: "Defined benefit plan obligations and other retirement plans", section: "201", fieldType: "textarea", required: false },
  { code: "201-4", label: "Financial assistance received from government", section: "201", fieldType: "textarea", required: false },

  // --- GRI 202: Market Presence 2016 ---
  { code: "202-1", label: "Ratios of standard entry level wage by gender compared to local minimum wage", section: "202", fieldType: "number", required: false, unit: "ratio" },
  { code: "202-2", label: "Proportion of senior management hired from the local community", section: "202", fieldType: "number", required: false, unit: "%" },

  // --- GRI 203: Indirect Economic Impacts 2016 ---
  { code: "203-1", label: "Infrastructure investments and services supported", section: "203", fieldType: "textarea", required: false },
  { code: "203-2", label: "Significant indirect economic impacts", section: "203", fieldType: "textarea", required: false },

  // --- GRI 204: Procurement Practices 2016 ---
  { code: "204-1", label: "Proportion of spending on local suppliers", section: "204", fieldType: "number", required: false, unit: "%" },

  // --- GRI 205: Anti-corruption 2016 ---
  { code: "205-1", label: "Operations assessed for risks related to corruption", section: "205", fieldType: "textarea", required: false },
  { code: "205-2", label: "Communication and training about anti-corruption policies and procedures", section: "205", fieldType: "textarea", required: false },
  { code: "205-3", label: "Confirmed incidents of corruption and actions taken", section: "205", fieldType: "textarea", required: false },

  // --- GRI 206: Anti-competitive Behavior 2016 ---
  { code: "206-1", label: "Legal actions for anti-competitive behavior, anti-trust, and monopoly practices", section: "206", fieldType: "textarea", required: false },

  // --- GRI 207: Tax 2019 ---
  { code: "207-1", label: "Approach to tax", section: "207", fieldType: "textarea", required: false },
  { code: "207-2", label: "Tax governance, control, and risk management", section: "207", fieldType: "textarea", required: false },
  { code: "207-3", label: "Stakeholder engagement and management of concerns related to tax", section: "207", fieldType: "textarea", required: false },
  { code: "207-4", label: "Country-by-country reporting", section: "207", fieldType: "textarea", required: false },

  // --- GRI 301: Materials 2016 ---
  { code: "301-1", label: "Materials used by weight or volume", section: "301", fieldType: "number", required: false, unit: "metric tonnes" },
  { code: "301-2", label: "Recycled input materials used", section: "301", fieldType: "number", required: false, unit: "%" },
  { code: "301-3", label: "Reclaimed products and their packaging materials", section: "301", fieldType: "number", required: false, unit: "%" },

  // --- GRI 302: Energy 2016 ---
  { code: "302-1", label: "Energy consumption within the organization", section: "302", fieldType: "number", required: false, unit: "GJ" },
  { code: "302-2", label: "Energy consumption outside of the organization", section: "302", fieldType: "number", required: false, unit: "GJ" },
  { code: "302-3", label: "Energy intensity", section: "302", fieldType: "number", required: false, unit: "GJ per unit" },
  { code: "302-4", label: "Reduction of energy consumption", section: "302", fieldType: "number", required: false, unit: "GJ" },
  { code: "302-5", label: "Reductions in energy requirements of products and services", section: "302", fieldType: "number", required: false, unit: "GJ" },

  // --- GRI 303: Water and Effluents 2018 ---
  { code: "303-1", label: "Interactions with water as a shared resource", section: "303", fieldType: "textarea", required: false },
  { code: "303-2", label: "Management of water discharge-related impacts", section: "303", fieldType: "textarea", required: false },
  { code: "303-3", label: "Water withdrawal", section: "303", fieldType: "number", required: false, unit: "ML" },
  { code: "303-4", label: "Water discharge", section: "303", fieldType: "number", required: false, unit: "ML" },
  { code: "303-5", label: "Water consumption", section: "303", fieldType: "number", required: false, unit: "ML" },

  // --- GRI 304: Biodiversity 2016 ---
  { code: "304-1", label: "Operational sites owned, leased, managed in, or adjacent to, protected areas and areas of high biodiversity value outside protected areas", section: "304", fieldType: "textarea", required: false },
  { code: "304-2", label: "Significant impacts of activities, products and services on biodiversity", section: "304", fieldType: "textarea", required: false },
  { code: "304-3", label: "Habitats protected or restored", section: "304", fieldType: "textarea", required: false },
  { code: "304-4", label: "IUCN Red List species and national conservation list species with habitats in areas affected by operations", section: "304", fieldType: "textarea", required: false },

  // --- GRI 305: Emissions 2016 ---
  { code: "305-1", label: "Direct (Scope 1) GHG emissions", section: "305", fieldType: "number", required: false, unit: "tCO2e" },
  { code: "305-2", label: "Energy indirect (Scope 2) GHG emissions", section: "305", fieldType: "number", required: false, unit: "tCO2e" },
  { code: "305-3", label: "Other indirect (Scope 3) GHG emissions", section: "305", fieldType: "number", required: false, unit: "tCO2e" },
  { code: "305-4", label: "GHG emissions intensity", section: "305", fieldType: "number", required: false, unit: "tCO2e per unit" },
  { code: "305-5", label: "Reduction of GHG emissions", section: "305", fieldType: "number", required: false, unit: "tCO2e" },
  { code: "305-6", label: "Emissions of ozone-depleting substances (ODS)", section: "305", fieldType: "number", required: false, unit: "tonnes CFC-11 eq" },
  { code: "305-7", label: "Nitrogen oxides (NOx), sulfur oxides (SOx), and other significant air emissions", section: "305", fieldType: "number", required: false, unit: "tonnes" },

  // --- GRI 306: Waste 2020 ---
  { code: "306-1", label: "Waste generation and significant waste-related impacts", section: "306", fieldType: "textarea", required: false },
  { code: "306-2", label: "Management of significant waste-related impacts", section: "306", fieldType: "textarea", required: false },
  { code: "306-3", label: "Waste generated", section: "306", fieldType: "number", required: false, unit: "metric tonnes" },
  { code: "306-4", label: "Waste diverted from disposal", section: "306", fieldType: "number", required: false, unit: "metric tonnes" },
  { code: "306-5", label: "Waste directed to disposal", section: "306", fieldType: "number", required: false, unit: "metric tonnes" },

  // --- GRI 307: Environmental Compliance 2016 ---
  { code: "307-1", label: "Non-compliance with environmental laws and regulations", section: "307", fieldType: "textarea", required: false },

  // --- GRI 308: Supplier Environmental Assessment 2016 ---
  { code: "308-1", label: "New suppliers that were screened using environmental criteria", section: "308", fieldType: "number", required: false, unit: "%" },
  { code: "308-2", label: "Negative environmental impacts in the supply chain and actions taken", section: "308", fieldType: "textarea", required: false },

  // --- GRI 401: Employment 2016 ---
  { code: "401-1", label: "New employee hires and employee turnover", section: "401", fieldType: "number", required: false, unit: "count" },
  { code: "401-2", label: "Benefits provided to full-time employees that are not provided to temporary or part-time employees", section: "401", fieldType: "textarea", required: false },
  { code: "401-3", label: "Parental leave", section: "401", fieldType: "textarea", required: false },

  // --- GRI 402: Labor/Management Relations 2016 ---
  { code: "402-1", label: "Minimum notice periods regarding operational changes", section: "402", fieldType: "textarea", required: false },

  // --- GRI 403: Occupational Health and Safety 2018 ---
  { code: "403-1", label: "Occupational health and safety management system", section: "403", fieldType: "textarea", required: false },
  { code: "403-2", label: "Hazard identification, risk assessment, and incident investigation", section: "403", fieldType: "textarea", required: false },
  { code: "403-3", label: "Occupational health services", section: "403", fieldType: "textarea", required: false },
  { code: "403-4", label: "Worker participation, consultation, and communication on occupational health and safety", section: "403", fieldType: "textarea", required: false },
  { code: "403-5", label: "Worker training on occupational health and safety", section: "403", fieldType: "textarea", required: false },
  { code: "403-6", label: "Promotion of worker health", section: "403", fieldType: "textarea", required: false },
  { code: "403-7", label: "Prevention and mitigation of occupational health and safety impacts directly linked by business relationships", section: "403", fieldType: "textarea", required: false },
  { code: "403-8", label: "Workers covered by an occupational health and safety management system", section: "403", fieldType: "number", required: false, unit: "%" },
  { code: "403-9", label: "Work-related injuries", section: "403", fieldType: "number", required: false, unit: "rate" },
  { code: "403-10", label: "Work-related ill health", section: "403", fieldType: "number", required: false, unit: "rate" },

  // --- GRI 404: Training and Education 2016 ---
  { code: "404-1", label: "Average hours of training per year per employee", section: "404", fieldType: "number", required: false, unit: "hours" },
  { code: "404-2", label: "Programs for upgrading employee skills and transition assistance programs", section: "404", fieldType: "textarea", required: false },
  { code: "404-3", label: "Percentage of employees receiving regular performance and career development reviews", section: "404", fieldType: "number", required: false, unit: "%" },

  // --- GRI 405: Diversity and Equal Opportunity 2016 ---
  { code: "405-1", label: "Diversity of governance bodies and employees", section: "405", fieldType: "number", required: false, unit: "%" },
  { code: "405-2", label: "Ratio of basic salary and remuneration of women to men", section: "405", fieldType: "number", required: false, unit: "ratio" },

  // --- GRI 406: Non-discrimination 2016 ---
  { code: "406-1", label: "Incidents of discrimination and corrective actions taken", section: "406", fieldType: "textarea", required: false },

  // --- GRI 407: Freedom of Association and Collective Bargaining 2016 ---
  { code: "407-1", label: "Operations and suppliers in which the right to freedom of association and collective bargaining may be at risk", section: "407", fieldType: "textarea", required: false },

  // --- GRI 408: Child Labor 2016 ---
  { code: "408-1", label: "Operations and suppliers at significant risk for incidents of child labor", section: "408", fieldType: "textarea", required: false },

  // --- GRI 409: Forced or Compulsory Labor 2016 ---
  { code: "409-1", label: "Operations and suppliers at significant risk for incidents of forced or compulsory labor", section: "409", fieldType: "textarea", required: false },

  // --- GRI 410: Security Practices 2016 ---
  { code: "410-1", label: "Security personnel trained in human rights policies or procedures", section: "410", fieldType: "number", required: false, unit: "%" },

  // --- GRI 411: Rights of Indigenous Peoples 2016 ---
  { code: "411-1", label: "Incidents of violations involving rights of indigenous peoples", section: "411", fieldType: "textarea", required: false },

  // --- GRI 412: Human Rights Assessment 2016 ---
  { code: "412-1", label: "Operations that have been subject to human rights reviews or impact assessments", section: "412", fieldType: "number", required: false, unit: "%" },
  { code: "412-2", label: "Employee training on human rights policies or procedures", section: "412", fieldType: "number", required: false, unit: "hours" },
  { code: "412-3", label: "Significant investment agreements and contracts that include human rights clauses or that underwent human rights screening", section: "412", fieldType: "textarea", required: false },

  // --- GRI 413: Local Communities 2016 ---
  { code: "413-1", label: "Operations with local community engagement, impact assessments, and development programs", section: "413", fieldType: "number", required: false, unit: "%" },
  { code: "413-2", label: "Operations with significant actual and potential negative impacts on local communities", section: "413", fieldType: "textarea", required: false },

  // --- GRI 414: Supplier Social Assessment 2016 ---
  { code: "414-1", label: "New suppliers that were screened using social criteria", section: "414", fieldType: "number", required: false, unit: "%" },
  { code: "414-2", label: "Negative social impacts in the supply chain and actions taken", section: "414", fieldType: "textarea", required: false },

  // --- GRI 415: Public Policy 2016 ---
  { code: "415-1", label: "Political contributions", section: "415", fieldType: "textarea", required: false },

  // --- GRI 416: Customer Health and Safety 2016 ---
  { code: "416-1", label: "Assessment of the health and safety impacts of product and service categories", section: "416", fieldType: "number", required: false, unit: "%" },
  { code: "416-2", label: "Incidents of non-compliance concerning the health and safety impacts of products and services", section: "416", fieldType: "textarea", required: false },

  // --- GRI 417: Marketing and Labeling 2016 ---
  { code: "417-1", label: "Requirements for product and service information and labeling", section: "417", fieldType: "textarea", required: false },
  { code: "417-2", label: "Incidents of non-compliance concerning product and service information and labeling", section: "417", fieldType: "textarea", required: false },
  { code: "417-3", label: "Incidents of non-compliance concerning marketing communications", section: "417", fieldType: "textarea", required: false },

  // --- GRI 418: Customer Privacy 2016 ---
  { code: "418-1", label: "Substantiated complaints concerning breaches of customer privacy and losses of customer data", section: "418", fieldType: "textarea", required: false },

  // --- GRI 419: Socioeconomic Compliance 2016 ---
  { code: "419-1", label: "Non-compliance with laws and regulations in the social and economic area", section: "419", fieldType: "textarea", required: false },
];

// ---------------------------------------------------------------------------
// Helper: convert disclosure code to form field key (e.g., "2-1" -> "disclosure_2_1")
// ---------------------------------------------------------------------------

export function codeToFieldKey(code: string): string {
  return `disclosure_${code.replace(/-/g, "_")}`;
}

// ---------------------------------------------------------------------------
// Helper: get disclosures by section
// ---------------------------------------------------------------------------

export function getDisclosuresBySection(section: GriSection): DisclosureDefinition[] {
  return griDisclosures.filter((d) => d.section === section);
}

// ---------------------------------------------------------------------------
// All topic standard codes
// ---------------------------------------------------------------------------

const allTopicCodes = topicStandardGroups.flatMap((g) => g.standards);

// ---------------------------------------------------------------------------
// Build Zod schema from metadata
// ---------------------------------------------------------------------------

function buildFieldSchema(d: DisclosureDefinition) {
  if (d.fieldType === "number") {
    return d.required
      ? z.coerce.number({ error: "Must be a number" }).nonnegative("Must be zero or positive")
      : z.union([z.coerce.number().nonnegative(), z.literal("")]).optional().default("");
  }
  if (d.fieldType === "boolean") {
    return z.boolean().default(false);
  }
  // textarea, text, select
  return d.required
    ? z.string().min(1, "Required")
    : z.string().optional().default("");
}

// GRI 2 disclosures
const gri2Fields: Record<string, z.ZodTypeAny> = {};
for (const d of griDisclosures.filter((d) => d.section === "gri2")) {
  gri2Fields[codeToFieldKey(d.code)] = buildFieldSchema(d);
}

// GRI 3 disclosures
const gri3Fields: Record<string, z.ZodTypeAny> = {};
for (const d of griDisclosures.filter((d) => d.section === "gri3")) {
  gri3Fields[codeToFieldKey(d.code)] = buildFieldSchema(d);
}

// Topic standard disclosures -- one optional nested object per standard
const topicSchemas: Record<string, z.ZodTypeAny> = {};
for (const topicCode of allTopicCodes) {
  const topicDisclosures = griDisclosures.filter((d) => d.section === topicCode);
  if (topicDisclosures.length === 0) continue;

  const topicFields: Record<string, z.ZodTypeAny> = {};
  for (const d of topicDisclosures) {
    topicFields[codeToFieldKey(d.code)] = buildFieldSchema(d);
  }
  topicSchemas[topicCode] = z.object(topicFields).optional();
}

export const griSchema = z
  .object({
    gri2: z.object(gri2Fields),
    gri3: z.object(gri3Fields),
    materialTopics: z.array(z.string()).default([]),
    topics: z.object(topicSchemas),
  })
  .superRefine((data, ctx) => {
    // Validate that selected material topics have at least some disclosures filled
    for (const topicCode of data.materialTopics) {
      const topicData = data.topics[topicCode as keyof typeof data.topics];
      if (!topicData) continue;

      const topicDisclosures = griDisclosures.filter((d) => d.section === topicCode);
      const filledCount = topicDisclosures.filter((d) => {
        const key = codeToFieldKey(d.code);
        const val = (topicData as Record<string, unknown>)[key];
        return val !== undefined && val !== "" && val !== null;
      }).length;

      if (filledCount === 0 && topicDisclosures.length > 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `Material topic ${topicCode} is selected but has no disclosures filled`,
          path: ["topics", topicCode],
        });
      }
    }
  });

// ---------------------------------------------------------------------------
// Inferred type
// ---------------------------------------------------------------------------

export type GriFormData = z.infer<typeof griSchema>;

// ---------------------------------------------------------------------------
// Default values generator
// ---------------------------------------------------------------------------

export function getDefaultValues(): GriFormData {
  const gri2: Record<string, string> = {};
  for (const d of griDisclosures.filter((d) => d.section === "gri2")) {
    gri2[codeToFieldKey(d.code)] = "";
  }

  const gri3: Record<string, string> = {};
  for (const d of griDisclosures.filter((d) => d.section === "gri3")) {
    gri3[codeToFieldKey(d.code)] = "";
  }

  const topics: Record<string, Record<string, string | number>> = {};
  for (const topicCode of allTopicCodes) {
    const topicDisclosures = griDisclosures.filter((d) => d.section === topicCode);
    if (topicDisclosures.length === 0) continue;
    const fields: Record<string, string | number> = {};
    for (const d of topicDisclosures) {
      fields[codeToFieldKey(d.code)] = "";
    }
    topics[topicCode] = fields;
  }

  return {
    gri2,
    gri3,
    materialTopics: [],
    topics,
  } as GriFormData;
}
