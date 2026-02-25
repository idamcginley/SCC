import { useState, useCallback } from "react";
import { Outlet } from "react-router";
import { TopNav } from "@/components/layout/TopNav";

export interface AppLayoutContext {
  setFullBleed: (value: boolean) => void;
}

export function AppLayout() {
  const [fullBleed, setFullBleed] = useState(false);

  const handleSetFullBleed = useCallback((value: boolean) => {
    setFullBleed(value);
  }, []);

  const context: AppLayoutContext = { setFullBleed: handleSetFullBleed };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <TopNav />
      <main
        className={
          fullBleed ? "" : "mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8"
        }
      >
        <Outlet context={context} />
      </main>
    </div>
  );
}
