import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { StyleSheet, Text, View } from "react-native";
import useTestResultProcessing from "../hooks/useTestResultProcessing";

// Component để hiển thị kết quả
const TestResultDisplay = ({ serverData, userSubmission }) => {
  const processedResult = useTestResultProcessing(serverData, userSubmission);

  if (!processedResult) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Test Result</Text>
      <Text style={styles.resultText}>
        You got{" "}
        <Text style={styles.highlight}>{processedResult.correctAnswers}</Text>{" "}
        questions correct out of{" "}
        <Text style={styles.highlight}>{processedResult.totalQuestion}</Text>
      </Text>
      {processedResult.questions.map((question, index) => (
        <View key={question.questionId} style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Question {index + 1}: {question.userCorrect ? "✅" : "❌"}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  title: {
    ...text.h3,
    color: Colors.teal_dark,
    marginBottom: 16,
  },
  resultText: {
    ...text.large,
    color: Colors.black,
    marginBottom: 16,
  },
  highlight: {
    color: Colors.teal_dark,
    fontWeight: "bold",
  },
  questionContainer: {
    marginBottom: 8,
  },
  questionText: {
    ...text.p,
    color: Colors.black,
  },
});
