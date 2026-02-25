import { Link } from "react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import type { Framework } from "@/data/frameworks";

interface FrameworkCardProps {
  framework: Framework;
}

export function FrameworkCard({ framework }: FrameworkCardProps) {
  const Icon = framework.icon;
  return (
    <Link to={`/module/${framework.slug}`} className="group block">
      <Card className="h-full transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg">
        <CardHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <CardTitle>{framework.name}</CardTitle>
          <CardDescription>{framework.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
