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
import { router, useGlobalSearchParams } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import useTestResult from "@/src/feature/test-result/hooks/useTestResult";
import { useTestList } from "@/src/feature/test/hooks/useTestList";
import { QuestionDetails } from "@/src/feature/test/types/test";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Test = () => {
  const { lessonId, testId } = useGlobalSearchParams();
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
  const [userSubmission, setUserSubmission] = useState({
    answerSubmitList: [],
  });

  const initializeAnswerSubmitList = useCallback((test) => {
    if (test && test.questions) {
      const initialList = test.questions.map((question) => ({
        questionId: question.questionId,
        selectedAnswerId: null,
      }));
      setSelectedAnswerList(initialList);
    }
  }, []);

  const handleTestSelection = async (test) => {
    setSelectedTest(test);
    setSelectedAnswers({});
    await loadSavedAnswers(); // Tải lại đáp án từ AsyncStorage
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
      // Cập nhật selectedAnswerList
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
  const handleSubmit = async () => {
    // Cập nhật selectedAnswerList với answerSubmitList trước khi gửi lên server
    setSelectedAnswerList([]); // Cập nhật danh sách câu trả lời đã chọn
    // Gọi hàm onSubmit để gửi dữ liệu
    onSubmit();
    // Xóa dữ liệu đã lưu trong AsyncStorage
    await AsyncStorage.removeItem("selectedAnswers");
    setShowResult(true);
  };

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
            selectedCorrect && { backgroundColor: Colors.super_teal_dark },
            selectedWrong && { backgroundColor: "#fecaca" },
            correct && { backgroundColor: "#F3C623" },
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
              selectedCorrect && { color: Colors.white },
              selectedWrong && { color: "red" },
              correct && { color: "#F9F7CF" },
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
      <View
        style={{
          borderWidth: 1,
          marginBottom: 24,
          padding: 8,
          borderRadius: 20,
          borderColor: Colors.grey,
        }}
      >
        <View style={{ padding: 8 }}>
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
      </View>
    ),
    [renderAnswerItem]
  );

  const loadSavedAnswers = async () => {
    try {
      const savedAnswers = await AsyncStorage.getItem("selectedAnswers");
      if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        setSelectedAnswers(parsedAnswers); // Thiết lập selectedAnswers
      }
    } catch (error) {
      console.error("Error loading saved answers:", error);
    }
  };

  useEffect(() => {
    loadSavedAnswers();
  }, []);

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

export default Test;
