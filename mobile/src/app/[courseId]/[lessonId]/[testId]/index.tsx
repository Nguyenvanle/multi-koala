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

  const handleTestSelection = async (test) => {
    setSelectedTest(test);
    setShowResult(false);
    setSelectedAnswers({}); // Reset selectedAnswers khi chọn bài kiểm tra mới
    await loadSavedAnswers(); // Tải lại đáp án từ AsyncStorage
  };

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

  const handleSubmit = async () => {
    // Cập nhật selectedAnswerList với answerSubmitList trước khi gửi lên server
    setSelectedAnswerList([]); // Cập nhật danh sách câu trả lời đã chọn
    // Xóa dữ liệu đã lưu trong AsyncStorage
    await AsyncStorage.removeItem("selectedAnswers");
    // Gọi hàm onSubmit để gửi dữ liệu
    onSubmit();
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
        console.log("Loaded answers from AsyncStorage:", parsedAnswers);
        setSelectedAnswers(parsedAnswers); // Thiết lập selectedAnswers
        // Gọi lại initializeAnswerSubmitList sau khi cập nhật selectedAnswers
        initializeAnswerSubmitList(selectedTest); // Chỉ khi selectedTest có giá trị
      }
    } catch (error) {
      console.error("Error loading saved answers:", error);
    }
  };

  useEffect(() => {
    if (selectedTest) {
      initializeAnswerSubmitList(selectedTest);
    }
  }, [selectedTest, selectedAnswers]); // Tùy thuộc vào selectedTest và selectedAnswers

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
