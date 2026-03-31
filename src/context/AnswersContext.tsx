import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";

export interface AssessmentAnswers {
  mc: Record<string, string>; // questionId → selected letter (A/B/C/D)
  sa: Record<string, string>; // questionId → free text
}

interface AnswersContextValue {
  answers: AssessmentAnswers;
  setMcAnswer: (id: string, letter: string) => void;
  setSaAnswer: (id: string, text: string) => void;
}

const AnswersContext = createContext<AnswersContextValue | null>(null);

export function AnswersProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AssessmentAnswers>({ mc: {}, sa: {} });

  const setMcAnswer = useCallback((id: string, letter: string) => {
    setAnswers((prev) => ({
      ...prev,
      mc: { ...prev.mc, [id]: letter },
    }));
  }, []);

  const setSaAnswer = useCallback((id: string, text: string) => {
    setAnswers((prev) => ({
      ...prev,
      sa: { ...prev.sa, [id]: text },
    }));
  }, []);

  return (
    <AnswersContext.Provider value={{ answers, setMcAnswer, setSaAnswer }}>
      {children}
    </AnswersContext.Provider>
  );
}

export function useAnswers() {
  const ctx = useContext(AnswersContext);
  if (!ctx) throw new Error("useAnswers must be used inside AnswersProvider");
  return ctx;
}
