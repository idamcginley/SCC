import { Outlet } from "react-router";
import { TopNav } from "@/components/layout/TopNav";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <TopNav />
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}
