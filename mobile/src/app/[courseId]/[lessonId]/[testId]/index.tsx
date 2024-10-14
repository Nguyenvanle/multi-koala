import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import useTestResult from "@/src/feature/test-result/hooks/useTestResult";
import { useTestList } from "@/src/feature/test/hooks/useTestList";
import { QuestionDetails } from "@/src/feature/test/types/test";

const Test = () => {
  const { lessonId, testId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const { testList, errorMessageTest, loadingTest } =
    useTestList(lessonIdString);
  const [selectedTest, setSelectedTest] = useState(null);
  const {
    loadingResult,
    errorResult,
    errorResultMessage,
    setSelectedAnswerList,
    testResult,
    onSubmit,
  } = useTestResult(selectedTest?.testId); // Truyền testId của bài test đã chọn
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [answerSubmitList, setAnswerSubmitList] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [userSubmission, setUserSubmission] = useState({
    answerSubmitList: [],
  });
  const initializeAnswerSubmitList = useCallback((test) => {
    if (test && test.questions) {
      const initialList = test.questions.map((question) => ({
        questionId: question.questionId,
        selectedAnswerId: null,
      }));
      setAnswerSubmitList(initialList);
    }
  }, []);

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    setSelectedAnswers({});
    initializeAnswerSubmitList(test);
    const selectedTestId = test.testId; // Lấy testId từ bài test đã chọn
    console.log("Selected Test ID: ", selectedTestId); // Log testId đã chọn
  };

  const handleAnswerSelect = useCallback(
    (questionId, answerId) => {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answerId,
      }));

      setAnswerSubmitList((prevList) =>
        prevList.map((item) =>
          item.questionId === questionId
            ? { ...item, selectedAnswerId: answerId }
            : item
        )
      );

      setSelectedAnswerList((prevList) => {
        const existingQuestionIndex = prevList.findIndex(
          (item) => item.questionId === questionId
        );
        if (existingQuestionIndex !== -1) {
          return prevList.map((item) =>
            item.questionId === questionId
              ? { ...item, selectedAnswerId: answerId }
              : item
          );
        } else {
          return [
            ...prevList,
            {
              questionId,
              selectedAnswerId: answerId,
            },
          ];
        }
      });
    },
    [setSelectedAnswerList]
  );

  const handleSubmit = () => {
    console.log(JSON.stringify({ answerSubmitList }, null, 2));
    onSubmit();
    setShowResult(true);
  };

  const renderAnswerItem = useCallback(
    ({ item, questionId }) => {
      const isSelected = selectedAnswers[questionId] === item.answerId;
      const isCorrect = showResult && item.correct;
      const isIncorrect = showResult && isSelected && !item.correct;
      return (
        <TouchableOpacity
          key={item.answerId}
          style={[
            styles.answerButton,
            isSelected && styles.selectedAnswer,
            isCorrect && styles.correctAnswer,
            isIncorrect && styles.incorrectAnswer,
          ]}
          onPress={() =>
            !showResult && handleAnswerSelect(questionId, item.answerId)
          }
          disabled={showResult}
        >
          <Text
            style={[
              styles.answerText,
              isSelected && styles.selectedAnswerText,
              isCorrect && styles.correctAnswerText,
              isIncorrect && styles.incorrectAnswerText,
            ]}
          >
            {item.answerDescription}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedAnswers, handleAnswerSelect, showResult]
  );

  const renderQuestionItem = useCallback(
    ({ item }: { item: QuestionDetails }) => (
      <View
        style={{
          borderWidth: 1,
          marginBottom: 24,
          padding: 8,
          borderRadius: 20,
          borderColor: Colors.dark_grey,
        }}
      >
        <View style={{ padding: 16 }}>
          <Text
            style={{
              ...text.h4,
              color: Colors.super_teal_dark,
              fontWeight: "600",
            }}
          >
            {item.questionDescription}
          </Text>
          <FlatList
            data={item.answers}
            renderItem={({ item: answerItem }) =>
              renderAnswerItem({
                item: answerItem,
                questionId: item.questionId,
              })
            }
            keyExtractor={(answer) => answer.answerId.toString()}
            scrollEnabled={false}
          />
        </View>
      </View>
    ),
    [renderAnswerItem]
  );

  if (loadingTest) {
    return <ActivityIndicator size="large" color={Colors.teal_dark} />;
  }

  if (errorMessageTest) {
    return (
      <Text
        style={{
          ...text.large,
          color: Colors.red,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        {errorMessageTest}
      </Text>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        horizontal
        style={{
          maxHeight: 55,
          backgroundColor: Colors.background,
          marginTop: 8,
        }}
      >
        {testList.map((test) => (
          <TouchableOpacity
            key={test.testId}
            style={{
              padding: 8,
              margin: 8,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Colors.teal_dark,
              borderRadius: 10,
            }}
            onPress={() => handleTestSelection(test)}
          >
            <Text style={{ ...text.p, color: Colors.white, fontWeight: "600" }}>
              {test.testDescription}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView
        style={{ flex: 1, padding: 8, backgroundColor: Colors.background }}
      >
        {selectedTest && (
          <View>
            <FlatList
              data={selectedTest.questions}
              renderItem={renderQuestionItem}
              keyExtractor={(item) => item.questionId.toString()}
              scrollEnabled={false}
            />
            {showResult && testResult && (
              <View style={styles.resultContainer}>
                <Text style={styles.resultText}>
                  You got{" "}
                  <Text style={styles.highlightText}>
                    {testResult.correctAnswers}
                  </Text>{" "}
                  questions correct out of{" "}
                  <Text style={styles.highlightText}>
                    {testResult.totalQuestion}
                  </Text>
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
              disabled={loadingResult || showResult}
            >
              {loadingResult ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <Text style={styles.submitButtonText}>
                  {showResult ? "Submitted" : "Submit"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  answerButton: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  selectedAnswer: {
    backgroundColor: Colors.teal_dark,
  },
  answerText: {
    ...text.p,
    color: Colors.teal_dark,
    fontWeight: "500",
  },

  selectedAnswerText: {
    ...text.p,
    color: Colors.white,
  },
  correctAnswer: {
    backgroundColor: Colors.teal_dark,
  },
  incorrectAnswer: {
    backgroundColor: Colors.red,
    borderColor: Colors.red,
  },
  correctAnswerText: {
    color: Colors.white,
  },
  incorrectAnswerText: {
    color: Colors.white,
  },
  resultContainer: {
    alignSelf: "center",
    marginBottom: 16,
    padding: 16,
    backgroundColor: Colors.teal_light,
    borderRadius: 8,
  },
  resultText: {
    ...text.large,
    color: Colors.black,
    fontWeight: "500",
  },
  highlightText: {
    color: Colors.teal_dark,
    fontWeight: "bold",
  },
  submitButton: {
    backgroundColor: Colors.teal_dark,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  submitButtonText: {
    ...text.large,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default Test;
