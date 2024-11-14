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
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import useTestResult from "@/feature/test-result/hooks/useTestResult";
import useTestStudent from "@/feature/test-result/hooks/useTestStudent";
import { useTestList } from "@/feature/test/hooks/useTestList";
import { QuestionDetails } from "@/feature/test/types/test";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useTestResultList from "@/feature/test-result/hooks/useTestResultList";
import { useDetails } from "@/feature/course/hooks/useDetails";

const Test = () => {
  const { courseId, lessonId, testId } = useGlobalSearchParams();
  const [selectedTestId, setSelectedTestId] = useState();
  const [hasToken, setHasToken] = useState(false);
  const [selectedResultIndex, setSelectedResultIndex] = useState(null);
  const courseIdString = courseId as string;
  const lessonIdString = lessonId as string;
  const testIdString = testId as string;
  const { courseDetails, loading, errorMessageDetails } =
    useDetails(courseIdString);

  const { testList, errorMessageTest, loadingTest } =
    useTestList(lessonIdString);
  const [selectedTest, setSelectedTest] = useState(null);

  // Initialize both hooks
  const {
    loadingResult,
    errorResult,
    errorResultMessage,
    selectedAnswerList: guestAnswerList,
    setSelectedAnswerList: setGuestAnswerList,
    testResult,
    setTestResult,
    onSubmit,
  } = useTestResult(selectedTest?.testId);

  const {
    loadingStudentResult,
    errorStudentResult,
    errorStudentResultMessage,
    selectedAnswerList: studentAnswerList,
    setSelectedAnswerList: setStudentAnswerList,
    testStudentResult,
    setTestStudentResult,
    onStudentSubmit,
  } = useTestStudent(selectedTest?.testId);

  const {
    loadingResultList,
    errorResultList,
    errorResultListMessage,
    testResultList,
    setTestResultList,
    handleTest,
  } = useTestResultList(selectedTest?.testId);

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isRetake, setIsRetake] = useState(false);
  const [selectedResultAnswers, setSelectedResultAnswers] = useState(null);
  const [resultMessage, setResultMessage] = useState("");
  const [testHistory, setTestHistory] = useState({});

  // Check for token on component mount
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      setHasToken(!!token);
    };
    checkToken();
  }, []);

  const initializeAnswerSubmitList = useCallback(
    (test) => {
      if (test && test.questions) {
        const initialList = test.questions.map((question) => ({
          questionId: question.questionId,
          selectedAnswerId: selectedAnswers[question.questionId] || null,
        }));
        // Update the appropriate answer list based on token presence
        if (hasToken) {
          setStudentAnswerList(initialList);
        } else {
          setGuestAnswerList(initialList);
        }
      }
    },
    [selectedAnswers, hasToken]
  );

  const handleTestSelection = async (test) => {
    setSelectedTest(test);
    setShowResult(false);
    setSelectedAnswers({});
    setSelectedResultIndex(null);
    setSelectedResultAnswers(null);
    await loadSavedAnswers();
    setSelectedTestId(test.testId);

    // Load lịch sử làm bài của test được chọn
    const testHistory = await loadTestHistory(test.testId);
    if (testHistory && testHistory.length > 0) {
      setTestResultList(testHistory);
    }
  };

  const handleResultSelect = (index, result) => {
    if (selectedResultIndex === index) {
      setSelectedResultIndex(null);
      setSelectedResultAnswers(null);
    } else {
      setSelectedResultIndex(index);
      // Đảm bảo result.answers là một mảng các answerId
      setSelectedResultAnswers(result?.answers || []);
    }
  };

  const handleAnswerSelect = useCallback(
    async (questionId, answerId) => {
      setSelectedAnswers((prevAnswers) => {
        const updatedAnswers = {
          ...prevAnswers,
          [questionId]: answerId,
        };

        const correctAnswersCount = Object.keys(updatedAnswers).filter((id) => {
          const question = selectedTest.questions.find(
            (q) => q.questionId === id
          );
          return (
            question &&
            question.answers.some(
              (answer) =>
                answer.answerId === updatedAnswers[id] && answer.correct
            )
          );
        }).length;

        const totalQuestions = selectedTest.questions.length;
        const newScore = calculateScore(correctAnswersCount, totalQuestions);
        setScore(newScore);

        AsyncStorage.setItem("selectedAnswers", JSON.stringify(updatedAnswers));
        return updatedAnswers;
      });
    },
    [selectedTest]
  );

  const calculateScore = (correctAnswersCount, totalQuestions) => {
    if (totalQuestions === 0) return 0;
    return parseFloat(((correctAnswersCount / totalQuestions) * 10).toFixed(1));
  };

  const handleRetakeTest = () => {
    setIsRetake(true); // Đặt trạng thái để thực hiện lại bài test
    setShowResult(false); // Ẩn kết quả
    setSelectedAnswers({}); // Đặt lại đáp án đã chọn
    loadSavedAnswers();
    setSelectedTestId(selectedTest); // Giữ nguyên bài test đã chọn
    initializeAnswerSubmitList(selectedTest); // Khởi tạo lại danh sách câu trả lời
  };

  const renderAnswerItemForResult = useCallback(
    ({ item, questionId, index, userAnswerId }) => {
      if (!item) return null;

      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const isUserSelected = userAnswerId === item.answerId;
      const isCorrect = item.correct;

      // Logic màu sắc cho từng trường hợp
      let backgroundColor = Colors.white; // Màu mặc định
      let textColor = Colors.black; // Màu chữ mặc định

      if (isUserSelected && isCorrect) {
        // Người dùng chọn đúng
        backgroundColor = "#00FF9C";
        textColor = Colors.teal_dark;
      } else if (isUserSelected && !isCorrect) {
        // Người dùng chọn sai
        backgroundColor = "#fecaca";
        textColor = Colors.red;
      } else if (!isUserSelected && isCorrect) {
        // Đáp án đúng nhưng người dùng không chọn
        backgroundColor = "#FFF7D1";
        textColor = "#FFB200";
      }

      return (
        <View
          key={item.answerId}
          style={[
            styles.answerButton,
            { backgroundColor },
            styles.resultAnswerButton,
          ]}
        >
          <Text style={[styles.answerText, { color: textColor }]}>
            {letters[index]}. {item.answerDescription}
          </Text>
        </View>
      );
    },
    [selectedAnswers, showResult]
  );

  const renderResults = () => {
    const currentTestHistory = testHistory[selectedTest?.testId] || [];

    // Sửa lại cách so sánh ngày bằng cách sử dụng getTime()
    const sortedHistory = [...currentTestHistory].sort((a, b) => {
      return new Date(b.dateTaken).getTime() - new Date(a.dateTaken).getTime();
    });

    if (sortedHistory.length === 0) {
      return (
        <View>
          <TouchableOpacity
            style={{ ...styles.submitButton, marginTop: 24, marginBottom: 60 }}
            onPress={handleRetakeTest}
          >
            <Text style={styles.submitButtonText}>Take this test</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <View style={{ marginBottom: 60 }}>
        {courseDetails.process === 1 && (
          <TouchableOpacity
            style={{ ...styles.submitButton, marginBottom: 24 }}
            onPress={handleRetakeTest}
          >
            <Text style={styles.submitButtonText}>Take this test again</Text>
          </TouchableOpacity>
        )}
        <Text
          style={{
            ...styles.resultText,
            color: Colors.super_teal_dark,
            fontWeight: "600",
          }}
        >
          Your previous test results
        </Text>
        {sortedHistory.map((result, index) => {
          const previousScore = result.score;

          return (
            <View key={index}>
              <TouchableOpacity
                style={{
                  ...styles.resultContainer,
                  marginBottom: 8,
                  marginTop: 8,
                }}
                onPress={() => handleResultSelect(index, result)}
              >
                <Text style={styles.answerText}>
                  {index + 1}. Your score:{" "}
                  <Text
                    style={[
                      styles.highlightText,
                      { color: getScoreColor(previousScore) },
                    ]}
                  >
                    {previousScore}
                  </Text>
                </Text>
                <Text style={{ alignSelf: "flex-end" }}>
                  {new Date(result.dateTaken).toLocaleDateString()}
                </Text>
              </TouchableOpacity>
              {selectedResultIndex === index && (
                <View style={styles.resultDetailsContainer}>
                  <Text style={styles.resultDetailTitle}>Test Details:</Text>
                  <FlatList
                    data={result.questions}
                    renderItem={({ item: question, index: questionIndex }) => {
                      const userAnswerId = result.answers[question.questionId];

                      return (
                        <View style={styles.questionContainer}>
                          <Text style={styles.questionText}>
                            {questionIndex + 1}. {question.questionDescription}
                          </Text>
                          <FlatList
                            data={question.answers}
                            renderItem={({
                              item: answer,
                              index: answerIndex,
                            }) =>
                              renderAnswerItemForResult({
                                item: answer,
                                questionId: question.questionId,
                                index: answerIndex,
                                userAnswerId: userAnswerId,
                              })
                            }
                            keyExtractor={(answer) =>
                              answer?.answerId?.toString() ||
                              Math.random().toString()
                            }
                            scrollEnabled={false}
                          />
                        </View>
                      );
                    }}
                    keyExtractor={(item) =>
                      item?.questionId?.toString() || Math.random().toString()
                    }
                    scrollEnabled={false}
                  />
                </View>
              )}
            </View>
          );
        })}
      </View>
    );
  };

  useEffect(() => {
    if (selectedTest?.testId) {
      handleTest(); // Gọi API để lấy danh sách kết quả
    }
  }, [selectedTest?.testId]);

  const handleSubmit = async () => {
    try {
      let result;
      if (hasToken) {
        setStudentAnswerList([]);
        result = await onStudentSubmit();
      } else {
        setGuestAnswerList([]);
        result = await onSubmit();
      }

      // Lưu lịch sử làm bài
      await saveTestHistory(
        selectedTest.testId,
        selectedAnswers,
        score,
        new Date().toISOString()
      );

      // Xóa câu trả lời tạm thời
      await AsyncStorage.removeItem("selectedAnswers");
      setShowResult(true);

      if (score >= 5) {
        setResultMessage("Congratulations! You have passed the test.");
      } else {
        setResultMessage("Sorry! You failed the test.");
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    }
  };

  // Function để lưu lịch sử làm bài vào AsyncStorage
  const saveTestHistory = async (testId, answers, score, date) => {
    try {
      // Lấy lịch sử hiện tại
      const currentHistory = await AsyncStorage.getItem("testHistory");
      const parsedHistory = currentHistory ? JSON.parse(currentHistory) : {};

      // Thêm kết quả mới vào lịch sử
      const testResults = parsedHistory[testId] || [];
      testResults.push({
        answers,
        score,
        dateTaken: date || new Date().toISOString(),
        questions: selectedTest.questions, // Lưu lại cả câu hỏi để hiển thị sau này
      });

      // Cập nhật lịch sử
      const updatedHistory = {
        ...parsedHistory,
        [testId]: testResults,
      };

      // Lưu vào AsyncStorage
      await AsyncStorage.setItem("testHistory", JSON.stringify(updatedHistory));
      setTestHistory(updatedHistory);
    } catch (error) {
      console.error("Error saving test history:", error);
    }
  };

  // Function để lấy lịch sử làm bài
  const loadTestHistory = async (testId) => {
    try {
      const history = await AsyncStorage.getItem("testHistory");
      if (history) {
        const parsedHistory = JSON.parse(history);
        setTestHistory(parsedHistory);
        return parsedHistory[testId] || [];
      }
      return [];
    } catch (error) {
      console.error("Error loading test history:", error);
      return [];
    }
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
            selectedCorrect && { backgroundColor: "#00FF9C" },
            selectedWrong && { backgroundColor: "#fecaca" },
            correct && { backgroundColor: "#FFF7D1" },
          ]}
          onPress={() =>
            !showResult && handleAnswerSelect(questionId, item.answerId)
          }
          disabled={showResult || selectedChoose}
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

  // Trong phần render chính của component
  if (loadingResultList) {
    return <ActivityIndicator color={Colors.teal_dark} />;
  }

  if (errorResultList) {
    return (
      <Text style={{ ...text.large, color: Colors.red }}>
        {errorResultListMessage}
      </Text>
    );
  }

  if (loadingTest) {
    return <ActivityIndicator color={Colors.teal_dark} />;
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

  const getScoreColor = (score) => {
    if (score >= 8.0) return "#0d9488"; // Màu cho score >= 8.0
    if (score >= 6.5) return "#eab308"; // Màu cho score từ 6.5 đến 7.9
    if (score >= 5.0) return "#f97316"; // Màu cho score từ 5.0 đến 6.4
    return "#ef4444"; // Màu cho score < 4.9
  };

  const displayResult = hasToken ? testStudentResult : testResult;
  const isLoading = hasToken ? loadingStudentResult : loadingResult;

  return (
    <View style={{ flex: 1, backgroundColor: Colors.background }}>
      <ScrollView
        horizontal
        style={{
          maxHeight: 55,
          backgroundColor: Colors.background,
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
            {isRetake ? (
              <View>
                <FlatList
                  data={selectedTest.questions}
                  renderItem={renderQuestionItem}
                  keyExtractor={(item) => item.questionId.toString()}
                  scrollEnabled={false}
                />
                {showResult && displayResult && (
                  <View style={styles.resultContainer}>
                    <Text
                      style={
                        score >= 5
                          ? styles.successMessage
                          : styles.failureMessage
                      }
                    >
                      {resultMessage}
                    </Text>
                    <Text style={styles.resultText}>
                      You got{" "}
                      <Text
                        style={[
                          styles.highlightText,
                          { color: getScoreColor(score) },
                        ]}
                      >
                        {displayResult.correctAnswers}
                      </Text>{" "}
                      questions correct out of{" "}
                      <Text
                        style={[
                          styles.highlightText,
                          { color: getScoreColor(score) },
                        ]}
                      >
                        {displayResult.totalQuestion}
                      </Text>
                    </Text>
                    <Text style={styles.resultText}>
                      Your score is:{" "}
                      <Text
                        style={[
                          styles.highlightText,
                          { color: getScoreColor(score) },
                        ]}
                      >
                        {score}
                      </Text>
                    </Text>

                    {/* Display result message */}
                  </View>
                )}
                {!showResult && (
                  <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <ActivityIndicator size="small" color={Colors.white} />
                    ) : (
                      <Text style={styles.submitButtonText}>Submit</Text>
                    )}
                  </TouchableOpacity>
                )}
              </View>
            ) : (
              renderResults() // Hiển thị kết quả và nút thực hiện lại
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
    fontWeight: "300",
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
    marginTop: 32,
    alignSelf: "stretch",
    marginBottom: 56,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 10,
    alignContent: "center",
  },
  resultText: {
    ...text.h4,
    color: Colors.blue,
    fontWeight: "400",
  },
  highlightText: {
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

  retakeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
  resultDetailsContainer: {
    backgroundColor: Colors.white,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  resultDetailTitle: {
    ...text.h4,
    color: Colors.teal_dark,
    marginBottom: 16,
    fontWeight: "600",
  },
  questionContainer: {
    marginBottom: 24,
  },
  questionText: {
    ...text.p,
    color: Colors.black,
    fontWeight: "500",
    marginBottom: 12,
  },
  resultAnswerButton: {
    marginVertical: 4,
    borderWidth: 1,
    borderColor: Colors.grey,
  },
  successMessage: {
    ...text.h4,
    color: Colors.super_teal_dark,
  },
  failureMessage: {
    ...text.h4,
    color: Colors.red,
  },
});

export default Test;
