import { mcQuestions } from "@/data/questions";
import { useAnswers } from "@/context/AnswersContext";

export function MultipleChoiceSection() {
  const { answers, setMcAnswer } = useAnswers();

  return (
    <div className="space-y-6">
      {mcQuestions.map((q) => {
        const selected = answers.mc[q.id] ?? "";

        return (
          <div
            key={q.id}
            className="rounded-lg border border-border bg-card shadow-sm overflow-hidden"
          >
            {/* Question header */}
            <div className="flex items-start gap-3 border-b border-border bg-secondary/30 px-5 py-4">
              <div className="flex shrink-0 flex-col items-center gap-1">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold text-primary-foreground">
                  Q{q.number}
                </span>
                <span className="rounded-sm bg-primary/10 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-primary whitespace-nowrap">
                  MC
                </span>
              </div>
              <p className="text-sm font-semibold leading-snug text-foreground mt-0.5">
                {q.text}
              </p>
            </div>

            {/* Answer options */}
            <div className="divide-y divide-border/60">
              {q.options.map((opt) => {
                const isSelected = selected === opt.letter;
                return (
                  <button
                    key={opt.letter}
                    type="button"
                    onClick={() => setMcAnswer(q.id, opt.letter)}
                    className={[
                      "flex w-full items-start gap-3 px-5 py-3.5 text-left transition-colors duration-150",
                      isSelected
                        ? "bg-primary/8 text-foreground"
                        : "hover:bg-secondary/50 text-foreground",
                    ].join(" ")}
                  >
                    {/* Bubble */}
                    <span
                      className={[
                        "mt-px flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-[11px] font-bold transition-all duration-150",
                        isSelected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background text-muted-foreground",
                      ].join(" ")}
                    >
                      {opt.letter}
                    </span>
                    <span className="text-sm leading-relaxed">{opt.text}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
