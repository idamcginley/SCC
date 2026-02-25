import {
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import {
  griDisclosures,
  griSections,
  topicStandardGroups,
  codeToFieldKey,
  type GriFormData,
} from "@/schemas/gri";

// ---------------------------------------------------------------------------
// Font registration -- static TTF files (no variable/WOFF2 for @react-pdf)
// ---------------------------------------------------------------------------

Font.register({
  family: "Inter",
  fonts: [
    { src: "/fonts/Inter-Regular.ttf", fontWeight: 400 },
    { src: "/fonts/Inter-SemiBold.ttf", fontWeight: 600 },
    { src: "/fonts/Inter-Bold.ttf", fontWeight: 700 },
  ],
});

// ---------------------------------------------------------------------------
// Styles
// ---------------------------------------------------------------------------

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Inter",
    fontSize: 10,
    lineHeight: 1.5,
  },
  coverPage: {
    padding: 60,
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Inter",
  },
  coverTitle: {
    fontSize: 32,
    fontWeight: 700,
    marginBottom: 16,
    color: "#2d5016",
    textAlign: "center",
  },
  coverOrg: {
    fontSize: 18,
    fontWeight: 600,
    marginBottom: 8,
    textAlign: "center",
    color: "#374151",
  },
  coverPeriod: {
    fontSize: 14,
    marginBottom: 4,
    textAlign: "center",
    color: "#6b7280",
  },
  coverDate: {
    fontSize: 12,
    color: "#666",
    marginBottom: 40,
    textAlign: "center",
  },
  coverBranding: {
    fontSize: 8,
    color: "#999",
    position: "absolute",
    bottom: 40,
    textAlign: "center",
  },
  header: {
    fontSize: 8,
    color: "#666",
    textAlign: "right",
    marginBottom: 20,
  },
  footer: {
    fontSize: 8,
    color: "#666",
    textAlign: "center",
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 6,
    color: "#111827",
  },
  subsectionTitle: {
    fontSize: 12,
    fontWeight: 600,
    marginTop: 14,
    marginBottom: 6,
    color: "#374151",
  },
  disclosure: {
    marginBottom: 10,
  },
  disclosureCode: {
    fontSize: 8,
    color: "#9ca3af",
    marginBottom: 2,
  },
  disclosureTitle: {
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 3,
    color: "#111827",
  },
  disclosureValue: {
    fontSize: 10,
    color: "#374151",
  },
  notReported: {
    fontSize: 10,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  warningBanner: {
    backgroundColor: "#fef3c7",
    padding: 10,
    marginBottom: 16,
    borderRadius: 4,
  },
  warningText: {
    fontSize: 9,
    color: "#92400e",
  },
  contentIndexTitle: {
    fontSize: 16,
    fontWeight: 700,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingBottom: 6,
    color: "#111827",
  },
  contentIndexTable: {
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 0.5,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 4,
    alignItems: "center",
  },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
    paddingBottom: 6,
    marginBottom: 4,
  },
  tableHeaderText: {
    fontSize: 9,
    fontWeight: 600,
    color: "#374151",
  },
  tableCell: {
    fontSize: 9,
    flex: 1,
    color: "#374151",
  },
  tableCellNarrow: {
    fontSize: 9,
    width: 80,
    color: "#374151",
  },
  tableCellStandard: {
    fontSize: 9,
    width: 120,
    color: "#374151",
  },
  statusReported: {
    fontSize: 9,
    color: "#166534",
    fontWeight: 600,
  },
  statusNotReported: {
    fontSize: 9,
    color: "#9ca3af",
    fontStyle: "italic",
  },
  materialTopicList: {
    marginTop: 4,
    marginBottom: 8,
  },
  materialTopicItem: {
    fontSize: 10,
    color: "#374151",
    marginBottom: 2,
    paddingLeft: 12,
  },
});

// ---------------------------------------------------------------------------
// GRI 2 subsection groupings (mirroring GriReportPreview structure)
// ---------------------------------------------------------------------------

const gri2Subsections = [
  { name: "The Organization", range: ["2-1", "2-2", "2-3", "2-4", "2-5"] },
  { name: "Activities and Workers", range: ["2-6", "2-7", "2-8"] },
  {
    name: "Governance",
    range: [
      "2-9", "2-10", "2-11", "2-12", "2-13", "2-14",
      "2-15", "2-16", "2-17", "2-18", "2-19", "2-20", "2-21",
    ],
  },
  {
    name: "Strategy, Policies and Practices",
    range: ["2-22", "2-23", "2-24", "2-25", "2-26", "2-27", "2-28"],
  },
  { name: "Stakeholder Engagement", range: ["2-29", "2-30"] },
];

// ---------------------------------------------------------------------------
// Helper: get nested value from form data
// ---------------------------------------------------------------------------

function getNestedValue(
  data: Record<string, unknown>,
  path: string
): unknown {
  const parts = path.split(".");
  let current: unknown = data;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

function isValueFilled(data: GriFormData, path: string): boolean {
  const val = getNestedValue(data as unknown as Record<string, unknown>, path);
  return val !== undefined && val !== null && val !== "" && val !== false;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

interface GriPdfDocumentProps {
  data: GriFormData;
  materialTopics: string[];
  validationErrors?: string[];
}

// ---------------------------------------------------------------------------
// Filtered disclosure arrays
// ---------------------------------------------------------------------------

const gri2Disclosures = griDisclosures.filter((d) => d.section === "gri2");
const gri3Disclosures = griDisclosures.filter((d) => d.section === "gri3");

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CoverPage({ data }: { data: GriFormData }) {
  const orgName =
    (data.gri2 as Record<string, unknown>)?.[codeToFieldKey("2-1")];
  const reportingPeriod =
    (data.gri2 as Record<string, unknown>)?.[codeToFieldKey("2-3")];

  const displayOrg =
    orgName && orgName !== "" ? String(orgName) : "Organization Name";
  const displayPeriod =
    reportingPeriod && reportingPeriod !== ""
      ? String(reportingPeriod)
      : "Reporting Period";
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Page size="A4" style={styles.coverPage}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.coverTitle}>GRI Sustainability Report</Text>
        <Text style={styles.coverOrg}>{displayOrg}</Text>
        <Text style={styles.coverPeriod}>{displayPeriod}</Text>
        <Text style={styles.coverDate}>{dateStr}</Text>
      </View>
      <Text style={styles.coverBranding}>
        Generated with Sustainability Assessment Platform
      </Text>
    </Page>
  );
}

function DisclosureItem({
  code,
  label,
  value,
  unit,
}: {
  code: string;
  label: string;
  value: unknown;
  unit?: string;
}) {
  const hasValue =
    value !== undefined && value !== null && value !== "" && value !== false;

  return (
    <View style={styles.disclosure} wrap={false}>
      <Text style={styles.disclosureCode}>GRI {code}</Text>
      <Text style={styles.disclosureTitle}>{label}</Text>
      {hasValue ? (
        <Text style={styles.disclosureValue}>
          {String(value)}
          {unit ? ` ${unit}` : ""}
        </Text>
      ) : (
        <Text style={styles.notReported}>Not reported</Text>
      )}
    </View>
  );
}

function PageHeader() {
  return <Text style={styles.header}>GRI Sustainability Report</Text>;
}

function PageFooter() {
  return (
    <Text
      style={styles.footer}
      render={({ pageNumber }) => `Page ${pageNumber}`}
      fixed
    />
  );
}

// ---------------------------------------------------------------------------
// Main Document
// ---------------------------------------------------------------------------

export function GriPdfDocument({
  data,
  materialTopics,
  validationErrors,
}: GriPdfDocumentProps) {
  // Build content index entries as we go
  const contentIndexEntries: {
    standard: string;
    code: string;
    label: string;
    reported: boolean;
  }[] = [];

  // Add GRI 2 entries
  for (const d of gri2Disclosures) {
    const fieldPath = `gri2.${codeToFieldKey(d.code)}`;
    contentIndexEntries.push({
      standard: "GRI 2: General Disclosures 2021",
      code: d.code,
      label: d.label,
      reported: isValueFilled(data, fieldPath),
    });
  }

  // Add GRI 3 entries
  for (const d of gri3Disclosures) {
    const fieldPath = `gri3.${codeToFieldKey(d.code)}`;
    contentIndexEntries.push({
      standard: "GRI 3: Material Topics 2021",
      code: d.code,
      label: d.label,
      reported: isValueFilled(data, fieldPath),
    });
  }

  // Add Topic Standard entries (only for material topics)
  const sortedTopics = [...materialTopics].sort();
  for (const topicCode of sortedTopics) {
    const meta = griSections.find((s) => s.id === topicCode);
    const topicDisclosures = griDisclosures.filter(
      (d) => d.section === topicCode
    );
    for (const d of topicDisclosures) {
      const fieldPath = `topics.${topicCode}.${codeToFieldKey(d.code)}`;
      contentIndexEntries.push({
        standard: meta?.name ?? `GRI ${topicCode}`,
        code: d.code,
        label: d.label,
        reported: isValueFilled(data, fieldPath),
      });
    }
  }

  return (
    <Document
      title="GRI Sustainability Report"
      author="Sustainability Assessment Platform"
    >
      {/* Cover Page */}
      <CoverPage data={data} />

      {/* Report Body */}
      <Page size="A4" style={styles.page}>
        <PageHeader />
        <PageFooter />

        {/* Validation warning banner */}
        {validationErrors && validationErrors.length > 0 && (
          <View style={styles.warningBanner}>
            <Text style={styles.warningText}>
              This report contains incomplete or invalid sections:{" "}
              {validationErrors.join(", ")}
            </Text>
          </View>
        )}

        {/* GRI 2 - General Disclosures */}
        <Text style={styles.sectionTitle}>GRI 2 - General Disclosures</Text>

        {gri2Subsections.map((sub) => {
          const disclosures = gri2Disclosures.filter((d) =>
            sub.range.includes(d.code)
          );
          return (
            <View key={sub.name}>
              <Text style={styles.subsectionTitle}>{sub.name}</Text>
              {disclosures.map((d) => {
                const fieldPath = `gri2.${codeToFieldKey(d.code)}`;
                const val = getNestedValue(
                  data as unknown as Record<string, unknown>,
                  fieldPath
                );
                return (
                  <DisclosureItem
                    key={d.code}
                    code={d.code}
                    label={d.label}
                    value={val}
                    unit={d.unit}
                  />
                );
              })}
            </View>
          );
        })}
      </Page>

      {/* GRI 3 - Material Topics */}
      <Page size="A4" style={styles.page}>
        <PageHeader />
        <PageFooter />

        <Text style={styles.sectionTitle}>GRI 3 - Material Topics</Text>

        {gri3Disclosures.map((d) => {
          const fieldPath = `gri3.${codeToFieldKey(d.code)}`;
          const val = getNestedValue(
            data as unknown as Record<string, unknown>,
            fieldPath
          );
          return (
            <DisclosureItem
              key={d.code}
              code={d.code}
              label={d.label}
              value={val}
              unit={d.unit}
            />
          );
        })}

        {/* Material topics list */}
        {materialTopics.length > 0 && (
          <View style={styles.materialTopicList}>
            <Text style={styles.subsectionTitle}>
              Selected Material Topics
            </Text>
            {sortedTopics.map((topicCode) => {
              const meta = griSections.find((s) => s.id === topicCode);
              return (
                <Text key={topicCode} style={styles.materialTopicItem}>
                  {"\u2022"} {meta?.name ?? `GRI ${topicCode}`}
                </Text>
              );
            })}
          </View>
        )}
      </Page>

      {/* Topic Standards (only for material topics) */}
      {sortedTopics.length > 0 && (
        <Page size="A4" style={styles.page}>
          <PageHeader />
          <PageFooter />

          <Text style={styles.sectionTitle}>Topic Standards</Text>

          {topicStandardGroups.map((group) => {
            const activeInGroup = group.standards.filter((code) =>
              materialTopics.includes(code)
            );
            if (activeInGroup.length === 0) return null;

            return (
              <View key={group.name}>
                <Text style={styles.subsectionTitle}>{group.name}</Text>
                {activeInGroup.map((topicCode) => {
                  const meta = griSections.find((s) => s.id === topicCode);
                  const topicDisclosures = griDisclosures.filter(
                    (d) => d.section === topicCode
                  );
                  return (
                    <View key={topicCode}>
                      <Text
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          marginTop: 10,
                          marginBottom: 6,
                          color: "#1f2937",
                        }}
                      >
                        {meta?.name ?? `GRI ${topicCode}`}
                      </Text>
                      {topicDisclosures.map((d) => {
                        const fieldPath = `topics.${topicCode}.${codeToFieldKey(d.code)}`;
                        const val = getNestedValue(
                          data as unknown as Record<string, unknown>,
                          fieldPath
                        );
                        return (
                          <DisclosureItem
                            key={d.code}
                            code={d.code}
                            label={d.label}
                            value={val}
                            unit={d.unit}
                          />
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            );
          })}
        </Page>
      )}

      {/* GRI Content Index */}
      <Page size="A4" style={styles.page}>
        <PageHeader />
        <PageFooter />

        <Text style={styles.contentIndexTitle}>GRI Content Index</Text>

        <View style={styles.contentIndexTable}>
          {/* Table Header */}
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { width: 120 }]}>
              GRI Standard
            </Text>
            <Text style={[styles.tableHeaderText, { width: 80 }]}>
              Disclosure
            </Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Title</Text>
            <Text style={[styles.tableHeaderText, { width: 80, textAlign: "right" }]}>
              Status
            </Text>
          </View>

          {/* Table Rows */}
          {contentIndexEntries.map((entry, index) => (
            <View key={`${entry.code}-${index}`} style={styles.tableRow} wrap={false}>
              <Text style={styles.tableCellStandard}>{entry.standard}</Text>
              <Text style={styles.tableCellNarrow}>GRI {entry.code}</Text>
              <Text style={styles.tableCell}>{entry.label}</Text>
              {entry.reported ? (
                <Text style={[styles.statusReported, { width: 80, textAlign: "right" }]}>
                  Reported
                </Text>
              ) : (
                <Text style={[styles.statusNotReported, { width: 80, textAlign: "right" }]}>
                  Not reported
                </Text>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}
