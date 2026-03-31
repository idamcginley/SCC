import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { mcQuestions, saQuestions } from "@/data/questions";
import type { AssessmentAnswers } from "@/context/AnswersContext";

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    fontSize: 10,
    paddingTop: 48,
    paddingBottom: 56,
    paddingHorizontal: 52,
    color: "#1a2236",
    backgroundColor: "#ffffff",
  },

  // ── Report Header ─────────────────────────────────────────────────────────
  reportTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    marginBottom: 4,
    color: "#0f1d3a",
  },
  reportSubtitle: {
    fontSize: 10,
    color: "#5a6a85",
    marginBottom: 24,
  },
  dividerHeavy: {
    borderBottomWidth: 2,
    borderBottomColor: "#0f1d3a",
    marginBottom: 28,
  },

  // ── Section Header ────────────────────────────────────────────────────────
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#d4a843",
  },
  sectionBadge: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    backgroundColor: "#0f1d3a",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionBadgeGold: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#0f1d3a",
    backgroundColor: "#d4a843",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    marginRight: 8,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0f1d3a",
  },

  // ── Question Block ────────────────────────────────────────────────────────
  questionBlock: {
    marginBottom: 18,
  },
  questionRow: {
    flexDirection: "row",
    marginBottom: 5,
  },
  questionNumber: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#5a6a85",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginRight: 6,
    minWidth: 20,
  },
  questionText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a2236",
    flex: 1,
  },

  // ── MC Options ────────────────────────────────────────────────────────────
  optionRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 3,
    paddingLeft: 26,
  },
  optionLetter: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#5a6a85",
    marginRight: 5,
    minWidth: 12,
  },
  optionLetterSelected: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#0f1d3a",
    marginRight: 5,
    minWidth: 12,
  },
  optionText: {
    fontSize: 8,
    color: "#4a5568",
    flex: 1,
    lineHeight: 1.4,
  },
  optionTextSelected: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#0f1d3a",
    flex: 1,
    lineHeight: 1.4,
  },
  selectedIndicator: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: "#ffffff",
    backgroundColor: "#0f1d3a",
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: 2,
    marginLeft: 6,
  },

  // ── Short Answer Box ──────────────────────────────────────────────────────
  answerBox: {
    borderWidth: 1,
    borderColor: "#d0d8e8",
    borderRadius: 3,
    padding: 8,
    minHeight: 48,
    backgroundColor: "#f8fafc",
    marginLeft: 26,
    marginTop: 4,
  },
  answerText: {
    fontSize: 9,
    color: "#1a2236",
    lineHeight: 1.5,
  },
  emptyAnswerText: {
    fontSize: 9,
    color: "#a0aec0",
    fontStyle: "italic",
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footer: {
    position: "absolute",
    bottom: 28,
    left: 52,
    right: 52,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "#d0d8e8",
    paddingTop: 6,
  },
  footerText: {
    fontSize: 7,
    color: "#a0aec0",
  },
});

interface Props {
  answers: AssessmentAnswers;
}

export function WorkshopPdfDocument({ answers }: Props) {
  return (
    <Document
      title="The Future of Sustainability Consulting Workshop – Assessment Report"
      author="SCC Workshop"
    >
      <Page size="A4" style={styles.page}>
        {/* Report header */}
        <Text style={styles.reportTitle}>
          The Future of Sustainability Consulting Workshop
        </Text>
        <Text style={styles.reportSubtitle}>
          Assessment Report — Student Responses
        </Text>
        <View style={styles.dividerHeavy} />

        {/* Section 1 — Multiple Choice */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionBadge}>Section 1</Text>
          <Text style={styles.sectionTitle}>Multiple Choice Questions</Text>
        </View>

        {mcQuestions.map((q) => {
          const selected = answers.mc[q.id] ?? "";
          return (
            <View key={q.id} style={styles.questionBlock} wrap={false}>
              <View style={styles.questionRow}>
                <Text style={styles.questionNumber}>Q{q.number}</Text>
                <Text style={styles.questionText}>{q.text}</Text>
              </View>
              {q.options.map((opt) => {
                const isSelected = selected === opt.letter;
                return (
                  <View key={opt.letter} style={styles.optionRow}>
                    <Text style={isSelected ? styles.optionLetterSelected : styles.optionLetter}>
                      {opt.letter}.
                    </Text>
                    <Text style={isSelected ? styles.optionTextSelected : styles.optionText}>
                      {opt.text}
                    </Text>
                    {isSelected && (
                      <Text style={styles.selectedIndicator}>Selected</Text>
                    )}
                  </View>
                );
              })}
            </View>
          );
        })}

        {/* Section 2 — Short Answer */}
        <View style={[styles.sectionHeader, { marginTop: 12 }]}>
          <Text style={styles.sectionBadgeGold}>Section 2</Text>
          <Text style={styles.sectionTitle}>Short Answer Questions</Text>
        </View>

        {saQuestions.map((q) => {
          const text = answers.sa[q.id] ?? "";
          return (
            <View key={q.id} style={styles.questionBlock} wrap={false}>
              <View style={styles.questionRow}>
                <Text style={styles.questionNumber}>Q{q.number}</Text>
                <Text style={styles.questionText}>{q.text}</Text>
              </View>
              <View style={styles.answerBox}>
                {text.trim() ? (
                  <Text style={styles.answerText}>{text}</Text>
                ) : (
                  <Text style={styles.emptyAnswerText}>No answer provided.</Text>
                )}
              </View>
            </View>
          );
        })}

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            The Future of Sustainability Consulting Workshop
          </Text>
          <Text
            style={styles.footerText}
            render={({ pageNumber, totalPages }) =>
              `Page ${pageNumber} of ${totalPages}`
            }
          />
        </View>
      </Page>
    </Document>
  );
}
