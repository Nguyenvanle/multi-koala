import React, { useState, useCallback } from "react";
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
import { useTestDetails } from "@/src/feature/test/hooks/useTestDetails";
import { QuestionDetails, TestDetails } from "@/src/feature/test/types/test";

const Test = () => {
  const { lessonId, testId } = useGlobalSearchParams();
  const lessonIdString = Array.isArray(lessonId) ? lessonId[0] : lessonId;
  const testIdString = Array.isArray(testId) ? testId[0] : testId;
  const { testList, errorMessageTest, loadingTest } =
    useTestList(lessonIdString);
  const { testDetails } = useTestDetails(lessonIdString, testIdString);
  const [selectedTest, setSelectedTest] = useState(null);
  const [userAnswers, setUserAnswers] = useState({});
  const {
    loadingResult,
    errorResult,
    errorResultMessage,
    setSelectedAnswerList,
    testResult,
    onSubmit,
  } = useTestResult(selectedTest?.testId); // Truyền testId của bài test đã chọn
  const [selectedAnswers, setSelectedAnswers] = useState({});

  const handleTestSelection = (test) => {
    setSelectedTest(test);
    setUserAnswers({});

    // Giả sử bạn muốn lưu testId vào state để sử dụng sau này
    const selectedTestId = test.testId; // Lấy testId từ bài test đã chọn
    console.log("Selected Test ID: ", selectedTestId); // Log testId đã chọn
  };

  const handleAnswerSelect = useCallback(
    (questionId, answerId) => {
      setSelectedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [questionId]: answerId,
      }));
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

  const renderAnswerItem = useCallback(
    ({ item, questionId }) => (
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
    ),
    [selectedAnswers, handleAnswerSelect]
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

  const renderTestItem = useCallback(
    ({ item }: { item: TestDetails }) => (
      <View>
        <FlatList
          data={item.questions}
          renderItem={({ item: questionItem }) =>
            renderQuestionItem({ item: questionItem })
          }
          keyExtractor={(question) => question.questionId.toString()}
          scrollEnabled={false}
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
        horizontal
        style={{
          maxHeight: 55,
          backgroundColor: Colors.teal_light,
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
            <Text
              style={{ ...text.p, color: Colors.teal_light, fontWeight: "600" }}
            >
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
            {testResult && (
              <View
                style={{
                  alignSelf: "center",
                  marginBottom: 8,
                }}
              >
                <Text
                  style={{
                    ...text.large,
                    color: Colors.black,
                    fontWeight: "500",
                    marginBottom: 8,
                  }}
                >
                  You got
                  <Text style={{ color: Colors.teal_dark }}>
                    {" "}
                    {testResult.totalQuestion}{" "}
                  </Text>
                  question correct out of
                  <Text style={{ color: Colors.teal_dark }}>
                    {" "}
                    {testResult.totalQuestion}{" "}
                  </Text>
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={{
                backgroundColor: Colors.teal_dark,
                padding: 16,
                borderRadius: 8,
                alignItems: "center",
                marginBottom: 8,
              }}
              onPress={onSubmit}
              disabled={loadingResult}
            >
              {loadingResult ? (
                <ActivityIndicator size="small" color={Colors.white} />
              ) : (
                <Text
                  style={{
                    ...text.large,
                    color: Colors.white,
                    fontWeight: "bold",
                  }}
                >
                  Submit
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
});

export default Test;
