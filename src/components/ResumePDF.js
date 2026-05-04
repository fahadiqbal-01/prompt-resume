import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";

const colors = {
  blue: "#0F52BA",
  dark: "#171717",
  grey: "#404040",
  lightGrey: "#525252",
  white: "#FFFFFF",
  border: "#E5E5E5",
};

const styles = StyleSheet.create({
  page: {
    padding: 0,
    backgroundColor: colors.white,
    fontFamily: "Helvetica",
    flexDirection: "column",
  },
  header: {
    backgroundColor: colors.blue,
    paddingTop: 30, 
    paddingBottom: 25, 
    textAlign: "center",
    color: colors.white,
  },
  name: {
    fontSize: 24, 
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 4, 
  },
  role: {
    fontSize: 12,
    fontWeight: "semibold",
  },
  contact: {
    fontSize: 9, 
    textAlign: "center",
    color: colors.lightGrey,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  body: {
    paddingHorizontal: 40,
    paddingVertical: 5, 
  },
  sectionHeaderContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    marginBottom: 10,
  },
  sectionHeaderText: {
    fontSize: 10.5, 
    fontWeight: "bold",
    textTransform: "uppercase",
    color: colors.dark,
    marginRight: 10,
  },
  sectionLine: {
    flexGrow: 1,
    height: 1, 
    backgroundColor: colors.blue,
  },
  text: {
    fontSize: 10, 
    color: colors.grey,
    lineHeight: 1.4,
    textAlign: "justify",
  },
  expItem: {
    marginBottom: 14, 
  },
  expHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  expRole: {
    fontSize: 11,
    fontWeight: "bold",
    color: colors.dark,
  },
  expDuration: {
    fontSize: 9, 
    color: colors.dark,
  },
  expCompany: {
    fontSize: 9, 
    color: colors.blue,
    marginBottom: 4, 
  },
  bulletPoint: {
    flexDirection: "row",
    marginBottom: 3, 
    paddingLeft: 10,
  },
  bullet: {
    width: 10, 
    fontSize: 10,
  },
  bulletText: {
    flex: 1,
    fontSize: 10, 
    color: colors.grey,
    lineHeight: 1.3, 
  },

  skillItem: {
    width: "50%",
    flexDirection: "row",
    marginBottom: 3, 
  },
});

export const ResumePDF = ({ data, isAI }) => {
  const summary = isAI ? data.aiSummary : data.summary;
  const experience = (isAI ? data.aiExperience : data.experience) || [];
  const skills = isAI && data.aiSkills ? data.aiSkills : data.skills || [];
  const languages =
    isAI && data.aiLanguages ? data.aiLanguages : data.languages || [];
  const certs =
    isAI && data.aiCertifications
      ? data.aiCertifications
      : data.certifications || [];
  const education = data.education || [];

  return (
    <Document title={`${data.name || "Resume"}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.name || "Your Name"}</Text>
          <Text style={styles.role}>{data.targetRole || "Target Role"}</Text>
        </View>

        <View style={styles.contact}>
          <Text>
            {data.email} {data.phone ? ` | ${data.phone}` : ""}
          </Text>
        </View>

        <View style={styles.body}>
          {summary && (
            <View>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderText}>Summary</Text>
                <View style={styles.sectionLine} />
              </View>
              <Text style={styles.text}>{summary}</Text>
            </View>
          )}

          {experience.length > 0 && (
            <View>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderText}>Work Experience</Text>
                <View style={styles.sectionLine} />
              </View>
              {experience.map((exp, i) => (
                <View key={i} style={styles.expItem}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expRole}>{exp.role}</Text>
                    <Text style={styles.expDuration}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.expCompany}>{exp.company}</Text>
                  {exp.description
                    ?.split("\n")
                    .filter((l) => l.trim())
                    .map((line, idx) => (
                      <View key={idx} style={styles.bulletPoint}>
                        <Text style={styles.bullet}>•</Text>
                        <Text style={styles.bulletText}>
                          {line.replace(/^[-•]\s*/, "")}
                        </Text>
                      </View>
                    ))}
                </View>
              ))}
            </View>
          )}

          {education.length > 0 && (
            <View>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderText}>Education</Text>
                <View style={styles.sectionLine} />
              </View>
              {education.map((ed, i) => (
                <View key={i} style={{ marginBottom: 5 }}>
                  <View style={styles.expHeader}>
                    <Text style={styles.expRole}>{ed.degree}</Text>
                    <Text style={styles.expDuration}>{ed.year}</Text>
                  </View>
                  <Text style={styles.text}>{ed.school}</Text>
                </View>
              ))}
            </View>
          )}

          {languages.length > 0 && (
            <View>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderText}>
                  Language Proficiency
                </Text>
                <View style={styles.sectionLine} />
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {languages.map((l, i) => (
                  <View
                    key={i}
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      marginBottom: 2,
                    }}
                  >
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>
                      <Text style={{ fontWeight: "bold" }}>{l.language}:</Text>{" "}
                      {l.level}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {skills.length > 0 && (
            <View>
              <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeaderText}>Key Skills</Text>
                <View style={styles.sectionLine} />
              </View>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {skills.map((s, i) => (
                  <View
                    key={i}
                    style={{
                      width: "50%",
                      flexDirection: "row",
                      marginBottom: 2,
                    }}
                  >
                    <Text style={styles.bullet}>•</Text>
                    <Text style={styles.bulletText}>{s}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </View>
      </Page>
    </Document>
  );
};
