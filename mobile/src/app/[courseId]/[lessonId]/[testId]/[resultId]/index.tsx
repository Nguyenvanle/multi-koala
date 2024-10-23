import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useCallback, useState } from "react";
import { useGlobalSearchParams } from "expo-router";
import { useTestList } from "@/src/feature/test/hooks/useTestList";
import useTestResult from "@/src/feature/test-result/hooks/useTestResult";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "@/src/constants/Colors";
import { QuestionDetails } from "@/src/feature/test/types/test";
import { text } from "@/src/constants/Styles";

const Result = () => {
  const { courseId, lessonId, testId } = useGlobalSearchParams();
  const courseIdString = courseId as string;
  const lessonIdString = lessonId as string;
  const testIdString = testId as string;
  const { testList, errorMessageTest, loadingTest } =
    useTestList(lessonIdString);
  const [selectedTest, setSelectedTest] = useState(null);
  const {
    loadingResult,
    errorResult,
    errorResultMessage,
    selectedAnswerList,
    setSelectedAnswerList,
    testResult,
    setTestResult,
    onSubmit, // Hàm này giờ đã sử dụng testIdString
  } = useTestResult(selectedTest?.testId); // Truyền testId của bài test đã chọn
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const initializeAnswerSubmitList = useCallback(
    (test) => {
      if (test && test.questions) {
        const initialList = test.questions.map((question) => ({
          questionId: question.questionId,
          selectedAnswerId: selectedAnswers[question.questionId] || null, // Sử dụng selectedAnswers đã khôi phục
        }));
        setSelectedAnswerList(initialList);
      }
    },
    [selectedAnswers]
  ); // Dependency là selectedAnswers

  const handleAnswerSelect = useCallback(async (questionId, answerId) => {
    setSelectedAnswers((prevAnswers) => {
      const updatedAnswers = {
        ...prevAnswers,
        [questionId]: answerId,
      };
      // Lưu vào AsyncStorage
      AsyncStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
      return updatedAnswers;
    });
  }, []);

  const renderAnswerItem = useCallback(
    ({ item, questionId, index }) => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Mảng chữ cái từ A đến Z
      const isSelected = selectedAnswers[questionId] === item.answerId; // Kiểm tra đáp án đã chọn
      const isCorrect = item.correct; // Kiểm tra xem đáp án hiện tại có đúng hay không
      const selectedChoose = !showResult && isSelected;
      const selectedWrong = showResult && isSelected && !isCorrect; // Kiểm tra đáp án người dùng chọn là sai
      const selectedCorrect = showResult && isSelected && isCorrect;
      const correct = showResult && !isSelected && isCorrect;

      return (
        <TouchableOpacity
          key={item.answerId}
          style={[
            styles.answerButton,
            selectedChoose && { backgroundColor: Colors.teal_dark },
            selectedCorrect && { backgroundColor: "#00FF9C" },
            selectedWrong && { backgroundColor: "#fecaca" },
            correct && { backgroundColor: "#FFF7D1" },
          ]}
          onPress={() =>
            !showResult && handleAnswerSelect(questionId, item.answerId)
          }
          disabled={showResult}
        >
          <Text
            style={[
              styles.answerText,
              !showResult && isSelected && { color: Colors.white },
              selectedCorrect && { color: Colors.teal_dark },
              selectedWrong && { color: Colors.red },
              correct && { color: "#FFB200" },
            ]}
          >
            {letters[index]}. {item.answerDescription} {/* Hiển thị chữ cái */}
          </Text>
        </TouchableOpacity>
      );
    },
    [selectedAnswers, handleAnswerSelect, showResult]
  );

  const renderQuestionItem = useCallback(
    ({ item }: { item: QuestionDetails }) => (
      <View>
        <View style={{ padding: 8, paddingBottom: 32, paddingTop: 32 }}>
          <Text
            style={{
              ...text.h4,
              color: Colors.teal_dark,
              fontWeight: "500",
            }}
          >
            {item.questionDescription}
          </Text>
          <FlatList
            data={item.answers}
            renderItem={(
              { item: answerItem, index } // Thêm index vào đây
            ) =>
              renderAnswerItem({
                item: answerItem,
                questionId: item.questionId,
                index, // Truyền index vào hàm renderAnswerItem
              })
            }
            keyExtractor={(answer) => answer.answerId.toString()}
            scrollEnabled={false}
          />
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: Colors.grey,
            alignSelf: "stretch",
          }}
        />
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
        style={{ flex: 1, padding: 16, backgroundColor: Colors.background }}
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
    backgroundColor: Colors.blue,
  },
  answerText: {
    ...text.p,
    color: Colors.black,
    fontWeight: "400",
  },
  selectedAnswerText: {
    ...text.p,
    color: Colors.white,
  },
  correctAnswer: {
    backgroundColor: Colors.super_teal_dark,
  },
  incorrectAnswer: {
    backgroundColor: "#fecaca",
  },
  correctAnswerText: {
    color: Colors.black,
  },
  incorrectAnswerText: {
    color: Colors.black,
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
    marginBottom: 50,
  },
  submitButtonText: {
    ...text.large,
    color: Colors.white,
    fontWeight: "bold",
  },
});

export default Result;
