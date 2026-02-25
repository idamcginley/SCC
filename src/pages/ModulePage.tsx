import { useParams, Navigate } from "react-router";
import { frameworks } from "@/data/frameworks";

export function ModulePage() {
  const { frameworkSlug } = useParams();
  const framework = frameworks.find((f) => f.slug === frameworkSlug);

  if (!framework) return <Navigate to="/" replace />;

  const Icon = framework.icon;

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {framework.name}
          </h1>
          <p className="text-muted-foreground">{framework.description}</p>
        </div>
      </div>
    </div>
  );
}
