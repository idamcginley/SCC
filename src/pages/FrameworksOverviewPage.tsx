export function FrameworksOverviewPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-8 px-4 pt-40 pb-12">
      <div className="border-b border-border pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Sustainability Reporting Resources</h1>
        <p className="text-sm text-muted-foreground mt-2">Prepared by Ida McGinley using resources from Professor Hongping Tan</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">How to Use This Guide</h2>
        <p>This document is designed to help you build familiarity with the key concepts before the case session. Focus on understanding what each standard is trying to achieve and how they relate to one another. By the end of your reading, you should be able to:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Define sustainability reporting and explain why it differs from financial reporting.</li>
          <li>Identify the five major frameworks covered: GRI, SASB, ISSB, ESRS, and TCFD.</li>
          <li>Distinguish between financial materiality, impact materiality, and double materiality.</li>
          <li>Explain the four pillars of TCFD and why they matter to investors.</li>
          <li>Describe the concept of scope emissions (Scopes 1, 2, 3, and 4).</li>
          <li>Reflect on the challenges companies face when implementing these frameworks.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 1: What Is Sustainability Reporting?</h2>
        <p>Sustainability reporting is how companies share information about their environmental, social, and governance (ESG) impacts, risks, and opportunities. While financial reporting follows strict rules, sustainability reporting is more flexible, relies more on judgment, and is still changing.</p>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">1.1 The Core Purpose</h3>
        <p>The purpose of sustainability reporting is to give information that actually helps people make better decisions. To do this, you need to answer three questions:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Who are the relevant stakeholders? (Investors, regulators, communities, employees, society?)</li>
          <li>What decisions are they making? (Whether to invest, lend, regulate, purchase, or partner?)</li>
          <li>What information is material to those decisions?</li>
        </ul>
        
        <p className="mt-4">A strong sustainability report should have three main qualities:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Complete:</strong> it covers all issues that are material to the company and its stakeholders.</li>
          <li><strong>Comparable:</strong> users can benchmark one company against another using consistent categories and metrics.</li>
          <li><strong>Consistent:</strong> the same methodology is applied from year to year, allowing trend analysis.</li>
        </ul>

        <div className="bg-gray-100 p-4 border border-gray-300 rounded mt-4">
          <p><strong>Key Distinction:</strong> Financial reporting asks, “What happened to our money?” Sustainability reporting asks, “What impact do we have on the world, and how does the world affect us?” These questions are increasingly overlapping as climate risks are added to financial statements.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 2: The Sustainability Standards Landscape</h2>
        <p>Rather than a single global standard, multiple organizations have developed sustainability frameworks. Each varies in key ways: intended audience, definition of materiality, geographical scope, and level of enforcement. The table below highlights these differences to aid your comparison.</p>
        
        <div className="overflow-x-auto my-6">
          <table className="w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-teal-700 text-white text-left">
                <th className="p-3 border border-gray-200">Standard</th>
                <th className="p-3 border border-gray-200">Issuer</th>
                <th className="p-3 border border-gray-200">Audience</th>
                <th className="p-3 border border-gray-200">Materiality</th>
                <th className="p-3 border border-gray-200">Scope</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="bg-gray-50"><td className="p-3 border">GRI</td><td className="p-3 border">Global Reporting Initiative</td><td className="p-3 border">Broad stakeholders</td><td className="p-3 border">Impact materiality</td><td className="p-3 border">Global, voluntary</td></tr>
              <tr><td className="p-3 border">SASB</td><td className="p-3 border">Now part of ISSB</td><td className="p-3 border">Investors</td><td className="p-3 border">Financial materiality</td><td className="p-3 border">Industry-specific, 77 industries</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border">ISSB</td><td className="p-3 border">IFRS Foundation</td><td className="p-3 border">Investors & creditors</td><td className="p-3 border">Financial materiality</td><td className="p-3 border">Global, voluntary/mandatory</td></tr>
              <tr><td className="p-3 border">ESRS</td><td className="p-3 border">EFRAG / EU</td><td className="p-3 border">Broad stakeholders</td><td className="p-3 border">Double materiality</td><td className="p-3 border">EU mandatory (large firms)</td></tr>
              <tr className="bg-gray-50"><td className="p-3 border">TCFD</td><td className="p-3 border">FSB / TCFD</td><td className="p-3 border">Investors & regulators</td><td className="p-3 border">Climate-financial</td><td className="p-3 border">19 jurisdictions, climate-specific</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 3: Global Reporting Initiative (GRI)</h2>
        <p>The GRI Standards are the most commonly used sustainability reporting framework worldwide. Created in 1997, GRI was made for a wide range of people, including investors, employees, communities, NGOs, and regulators.</p>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">3.1 Structure of GRI Standards</h3>
        <p>GRI disclosure is organized in three layers:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Universal Standards:</strong> General disclosures that apply to all organizations</li>
          <li><strong>Sector Standards:</strong> Specific guidance for industries with sustainability profiles (e.g., oil and gas, mining, agriculture).</li>
          <li><strong>Topic Standards:</strong> Detailed disclosures on specific ESG issues such as energy, water, labor practices, anti-corruption, and biodiversity.</li>
        </ul>

        <h3 className="text-lg font-medium text-teal-700 mt-4">3.2 Compliance Levels</h3>
        <p>GRI offers two compliance levels:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>With reference to GRI:</strong> A company discloses a subset of information guided by GRI, fulfilling at a minimum the requirements 7 through 9 (identifying which GRI standards are applied and where to find the disclosures).</li>
          <li><strong>In accordance with GRI,</strong> A company fulfills all applicable requirements in the universal and relevant topic standards.</li>
        </ul>
        <p>Many companies pick the less strict "reference to" option, using phrases like "informed by" or "aligned with" GRI, these indicate partial, not full, compliance. Investors and analysts should be cautious with such claims.</p>

        <h3 className="text-lg font-medium text-teal-700 mt-4">3.3 Materiality: An Impact-First Approach</h3>
        <p>GRI uses impact materiality, focusing on the effects a company has on people and the planet, even if these don't directly impact finances.</p>
      </section>
      
      {/* Continuing through other parts */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 4: Sustainability Accounting Standards Board (SASB)</h2>
        <p>SASB was founded in 2011 to help investors make better decisions about where to invest their money. It does this by finding out which sustainability issues are most likely to affect financial results in each industry.</p>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">4.1 Industry-First Logic</h3>
        <p>SASB groups companies using the Sustainable Industry Classification System (SICS) into 11 sectors and 77 categories, based on sustainability risks rather than revenue. Companies in multiple areas may use several standards.</p>
        <p>For each industry, SASB identifies:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>The sustainability dimensions most relevant to that industry (environment, social capital, human capital, business model & innovation, leadership & governance).</li>
          <li>Specific disclosure topics and associated metrics. Which may be quantitative (e.g., total water withdrawn in cubic meters) or qualitative (e.g., description of cybersecurity risk management approach).</li>
        </ul>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">4.2 The Materiality Map</h3>
        <p>SASB has a Materiality Map that's available to everyone. For each of its 77 industries, it shows which of 26 general issues are likely to matter financially. This helps investors check ESG risks across their investments.</p>
        <div className="bg-gray-100 p-4 border border-gray-300 rounded mt-4">
          <p><strong>Example:</strong> For the airline industry, SASB says greenhouse gas emissions, fuel management, labor practices, and customer privacy are very important. For software companies, cybersecurity and data privacy matter most, while water and emissions are less important.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 5: International Sustainability Standards Board (ISSB)</h2>
        <p>The ISSB was set up in 2021 by the IFRS Foundation. Its job is to create a global standard for sustainability-related financial disclosures that work with financial reporting and help investors and creditors.</p>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">5.1 The Two Core Standards</h3>
        <p>The ISSB has issued two foundational standards:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>IFRS S1 (General Requirements):</strong> Sets out the overarching requirements for sustainability-related financial disclosures. It explicitly references SASB standards as a tool for identifying material topics within specific industries.</li>
          <li><strong>IFRS S2 (Climate-Related Disclosures):</strong> Closely aligned with the Task Force on Climate-Related Financial Disclosures (TCFD) framework, this standard requires companies to disclose how climate-related risks and opportunities affect their business model, strategy, and financial position.</li>
        </ul>

        <h3 className="text-lg font-medium text-teal-700 mt-4">5.2 Four-Pillar Structure</h3>
        <p>Both IFRS S1 and S2 organize disclosure requirements around four pillars:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Governance:</strong> How does the board and management oversee sustainability risks and opportunities?</li>
          <li><strong>Strategy:</strong> How do sustainability risks and opportunities affect the company's business model, strategy, and financial planning?</li>
          <li><strong>Risk Management:</strong> How does the company identify, assess, and manage sustainability risks?</li>
          <li><strong>Metrics and Targets:</strong> What quantitative measures and goals does the company use to track performance?</li>
        </ul>

        <h3 className="text-lg font-medium text-teal-700 mt-4">5.3 Financial Materiality Only</h3>
        <p>ISSB only looks at financial materiality, meaning information that could affect what investors decide.</p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 6: European Sustainability Reporting Standards (ESRS)</h2>
        <p>ESRS is the required sustainability reporting framework in the EU. It's the technical standard companies must use to follow the Corporate Sustainability Reporting Directive (CSRD).</p>

        <h3 className="text-lg font-medium text-teal-700 mt-4">6.1 CSRD vs. ESRS: The Legal vs. Technical Distinction</h3>
        <p>People often mix up these two terms:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>CSRD (Corporate Sustainability Reporting Directive):</strong> This is the EU law. It defines who must report (scope), when they must report, and what legal obligations apply. It became effective for large EU companies starting with the 2024 fiscal year data.</li>
          <li><strong>ESRS (European Sustainability Reporting Standards):</strong> These are the technical standards that specify what information must be disclosed and how. EFRAG developed them under a mandate from the European Commission.</li>
        </ul>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">6.2 Double Materiality</h3>
        <p>ESRS uses double materiality, which is the broadest definition among the main standards. Companies must look at and report information from two points of view at the same time:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Impact materiality:</strong> How does the company affect people and the environment (positive and negative, actual and potential)?</li>
          <li><strong>Financial materiality:</strong> How do sustainability issues create financial risks and opportunities for the company?</li>
        </ul>
        <p>Under ESRS, a topic is considered material if it meets either the impact or financial materiality criteria. This means companies often report topics, such as environmental impacts, if they are important from either perspective—even if they don't have immediate financial effects. This broader materiality differs from the more investor-focused SASB and ISSB approaches.</p>

        <h3 className="text-lg font-medium text-teal-700 mt-4">6.3 Structure of ESRS</h3>
        <p>ESRS uses the same four-pillar structure as ISSB: Governance, Strategy, Impact/Risk/Opportunity Management, and Metrics & Targets. It has 10 topic standards in three groups:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Environment:</strong> Climate change, pollution, water & marine resources, biodiversity & ecosystems, circular economy.</li>
          <li><strong>Social:</strong> Own workforce, workers in the value chain, affected communities, consumers & end-users.</li>
          <li><strong>Governance:</strong> Business conduct.</li>
        </ul>
        
        <div className="bg-gray-100 p-4 border border-gray-300 rounded mt-4">
          <p><strong>Circular Economy Note:</strong> ESRS has rules on circular economy, which means making and using products in ways that keep materials in use rather than throwing them away. Companies need to explain how they cut waste, make products last longer, and design for recycling.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 7: Other Relevant Frameworks</h2>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">7.1 CDP (Carbon Disclosure Project)</h3>
        <p>CDP is a non-profit that uses a global questionnaire for companies, cities, and regions to report environmental data. CDP collects this data in a standard way, scores it, and shares it with investors, regulators, and rating agencies.</p>
        <p>Why investors care about CDP:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Long time series (20+ years of comparable historical data).</li>
          <li>Standardized emissions data across thousands of companies globally.</li>
          <li>Third-party scoring methodology that allows portfolio-level analysis.</li>
          <li>Used in climate risk models, portfolio alignment analysis, and shareholder engagement.</li>
        </ul>
        <div className="bg-gray-100 p-4 border border-gray-300 rounded mt-4">
          <p><strong>How CDP Fits In:</strong> You can think of ISSB, SASB, and GRI as the rulebooks for reporting. Companies follow these rules to make their reports. CDP then gathers this information through its questionnaire and turns it into a database for investors, rating agencies, and regulators.</p>
        </div>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">7.2 Scope Emissions: 1, 2, 3, and 4</h3>
        <p>Emissions accounting is a key part of nearly all sustainability reporting. The Greenhouse Gas (GHG) Protocol breaks emissions into four categories:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Scope 1 → Direct Emissions:</strong> GHG emissions from sources owned or controlled by the company (e.g., burning fuel in company-owned vehicles or factories).</li>
          <li><strong>Scope 2 → Purchased Energy Emissions:</strong> Indirect emissions from purchased electricity, steam, heat, or cooling. These occur at the utility's facility but are driven by the company's energy consumption.</li>
          <li><strong>Scope 3 → Value Chain Emissions:</strong> All other indirect emissions across the company's upstream (supply chain) and downstream (product use and disposal) value chain. This is typically the largest category and the hardest to measure.</li>
          <li><strong>Scope 4 → Avoided Emissions (Voluntary):</strong> Emissions reductions that occur outside the company's value chain because of the company's products or services (e.g., a company selling energy-efficient lighting that displaces more carbon-intensive alternatives). This is not mandatory under most frameworks but is gaining traction.</li>
        </ul>
        <div className="bg-gray-100 p-4 border border-gray-300 rounded mt-4">
          <p><strong>Example:</strong> For example, an automaker's Scope 1 is its factory emissions. Scope 2 is the electricity it buys for those factories. Scope 3 covers all the steel and aluminum it gets from suppliers (upstream) and all the exhaust from its cars over their lifetime (downstream). Scope 3 often makes up 80-95% of the automaker's total emissions.</p>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700">Part 8: Task Force on Climate-Related Financial Disclosures (TCFD)</h2>
        <p>The TCFD was created in 2015. Its goal was to produce voluntary, consistent, and useful climate-related financial disclosures that companies everywhere could use and that fit within existing reporting rules.</p>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">8.1 Why TCFD Was Created</h3>
        <p>Before TCFD, climate risk disclosures were scattered, inconsistent, and often hidden in long sustainability reports that investors didn't fully read. The FSB worried that major climate risks weren't being factored into financial markets, which could threaten financial stability. TCFD wanted to fix this by making climate risk a regular part of financial reporting, just like interest rate or credit risk.</p>
        
        <h3 className="text-lg font-medium text-teal-700 mt-4">8.2 The Four TCFD Pillars</h3>
        <p>TCFD organizes its recommendations around the same four pillars now used by ISSB and ESRS:</p>
        <ol className="list-decimal pl-6 space-y-2">
          <li>
            <strong>Governance</strong><br/>
            Disclose how the board and senior management oversee climate-related risks and opportunities.
            <ul className="list-disc pl-6 mt-1">
              <li>Is climate risk a standing item at board meetings?</li>
              <li>Which committee or executive role has primary responsibility?</li>
              <li>How is management incentivized to manage climate risk?</li>
            </ul>
          </li>
          <li>
            <strong>Strategy</strong><br/>
            Disclose the actual and potential impacts of climate-related risks and opportunities on the organization's business, strategy, and financial planning over the short, medium, and long term.
            <ul className="list-disc pl-6 mt-1">
              <li>What physical risks does climate change pose (floods, droughts, extreme heat)?</li>
              <li>What transition risks arise from a shift to a lower-carbon economy (new regulations, changing consumer preferences, stranded assets)?</li>
              <li>What opportunities exist (new green products, energy efficiency gains, renewable energy)?</li>
              <li>Has the company conducted scenario analysis to test resilience under different climate pathways?</li>
            </ul>
          </li>
          <li>
            <strong>Risk Management</strong><br/>
            Disclose how the organization identifies, assesses, and manages climate-related risks, and how this process integrates with overall enterprise risk management.
            <ul className="list-disc pl-6 mt-1">
              <li>What is the process for identifying climate risks at the operational and strategic level?</li>
              <li>How are climate risks prioritized relative to other business risks?</li>
              <li>How does this feed into the company's overall enterprise risk management (ERM) framework?</li>
            </ul>
          </li>
          <li>
            <strong>Metrics and Targets</strong><br/>
            Disclose the metrics and targets used to assess and manage relevant climate-related risks and opportunities.
            <ul className="list-disc pl-6 mt-1">
              <li>What are the company's Scope 1, 2, and 3 GHG emissions?</li>
              <li>Does the company use internal carbon pricing?</li>
              <li>What net-zero, emissions reduction, or Paris-aligned targets has the company set?</li>
              <li>Are the targets science-based (validated against the Science Based Targets initiative)?</li>
            </ul>
          </li>
        </ol>

        <h3 className="text-lg font-medium text-teal-700 mt-4">8.3 TCFD's Global Reach and Success</h3>
        <p>TCFD achieved widespread adoption as a voluntary framework:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>19 jurisdictions representing approximately 60% of global 2022 GDP have incorporated TCFD-aligned disclosure requirements</li>
          <li>Over 4,800 organizations globally have formally signaled their support for TCFD recommendations.</li>
          <li>The ISSB's IFRS S2 is directly built on TCFD, meaning TCFD has effectively become the backbone of mandatory climate disclosure globally.</li>
        </ul>

        <h3 className="text-lg font-medium text-teal-700 mt-4">8.4 Key Factors in TCFD's Success</h3>
        <p>TCFD's design helped it become widely adopted:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li><strong>Industry-led development:</strong> TCFD was designed by preparers and users, not just regulators, ensuring the framework was practical and balanced.</li>
          <li><strong>Voluntary origins:</strong> Starting as voluntary, allowed companies to gradually build reporting capacity without facing immediate legal penalties.</li>
          <li><strong>Focus on financial relevance:</strong> By framing climate as a financial risk (not just an environmental issue), TCFD spoke the language of CFOs, audit committees, and investors.</li>
          <li><strong>Built on existing frameworks:</strong> TCFD encouraged convergence rather than duplication, reducing reporting burden.</li>
        </ul>
      </section>
      
      {/* Glossary & Credits omitted for brevity, but I will include Glossary since it was requested "EXACTLY". */}
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700 border-t border-gray-200 pt-6">Glossary of Key Terms</h2>
        <div className="space-y-2">
          <p><strong className="bg-yellow-200">CDP:</strong> Carbon Disclosure Project. A non-profit that collects standardized environmental data from companies through an annual questionnaire and scores them for investor use.</p>
          <p><strong className="bg-yellow-200">CSRD:</strong> Corporate Sustainability Reporting Directive. The EU law (effective 2024) that mandates sustainability reporting for large and listed EU companies using ESRS technical standards.</p>
          <p><strong className="bg-yellow-200">Double Materiality:</strong> The ESRS concept that requires companies to assess both how they impact the world (impact materiality) and how the world's sustainability trends impact their finances (financial materiality).</p>
          <p><strong className="bg-yellow-200">EFRAG:</strong> European Financial Reporting Advisory Group. The body responsible for developing ESRS technical standards on behalf of the European Commission.</p>
          <p><strong className="bg-yellow-200">ESRS:</strong> European Sustainability Reporting Standards. The technical standards for CSRD compliance, covering environmental, social, and governance topics.</p>
          <p><strong className="bg-yellow-200">Financial Materiality:</strong> Information that could reasonably be expected to influence investor or creditor decisions. The materiality concept used by SASB, ISSB, and TCFD.</p>
          <p><strong className="bg-yellow-200">FSB :</strong>Financial Stability Board. An international body that monitors the global financial system and created the TCFD in 2015.</p>
          <p><strong className="bg-yellow-200">GHG Protocol :</strong>Greenhouse Gas Protocol. The international accounting standard for measuring and managing GHG emissions, defining Scope 1, 2, and 3 categories.</p>
          <p><strong className="bg-yellow-200">GRI :</strong>Global Reporting Initiative. The world's most widely used sustainability reporting framework, focused on impact materiality and a broad stakeholder audience.</p>
          <p><strong className="bg-yellow-200">Impact Materiality :</strong>The GRI concept focusing on the actual or potential effects a company has on people and the planet, regardless of direct financial consequence to the company.</p>
          <p><strong className="bg-yellow-200">IFRS Foundation :</strong>International Financial Reporting Standards Foundation. Oversees international accounting standards and created the ISSB in 2021.</p>
          <p><strong className="bg-yellow-200">ISSB :</strong>International Sustainability Standards Board. Created by the IFRS Foundation in 2021 to develop a global baseline of sustainability-related financial disclosures for investors.</p>
          <p><strong className="bg-yellow-200">Metrics and Targets :</strong>The TCFD/ISSB pillar requiring quantitative measures and goals for tracking climate-related performance, including GHG emissions and net-zero commitments.</p>
          <p><strong className="bg-yellow-200">MTCO2e :</strong>Metric Tons of Carbon Dioxide Equivalent. The standard unit for expressing GHG emissions across all greenhouse gases normalized to their CO2 warming potential.</p>
          <p><strong className="bg-yellow-200">Net-Zero Data Public Utility :</strong>A proposed global open repository for climate transition-related data, recommended by the Climate Data Steering Committee to address persistent data gaps.</p>
          <p><strong className="bg-yellow-200">RoBERTa :</strong>A deep-learning NLP model used in the 2023 TCFD AI review to identify TCFD aligned disclosures in company reports.</p>
          <p><strong className="bg-yellow-200">SASB :</strong>Sustainability Accounting Standards Board. Developed industry-specific financial materiality standards; merged into ISSB in 2022.</p>
          <p><strong className="bg-yellow-200">Scenario Analysis :</strong>A forward-looking analytical tool used to test the resilience of a company's strategy under different future climate pathways (e.g., 1.5°C, 2°C, and 4°C warming scenarios).</p>
          <p><strong className="bg-yellow-200">Scope 1 / 2 / 3 / 4 :</strong>GHG emissions categories. Scope 1: direct. Scope 2: purchased energy. Scope 3: full value chain. Scope 4: avoided emissions (voluntary).</p>
          <p><strong className="bg-yellow-200">SICS :</strong>Sustainable Industry Classification System. SASB's 11-sector, 77-industry classification system based on sustainability risk profiles.</p>
          <p><strong className="bg-yellow-200">Stranded Assets :</strong>Assets (e.g., coal mines, oil reserves, fossil fuel infrastructure) that may lose economic value before the end of their expected useful life due to regulatory or market changes driven by the energy transition.</p>
          <p><strong className="bg-yellow-200">TCFD :</strong>Task Force on Climate-Related Financial Disclosures. A framework created by the FSB in 2015 for voluntary, consistent climate risk disclosure; now transitioning to ISSB oversight.</p>
        </div>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-teal-700 border-t border-gray-200 pt-6">Credits and Sources</h2>
        <p>This guide was compiled from the following sources:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Lecture slides: Professor Hongping Tan, Desautels Faculty of Management, McGill University. Sessions 4 & 5: Sustainability Reporting Standards and TCFD.</li>
          <li>IFRS Foundation. IFRS S1 General Requirements for Disclosure of Sustainability-related Financial Information. IFRS Foundation, 2023.</li>
          <li>IFRS Foundation. IFRS S2 Climate-related Disclosures. IFRS Foundation, 2023.</li>
          <li>Global Reporting Initiative. GRI Universal Standards 2021. globalreporting.org.</li>
          <li>SASB Standards. Materiality Map and Industry Standards. sasb.org (now ifrs.org/sasb).</li>
          <li>European Financial Reporting Advisory Group (EFRAG). European Sustainability Reporting Standards (ESRS). efrag.org.</li>
          <li>Task Force on Climate-Related Financial Disclosures. Final Report: Recommendations of the Task Force on Climate-Related Financial Disclosures, 2017. Updated guidance and 2023 Status Report. fsb-tcfd.org.</li>
          <li>CDP. Guidance for Companies. cdp.net.</li>
          <li>GHG Protocol. Corporate Accounting and Reporting Standard. ghgprotocol.org.</li>
          <li>Banco Bradesco. Climate Report 2023. Available via Banco Bradesco investor relations.</li>
          <li>BHP Group. Annual Report and Sustainability Report 2024.</li>
          <li>Sasol Limited. Climate Change Report 2023.</li>
        </ul>
        <div className="text-sm italic text-gray-500 mt-6 text-center">
          <p>Prepared for academic pre-reading purposes only.</p>
          <p>Slide content © Professor Hongping Tan, McGill University. Additional explanations compiled from publicly available standards documentation.</p>
        </div>
      </section>
    </div>
  );
}
