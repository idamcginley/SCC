import { useLocation, useParams, Link } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { frameworks } from "@/data/frameworks";

export function AppBreadcrumbs() {
  const location = useLocation();
  const { frameworkSlug } = useParams();

  if (location.pathname === "/") return null;

  const framework = frameworks.find((f) => f.slug === frameworkSlug);

  return (
    <Breadcrumb>
      <BreadcrumbList className="text-primary-foreground/60">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="text-primary-foreground/60 hover:text-primary-foreground">
            <Link to="/">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {framework && (
          <>
            <BreadcrumbSeparator className="text-primary-foreground/40" />
            <BreadcrumbItem>
              <BreadcrumbPage className="text-primary-foreground/90 font-medium">{framework.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

