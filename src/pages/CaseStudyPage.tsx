import React from "react";

export function CaseStudyPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 pt-24 pb-12">
      <div className="border-b border-border pb-6">
        <h1 className="text-2xl font-bold tracking-tight text-primary">NorthLeaf Foods Inc. | Case Challenge</h1>
        <p className="text-sm text-muted-foreground mt-2">Sustainability Frameworks | 2026</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-green-700 border-b border-green-700 pb-2">Part 1: Company Background</h2>
        
        <h3 className="text-lg font-medium text-green-700">About NorthLeaf Foods Inc.</h3>
        <p>NorthLeaf Foods Inc. is a publicly listed Canadian food and beverage company headquartered in Montreal, Quebec. Founded in 2004, the company produces packaged cereals, granola bars, and plant-based snack products sold across North America and, since 2022, across the European Union.</p>
        <p>In 2023, NorthLeaf acquired a mid-sized food manufacturer in Stuttgart, Germany, creating a new subsidiary, NorthLeaf Europe GmbH, which now employs 1,400 people and generates approximately €220 million in annual revenue.</p>
        
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3 border border-gray-200">Company Overview</th>
                <th className="p-3 border border-gray-200">Detail</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Headquarters</td><td className="p-3 border">Montreal, Quebec, Canada</td></tr>
              <tr><td className="p-3 border font-semibold">Legal Structure</td><td className="p-3 border">Public (TSX: NLF) + EU subsidiary (NorthLeaf Europe GmbH)</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Total Employees</td><td className="p-3 border">4,200 globally (2,800 Canada, 1,400 Germany)</td></tr>
              <tr><td className="p-3 border font-semibold">Annual Revenue</td><td className="p-3 border">~$850M CAD consolidated</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Products</td><td className="p-3 border">Packaged cereals, granola bars, plant-based snacks</td></tr>
              <tr><td className="p-3 border font-semibold">Key Markets</td><td className="p-3 border">Canada, United States, Germany, France, Netherlands</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Supply Chain</td><td className="p-3 border">Grain farmers (Prairie provinces + Ukraine), packaging suppliers (India, China)</td></tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium text-green-700 mt-6">The Situation</h3>
        <p>NorthLeaf's Sustainability Manager, Sophie Chen, is preparing a briefing for the board's Audit & Risk Committee. Three pressures have converged in the past six months:</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
          <div className="bg-green-50 p-4 border border-green-100 rounded">
            <h4 className="font-bold text-green-800">Pressure 1<br/>Regulatory Obligation</h4>
            <p className="text-sm mt-2">NorthLeaf Europe GmbH qualifies as a "large undertaking" under EU law. Their legal team has flagged a mandatory sustainability reporting requirement beginning with the 2024 fiscal year data.</p>
          </div>
          <div className="bg-blue-50 p-4 border border-blue-100 rounded">
            <h4 className="font-bold text-blue-800">Pressure 2<br/>Investor Demands</h4>
            <p className="text-sm mt-2">Three major pension funds holding NorthLeaf shares have written to the board requesting standardized, investor-focused climate disclosures, specifically around climate risks and how they affect the company's financial position.</p>
          </div>
          <div className="bg-orange-50 p-4 border border-orange-100 rounded">
            <h4 className="font-bold text-orange-800">Pressure 3<br/>ESG Rating Downgrade</h4>
            <p className="text-sm mt-2">A leading ESG rating agency has downgraded NorthLeaf from B to C, citing "insufficient emissions transparency." A sustainability analyst from the agency has asked NorthLeaf to participate in a standardized environmental disclosure questionnaire.</p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-green-700 border-b border-green-700 pb-2">Part 2: Current Reporting Status</h2>
        <p>NorthLeaf currently publishes an annual Sustainability Summary on its website. An excerpt from the document reads:</p>
        <blockquote className="bg-gray-100 p-4 border-l-4 border-gray-300 italic my-4">
          <p>"NorthLeaf Foods is committed to responsible business practices. Our 2023 Sustainability Summary is informed by GRI and reflects our ongoing commitment to transparency with stakeholders. We are in the process of aligning our emissions reporting with global best practices."</p>
          <footer className="mt-2 text-sm text-gray-600">- NorthLeaf Foods 2023 Sustainability Summary, p. 2</footer>
        </blockquote>
        <p>Sophie notes that the company has never submitted to CDP, has no formal TCFD disclosure, and has not performed a double materiality assessment.</p>
        
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded my-4">
          <h4 className="font-bold text-orange-600">Key Context: Compliance Language</h4>
          <p className="text-sm mt-2">When reviewing sustainability reports, pay close attention to the exact language used. Terms like "informed by," "aligned with," and "in accordance with" are not interchangeable. They signal different levels of compliance with reporting frameworks.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-green-700 border-b border-green-700 pb-2">Part 3: Emissions Data (Exhibit A)</h2>
        <p>Sophie's team has compiled the following emissions data for the 2023 fiscal year. Review this data carefully, several questions on your dashboard will refer to it.</p>
        
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3 border border-gray-200">Emissions Source</th>
                <th className="p-3 border border-gray-200">Description</th>
                <th className="p-3 border border-gray-200">Scope</th>
                <th className="p-3 border border-gray-200">MTCO2e</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Natural gas combustion (Quebec plant)</td><td className="p-3 border">Burning gas to heat manufacturing facility in Montreal</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">12,400</td></tr>
              <tr><td className="p-3 border font-semibold">Natural gas combustion (Stuttgart plant)</td><td className="p-3 border">Burning gas to heat German manufacturing facility</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">9,800</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Hydro-Quebec electricity (Quebec)</td><td className="p-3 border">Grid electricity powering Montreal facility operations</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">1,200</td></tr>
              <tr><td className="p-3 border font-semibold">EnBW electricity (Stuttgart, DE)</td><td className="p-3 border">Grid electricity powering Stuttgart facility operations</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">18,600</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Prairie grain farmers (upstream)</td><td className="p-3 border">Fertilizer use and land management by NorthLeaf's grain suppliers</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">67,500</td></tr>
              <tr><td className="p-3 border font-semibold">Packaging suppliers (India & China)</td><td className="p-3 border">Manufacturing emissions from packaging material suppliers</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">31,200</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Consumer product disposal (downstream)</td><td className="p-3 border">End-of-life disposal of NorthLeaf packaging by consumers</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">14,300</td></tr>
              <tr><td className="p-3 border font-semibold">Employee business travel</td><td className="p-3 border">Air travel and rail by NorthLeaf staff</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">3,900</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Solar panel sales (avoided)</td><td className="p-3 border">NorthLeaf's new snack packaging made from recycled materials displaces virgin plastics</td><td className="p-3 border text-center">?</td><td className="p-3 border text-right">−8,000</td></tr>
            </tbody>
          </table>
        </div>

        <div className="bg-green-50 border border-green-200 p-4 rounded my-4">
          <h4 className="font-bold text-green-800">Note on Scope Column</h4>
          <p className="text-sm mt-2">The Scope column has been intentionally left blank. Part of your task is to correctly classify each emissions source using your knowledge of the GHG Protocol (Scopes 1, 2, 3, and 4) from the pre-reading material.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-green-700 border-b border-green-700 pb-2">Part 4: Governance Structure (Exhibit B)</h2>
        <p>NorthLeaf's board has three standing committees. The following table describes each committee and its responsibilities:</p>
        
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3 border border-gray-200">Committee</th>
                <th className="p-3 border border-gray-200">Chair</th>
                <th className="p-3 border border-gray-200">Key Responsibilities</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Audit & Risk Committee</td><td className="p-3 border">Independent Director: Elaine Bourdeau</td><td className="p-3 border">Financial reporting oversight, enterprise risk management, internal audit, ESG risk integration</td></tr>
              <tr><td className="p-3 border font-semibold">Compensation Committee</td><td className="p-3 border">Independent Director: David Park</td><td className="p-3 border">Executive compensation, incentive structure, performance metrics</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-semibold">Corporate Governance Committee</td><td className="p-3 border">Independent Director: Amara Diallo</td><td className="p-3 border">Board composition, governance practices, stakeholder engagement policy</td></tr>
            </tbody>
          </table>
        </div>
        
        <p>Sophie is drafting a section of NorthLeaf's new climate disclosure that explains how the board oversees climate-related risks and opportunities. She wants to know which TCFD pillar this falls under.</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-green-700 border-b border-green-700 pb-2">Part 5: Reporting Framework Summary (Exhibit C)</h2>
        <p>Sophie has prepared a quick-reference table to help the board understand which framework applies to whom and how:</p>
        
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-green-700 text-white text-left">
                <th className="p-3 border border-gray-200">Framework</th>
                <th className="p-3 border border-gray-200">Who Sets It</th>
                <th className="p-3 border border-gray-200">Primary Audience</th>
                <th className="p-3 border border-gray-200">Materiality Lens</th>
                <th className="p-3 border border-gray-200">Mandatory?</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-gray-50"><td className="p-3 border font-bold">GRI</td><td className="p-3 border">Global Reporting Initiative</td><td className="p-3 border">Broad stakeholders</td><td className="p-3 border">Impact materiality</td><td className="p-3 border">No (voluntary)</td></tr>
              <tr><td className="p-3 border font-bold">SASB</td><td className="p-3 border">Now part of ISSB</td><td className="p-3 border">Investors</td><td className="p-3 border">Financial materiality</td><td className="p-3 border">No (voluntary)</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-bold">ISSB (S1 & S2)</td><td className="p-3 border">IFRS Foundation</td><td className="p-3 border">Investors & creditors</td><td className="p-3 border">Financial materiality</td><td className="p-3 border">Voluntary / becoming mandatory</td></tr>
              <tr><td className="p-3 border font-bold">ESRS (CSRD)</td><td className="p-3 border">EFRAG / EU Commission</td><td className="p-3 border">Broad stakeholders</td><td className="p-3 border">Double materiality</td><td className="p-3 border">Yes. Large EU firms (2024 data)</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border font-bold">TCFD</td><td className="p-3 border">FSB</td><td className="p-3 border">Investors & regulators</td><td className="p-3 border">Climate-financial</td><td className="p-3 border">Yes. 19 jurisdictions</td></tr>
            </tbody>
          </table>
        </div>
        
        <div className="text-center text-muted-foreground mt-8 text-sm italic">
          — End of Case Document —
        </div>
      </section>
    </div>
  );
}
