export interface McOption {
  letter: "A" | "B" | "C" | "D";
  text: string;
}

export interface MultipleChoiceQuestion {
  id: string;
  number: number;
  text: string;
  options: McOption[];
  correctAnswer: "A" | "B" | "C" | "D";
}

export interface ShortAnswerQuestion {
  id: string;
  number: number;
  text: string;
}

export const mcQuestions: MultipleChoiceQuestion[] = [
  {
    id: "q1",
    number: 1,
    text: "NorthLeaf Europe GmbH qualifies as a large undertaking under EU law. Which sustainability reporting framework is legally mandatory for this subsidiary, beginning with the 2024 fiscal year data?",
    correctAnswer: "C",
    options: [
      { letter: "A", text: "GRI — because it is the most widely used framework globally" },
      { letter: "B", text: "TCFD — because it applies in 19 jurisdictions including Germany" },
      { letter: "C", text: "ESRS, under the Corporate Sustainability Reporting Directive (CSRD)" },
      { letter: "D", text: "ISSB S2 — because the IFRS Foundation mandates it globally" },
    ],
  },
  {
    id: "q2",
    number: 2,
    text: "NorthLeaf burns natural gas to heat its Quebec manufacturing plant. Referring to Exhibit A, how should these emissions be classified under the GHG Protocol?",
    correctAnswer: "B",
    options: [
      { letter: "A", text: "Scope 2 — because they result from purchased energy" },
      { letter: "B", text: "Scope 1 — because they come from a source owned and controlled by NorthLeaf" },
      { letter: "C", text: "Scope 3 (upstream) — because they are indirect emissions from the supply chain" },
      { letter: "D", text: "Scope 4 — because they are avoided emissions" },
    ],
  },
  {
    id: "q3",
    number: 3,
    text: "NorthLeaf purchases electricity from Hydro-Québec to power its Montreal facility. How should these emissions be classified?",
    correctAnswer: "D",
    options: [
      { letter: "A", text: "Scope 1 — because the electricity is consumed at NorthLeaf's facility" },
      { letter: "B", text: "Scope 3 (upstream) — because they occur outside NorthLeaf's direct control" },
      { letter: "C", text: "Scope 4 — because Hydro-Québec's hydroelectric power has very low emissions" },
      { letter: "D", text: "Scope 2 — because they are indirect emissions from purchased electricity" },
    ],
  },
  {
    id: "q4",
    number: 4,
    text: "Emissions released by NorthLeaf's Prairie grain farmers — who use fertilizers and manage land on NorthLeaf's behalf — fall into which emissions scope?",
    correctAnswer: "C",
    options: [
      { letter: "A", text: "Scope 1 — because these farmers supply directly to NorthLeaf" },
      { letter: "B", text: "Scope 2 — because NorthLeaf purchases the grain output" },
      { letter: "C", text: "Scope 3 (upstream value chain) — because they are indirect emissions from NorthLeaf's supply chain" },
      { letter: "D", text: "Scope 4 — because farming is a natural process" },
    ],
  },
  {
    id: "q5",
    number: 5,
    text: "The three pension funds writing to NorthLeaf's board are primarily concerned with how climate change could affect the company's financial performance and investment value. Which materiality approach is most relevant to address their needs?",
    correctAnswer: "B",
    options: [
      { letter: "A", text: "Impact materiality — focusing on NorthLeaf's effects on people and the planet" },
      { letter: "B", text: "Financial materiality — focusing on information that could influence investor decisions" },
      { letter: "C", text: "Double materiality — assessing both financial and impact dimensions simultaneously" },
      { letter: "D", text: "Climate-only materiality — focusing exclusively on greenhouse gas emissions" },
    ],
  },
  {
    id: "q6",
    number: 6,
    text: "Sophie wants to disclose how the Audit & Risk Committee oversees climate-related risks. Referencing Exhibit B and the TCFD framework, which of the four TCFD pillars does this disclosure fall under?",
    correctAnswer: "C",
    options: [
      { letter: "A", text: "Strategy — because committee oversight influences business strategy" },
      { letter: "B", text: "Risk Management — because the committee reviews enterprise risk" },
      { letter: "C", text: "Governance — because it describes board and management oversight of climate risk" },
      { letter: "D", text: "Metrics and Targets — because committee decisions are performance-driven" },
    ],
  },
  {
    id: "q7",
    number: 7,
    text: "The ESG rating agency that downgraded NorthLeaf has asked Sophie to submit environmental data through a standardized questionnaire that will be scored and shared with investors. Which organization is most likely making this request?",
    correctAnswer: "B",
    options: [
      { letter: "A", text: "EFRAG — because they collect ESRS compliance data for the European Commission" },
      { letter: "B", text: "CDP (Carbon Disclosure Project) — because CDP gathers standardized environmental data via an annual questionnaire and scores companies for investor use" },
      { letter: "C", text: "ISSB — because the IFRS Foundation requires all public companies to file disclosures directly" },
      { letter: "D", text: "TCFD Secretariat — because TCFD collects company filings from all 19 jurisdictions" },
    ],
  },
  {
    id: "q8",
    number: 8,
    text: "NorthLeaf's 2023 Sustainability Summary states it is \"informed by GRI.\" Based on Exhibit C and the pre-reading material, what does this language actually indicate?",
    correctAnswer: "B",
    options: [
      { letter: "A", text: "NorthLeaf is fully \"in accordance with\" GRI and has met all universal and topic standards" },
      { letter: "B", text: "NorthLeaf has used some GRI guidance but is NOT fully compliant with GRI standards" },
      { letter: "C", text: "NorthLeaf has completed the GRI certification process and is awaiting verification" },
      { letter: "D", text: "NorthLeaf is exempt from GRI because ESRS and TCFD take precedence" },
    ],
  },
];

export const saQuestions: ShortAnswerQuestion[] = [
  {
    id: "q9",
    number: 9,
    text: "NorthLeaf Europe GmbH's legal team has flagged that ESRS requires a \"double materiality\" assessment. In 2–3 sentences, explain what double materiality means and how it differs from the materiality approach used by ISSB.",
  },
  {
    id: "q10",
    number: 10,
    text: "Sophie wants to identify which sustainability topics are most likely to have a financial impact on NorthLeaf given its specific industry — food and beverage manufacturing. Which framework is best suited for this purpose, and what is the key feature that makes it useful? Answer in 2–3 sentences.",
  },
];
