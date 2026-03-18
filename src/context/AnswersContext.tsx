import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export interface FrameworkAnswers {
  included: string;
  excluded: string;
}

interface AnswersContextValue {
  answers: Record<string, FrameworkAnswers>;
  setAnswer: (slug: string, field: keyof FrameworkAnswers, value: string) => void;
}

const AnswersContext = createContext<AnswersContextValue | null>(null);

export function AnswersProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<Record<string, FrameworkAnswers>>({});

  const setAnswer = useCallback(
    (slug: string, field: keyof FrameworkAnswers, value: string) => {
      setAnswers((prev) => {
        const existing = prev[slug] ?? { included: "", excluded: "" };
        return { ...prev, [slug]: { ...existing, [field]: value } };
      });
    },
    []
  );

  return (
    <AnswersContext.Provider value={{ answers, setAnswer }}>
      {children}
    </AnswersContext.Provider>
  );
}

export function useAnswers() {
  const ctx = useContext(AnswersContext);
  if (!ctx) throw new Error("useAnswers must be used inside AnswersProvider");
  return ctx;
}
