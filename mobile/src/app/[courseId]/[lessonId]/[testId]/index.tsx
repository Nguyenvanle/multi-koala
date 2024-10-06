import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTestDetails } from "@/src/feature/test/hooks/useTestDetails";
import { useGlobalSearchParams } from "expo-router";
import {
  AnswerDetails,
  QuestionDetails,
  TestDetails,
} from "@/src/feature/test/types/test";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";

const Test = () => {
  const { lessonId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const { testDetails, errorMessageTest, loadingTest } =
    useTestDetails(lessonIdString);

  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleAnswerSelect = (questionId, answerId) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerId,
    }));
  };

  const handleSubmit = () => {
    console.log("Selected answers:", selectedAnswers);
    // Implement your submit logic here
  };

  const renderAnswerItem = ({
    item,
    questionId,
  }: {
    item: AnswerDetails;
    questionId: string;
  }) => {
    return (
      <TouchableOpacity
        key={item.answerId}
        style={[
          styles.answerButton,
          selectedAnswers[questionId] === item.answerId &&
            styles.selectedAnswer,
        ]}
        onPress={() => handleAnswerSelect(questionId, item.answerId)}
      >
        <Text
          style={[
            styles.answerText,
            selectedAnswers[questionId] === item.answerId &&
              styles.selectedAnswerText,
          ]}
        >
          {item.answerDescription}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderQuestionItem = ({ item }: { item: QuestionDetails }) => {
    return (
      <View style={{ paddingBottom: 32 }}>
        <Text style={styles.questionText}>{item.questionDescription}</Text>
        <FlatList
          data={item.answers}
          renderItem={({ item: answerItem }) =>
            renderAnswerItem({ item: answerItem, questionId: item.questionId })
          }
          keyExtractor={(answer) => answer.answerId.toString()}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const renderTestItem = ({ item }: { item: TestDetails }) => {
    return (
      <View style={styles.container}>
        <FlatList
          data={item.questions}
          renderItem={renderQuestionItem}
          keyExtractor={(question) => question.questionId.toString()}
          scrollEnabled={false}
        />
      </View>
    );
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      {loadingTest ? (
        <ActivityIndicator size="large" color={Colors.teal_dark} />
      ) : testDetails && testDetails.length > 0 ? (
        <View>
          <FlatList
            data={testDetails}
            renderItem={renderTestItem}
            keyExtractor={(item) => item.testId.toString()}
            scrollEnabled={false}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={{ ...text.p, color: Colors.red }}>No tests available</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  testDescription: {
    ...text.h2,
    marginBottom: 8,
    color: Colors.super_teal_dark,
    fontWeight: "bold",
  },
  questionText: {
    paddingBottom: 8,
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "600",
    flexShrink: 1,
  },
  answerButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.dark_grey,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: Colors.white,
  },
  selectedAnswer: {
    backgroundColor: Colors.teal_dark,
  },
  answerText: {
    ...text.p,
    color: Colors.black,
    fontWeight: "300",
  },
  selectedAnswerText: {
    ...text.p,
    color: Colors.white,
  },
  submitButton: {
    backgroundColor: Colors.teal_dark,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 32,
  },
  submitButtonText: {
    ...text.large,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default Test;
