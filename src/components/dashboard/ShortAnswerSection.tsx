import { useRef, useEffect } from "react";
import { saQuestions } from "@/data/questions";
import { useAnswers } from "@/context/AnswersContext";

function AutoResizeTextarea({
  value,
  onChange,
  placeholder,
  id,
}: {
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  id: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.style.height = "auto";
      ref.current.style.height = `${ref.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <textarea
      ref={ref}
      id={id}
      rows={4}
      className="w-full resize-none overflow-hidden rounded border border-border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/25 transition-shadow"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}

export function ShortAnswerSection() {
  const { answers, setSaAnswer } = useAnswers();

  return (
    <div className="space-y-6">
      {saQuestions.map((q) => {
        const value = answers.sa[q.id] ?? "";

        return (
          <div
            key={q.id}
            className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
          >
            {/* Question header */}
            <div className="flex items-start gap-3 border-b border-border bg-secondary/30 px-5 py-4">
              <div className="flex shrink-0 flex-col items-center gap-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gold-500 text-[11px] font-bold text-white">
                  Q{q.number}
                </span>
                <span className="rounded-sm bg-gold-100 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold-800 whitespace-nowrap">
                  SA
                </span>
              </div>
              <p className="text-sm font-semibold leading-snug text-foreground mt-0.5">
                {q.text}
              </p>
            </div>

            {/* Answer area */}
            <div className="px-5 py-4">
              <AutoResizeTextarea
                id={`sa-${q.id}`}
                value={value}
                onChange={(val) => setSaAnswer(q.id, val)}
                placeholder="Your answer…"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
