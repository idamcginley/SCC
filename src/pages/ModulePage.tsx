import { useParams, Navigate, useOutletContext } from "react-router";
import { useEffect } from "react";
import { frameworks } from "@/data/frameworks";
import { FrameworkAssessment } from "@/components/shared/FrameworkAssessment";
import type { AppLayoutContext } from "@/components/layout/AppLayout";

export function ModulePage() {
  const { frameworkSlug } = useParams();
  const framework = frameworks.find((f) => f.slug === frameworkSlug);
  const { setFullBleed } = useOutletContext<AppLayoutContext>();

  useEffect(() => {
    setFullBleed(false);
    return () => setFullBleed(false);
  }, [setFullBleed]);

  if (!framework) return <Navigate to="/" replace />;

  return <FrameworkAssessment framework={framework} />;
}
