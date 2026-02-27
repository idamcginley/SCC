import { useParams, Navigate, useOutletContext } from "react-router";
import { useEffect } from "react";
import { frameworks } from "@/data/frameworks";
import { Separator } from "@/components/ui/separator";
import { GriAssessment } from "@/components/gri/GriAssessment";
import type { AppLayoutContext } from "@/components/layout/AppLayout";

const frameworkOverviews: Record<string, string> = {
  gri: "The GRI Standards are the most widely used sustainability reporting framework globally, designed for a broad range of stakeholders including investors, civil society, and regulators. Built on a modular structure of Universal Standards (GRI 1, 2, 3) and Topic Standards covering environmental, social, and governance disclosures, GRI emphasizes impact materiality -- what matters to stakeholders and society. Organizations of any size or sector can apply GRI to produce comprehensive sustainability reports that demonstrate transparency and accountability.",

  issb: "The ISSB framework, comprising IFRS S1 (General Requirements) and IFRS S2 (Climate-related Disclosures), is designed primarily for investors and capital markets. Aligned with the TCFD four-pillar structure -- Governance, Strategy, Risk Management, and Metrics and Targets -- it focuses on financial materiality: how sustainability issues affect enterprise value. The ISSB aims to create a global baseline for investor-grade sustainability disclosure, making it the preferred standard for publicly listed companies seeking capital market credibility.",

  csrd: "The Corporate Sustainability Reporting Directive (CSRD) is a landmark EU regulatory framework that significantly expands the scope and depth of mandatory sustainability reporting across Europe. It introduces the concept of double materiality, requiring companies to report both how sustainability issues affect the business (financial materiality) and how the business impacts people and the environment (impact materiality). The CSRD applies to a broad range of companies including large undertakings, listed SMEs, and non-EU companies with significant EU operations.",

  esrs: "The European Sustainability Reporting Standards (ESRS) are the technical standards that operationalize the CSRD's reporting requirements. Organized into cross-cutting standards (ESRS 1 and ESRS 2, which apply to all reporting entities) and topical standards covering Environment (E1--E5), Social (S1--S4), and Governance (G1), the ESRS provide detailed disclosure requirements for each material topic. Companies conduct a materiality assessment to determine which topical standards apply, while ESRS 2 General Disclosures are always mandatory.",

  sbti: "The Science Based Targets initiative (SBTi) provides a rigorous, science-driven framework for companies to set greenhouse gas emissions reduction targets aligned with the Paris Agreement's goal of limiting warming to 1.5 degrees C. Unlike narrative reporting frameworks, SBTi focuses on quantitative target-setting across Scope 1 (direct emissions), Scope 2 (purchased energy), and Scope 3 (value chain) emissions. Companies submit targets for independent validation, ensuring credibility and alignment with climate science.",
};

export function ModulePage() {
  const { frameworkSlug } = useParams();
  const framework = frameworks.find((f) => f.slug === frameworkSlug);
  const { setFullBleed } = useOutletContext<AppLayoutContext>();

  // GRI assessment needs full-bleed layout (no padding, no max-width)
  const isGri = frameworkSlug === "gri";

  useEffect(() => {
    setFullBleed(isGri);
    return () => setFullBleed(false);
  }, [isGri, setFullBleed]);

  if (!framework) return <Navigate to="/" replace />;

  // GRI: render full assessment layout
  if (isGri) {
    return <GriAssessment />;
  }

  // All other frameworks: intro + placeholder skeleton
  const Icon = framework.icon;
  const overview = frameworkOverviews[framework.slug];

  return (
    <div>
      {/* Framework intro section */}
      <div className="mb-6">
        <div className="mb-3 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded bg-primary/8 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {framework.name}
            </h1>
            <p className="text-sm text-muted-foreground">{framework.description}</p>
          </div>
        </div>
        {overview && (
          <p className="mt-3 text-sm leading-relaxed text-foreground/75">{overview}</p>
        )}
      </div>

      <Separator className="mb-6" />

      {/* Two-panel skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded border border-dashed border-border p-8 text-center">
          <span className="inline-flex items-center rounded-sm bg-gold-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-800">
            Coming Soon
          </span>
          <p className="mt-2 text-sm text-muted-foreground">Assessment form will be available in a future phase</p>
        </div>
        <div className="rounded border border-dashed border-border p-8 text-center">
          <span className="inline-flex items-center rounded-sm bg-gold-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold-800">
            Coming Soon
          </span>
          <p className="mt-2 text-sm text-muted-foreground">Report preview will be available in a future phase</p>
        </div>
      </div>
    </div>
  );
}
