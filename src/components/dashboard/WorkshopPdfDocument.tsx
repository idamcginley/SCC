import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import { frameworks } from "@/data/frameworks";
import type { FrameworkAnswers } from "@/context/AnswersContext";

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

  // ── Cover / Report Header ─────────────────────────────────────────────────
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

  // ── Per-Framework Section ─────────────────────────────────────────────────
  frameworkSection: {
    marginBottom: 28,
  },
  frameworkHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#d4a843",
  },
  frameworkBadge: {
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
  frameworkTitle: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#0f1d3a",
  },

  // ── Q&A Pair ──────────────────────────────────────────────────────────────
  qaPair: {
    marginBottom: 12,
  },
  questionRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  questionLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#5a6a85",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginRight: 6,
  },
  questionText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: "#1a2236",
    flex: 1,
  },
  sublabelText: {
    fontSize: 8,
    color: "#7a8ba8",
    marginBottom: 4,
    marginLeft: 0,
    fontStyle: "italic",
  },
  answerBox: {
    borderWidth: 1,
    borderColor: "#d0d8e8",
    borderRadius: 3,
    padding: 8,
    minHeight: 32,
    backgroundColor: "#f8fafc",
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
  answers: Record<string, FrameworkAnswers>;
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
          Assessment Report — Sustainability Reporting Frameworks
        </Text>
        <View style={styles.dividerHeavy} />

        {/* One section per framework */}
        {frameworks.map((fw) => {
          const fwAnswers = answers[fw.slug] ?? { included: "", excluded: "" };
          const box1 = fw.inputBoxes[0];
          const box2 = fw.inputBoxes[1];

          return (
            <View key={fw.slug} style={styles.frameworkSection} wrap={false}>
              {/* Framework heading row */}
              <View style={styles.frameworkHeader}>
                <Text style={styles.frameworkBadge}>{fw.shortName}</Text>
                <Text style={styles.frameworkTitle}>{fw.sectionHeader}</Text>
              </View>

              {/* Q1 — included */}
              <View style={styles.qaPair}>
                <View style={styles.questionRow}>
                  <Text style={styles.questionLabel}>Q1</Text>
                  <Text style={styles.questionText}>{box1.label}</Text>
                </View>
                <Text style={styles.sublabelText}>{box1.sublabel}</Text>
                <View style={styles.answerBox}>
                  {fwAnswers.included.trim() ? (
                    <Text style={styles.answerText}>{fwAnswers.included}</Text>
                  ) : (
                    <Text style={styles.emptyAnswerText}>No answer provided.</Text>
                  )}
                </View>
              </View>

              {/* Q2 — excluded */}
              <View style={styles.qaPair}>
                <View style={styles.questionRow}>
                  <Text style={styles.questionLabel}>Q2</Text>
                  <Text style={styles.questionText}>{box2.label}</Text>
                </View>
                <Text style={styles.sublabelText}>{box2.sublabel}</Text>
                <View style={styles.answerBox}>
                  {fwAnswers.excluded.trim() ? (
                    <Text style={styles.answerText}>{fwAnswers.excluded}</Text>
                  ) : (
                    <Text style={styles.emptyAnswerText}>No answer provided.</Text>
                  )}
                </View>
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
