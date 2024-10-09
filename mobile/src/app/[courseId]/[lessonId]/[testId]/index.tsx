import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { QuestionDetails, TestDetails } from "@/src/feature/test/types/test";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import useTestResult from "@/src/feature/test-result/hooks/useTestResult";
import { useTestDetails } from "@/src/feature/test/hooks/useTestDetails";

const Test = () => {
  const { lessonId, testId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const testIdString = Array.isArray(testId) ? testId[0] : testId;

  const { testDetails, errorMessageTest, loadingTest } = useTestDetails(
    lessonIdString,
    testIdString
  ); // Lấy tất cả các bài test
  const [selectedTest, setSelectedTest] = useState<TestDetails | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const {
    loadingResult,
    errorResult,
    errorResultMessage,
    setSelectedAnswerList,
    testResult,
    onSubmit,
  } = useTestResult(selectedTest?.testId); // Truyền testId của bài test đã chọn

  // const handleAnswerSelect = useCallback(
  //   (questionId, answerId) => {
  //     setSelectedAnswers((prevAnswers) => ({
  //       ...prevAnswers,
  //       [questionId]: answerId,
  //     }));

  //     setSelectedAnswerList((prevList) => {
  //       const existingQuestionIndex = prevList.findIndex(
  //         (item) => item.questionId === questionId
  //       );

  //       if (existingQuestionIndex !== -1) {
  //         return prevList.map((item) =>
  //           item.questionId === questionId
  //             ? { ...item, selectedAnswerId: answerId }
  //             : item
  //         );
  //       } else {
  //         return [
  //           ...prevList,
  //           {
  //             questionId,
  //             selectedAnswerId: answerId,
  //           },
  //         ];
  //       }
  //     });
  //   },
  //   [setSelectedAnswerList]
  // );

  // const renderAnswerItem = useCallback(
  //   ({ item, questionId }) => (
  //     <TouchableOpacity
  //       key={item.answerId}
  //       style={[
  //         styles.answerButton,
  //         selectedAnswers[questionId] === item.answerId &&
  //           styles.selectedAnswer,
  //       ]}
  //       onPress={() => handleAnswerSelect(questionId, item.answerId)}
  //     >
  //       <Text
  //         style={[
  //           styles.answerText,
  //           selectedAnswers[questionId] === item.answerId &&
  //             styles.selectedAnswerText,
  //         ]}
  //       >
  //         {item.answerDescription}
  //       </Text>
  //     </TouchableOpacity>
  //   ),
  //   [selectedAnswers, handleAnswerSelect]
  // );

  // const renderQuestionItem = useCallback(
  //   ({ item }: { item: QuestionDetails }) => (
  //     <View style={styles.questionContainer}>
  //       <Text style={styles.questionText}>{item.questionDescription}</Text>
  //       <FlatList
  //         data={item.answers}
  //         renderItem={({ item: answerItem }) =>
  //           renderAnswerItem({ item: answerItem, questionId: item.questionId })
  //         }
  //         keyExtractor={(answer) => answer.answerId.toString()}
  //         scrollEnabled={false}
  //       />
  //     </View>
  //   ),
  //   [renderAnswerItem]
  // );

  const renderTestItem = useCallback(
    ({ item }: { item: TestDetails }) => (
      <TouchableOpacity
        style={styles.testButton}
        onPress={() => setSelectedTest(item)} // Cập nhật selectedTest khi nhấn
      >
        <Text style={styles.testButtonText}>{item.testDescription}</Text>
      </TouchableOpacity>
    ),
    []
  );

  if (loadingTest) {
    return <ActivityIndicator size="large" color={Colors.teal_dark} />;
  }

  if (errorMessageTest) {
    return <Text style={styles.errorText}>{errorMessageTest}</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.testListContainer}
      >
        <FlatList
          data={testDetails}
          renderItem={renderTestItem}
          keyExtractor={(item) => item.testId}
          horizontal
          scrollEnabled={true}
          showsHorizontalScrollIndicator={false}
        />
      </ScrollView>

      {/* {selectedTest && (
        <View>
          <Text style={styles.testDescription}>
            Test ID: {selectedTest.testId}
          </Text>
          <Text style={styles.testDescription}>
            {selectedTest.testDescription}
          </Text>
          <FlatList
            data={selectedTest.questions}
            renderItem={renderQuestionItem}
            keyExtractor={(item) => item.questionId.toString()}
            scrollEnabled={false}
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={onSubmit}
            disabled={loadingResult}
          >
            {loadingResult ? (
              <ActivityIndicator size="small" color={Colors.white} />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
          {errorResult && (
            <Text style={styles.errorText}>{errorResultMessage}</Text>
          )}
          {testResult && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultText}>
                Correct answers: {testResult.correctAnswers}
              </Text>
              <Text style={styles.resultText}>
                Total questions: {testResult.totalQuestion}
              </Text>
            </View>
          )}
        </View>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.background,
  },
  testListContainer: {
    marginBottom: 16,
    paddingVertical: 8,
  },
  testButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 8,
    marginRight: 8, // Thay đổi chiều rộng để tạo khoảng cách giữa các button
    backgroundColor: Colors.teal_light,
  },
  testButtonText: {
    color: Colors.blue,
  },
  testDescription: {
    ...text.h2,
    marginBottom: 8,
    color: Colors.super_teal_dark,
    fontWeight: "bold",
  },
  questionContainer: {
    borderWidth: 1,
    padding: 16,
    borderColor: Colors.blue,
    marginBottom: 24,
    borderRadius: 20,
  },
  questionText: {
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "600",
  },
  answerButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.grey,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: Colors.teal_light,
  },
  selectedAnswer: {
    backgroundColor: Colors.super_teal_dark,
  },
  answerText: {
    ...text.p,
    color: Colors.blue,
    fontWeight: "500",
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
  resultContainer: {
    margin: 16,
    padding: 16,
    backgroundColor: Colors.background,
    borderRadius: 8,
  },
  resultText: {
    ...text.large,
    color: Colors.black,
    fontWeight: "bold",
    marginBottom: 8,
  },
  errorText: {
    color: Colors.red,
  },
});

export default Test;
