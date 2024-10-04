import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React from "react";
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

  const renderAnswerItem = ({ item }: { item: AnswerDetails }) => {
    return (
      <View>
        <Text>{item.answerDescription}</Text>
      </View>
    );
  };
  const renderQuestionItem = ({ item }: { item: QuestionDetails }) => {
    return (
      <View>
        <Text>{item.questionDescription}</Text>
        <FlatList
          data={item.answers}
          renderItem={renderAnswerItem}
          keyExtractor={(answers) => answers.answerId.toString()}
          scrollEnabled={false}
        />
      </View>
    );
  };

  const renderTestItem = ({ item }: { item: TestDetails }) => {
    return (
      <View>
        <Text>{item.testDescription}</Text>
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
    <View>
      {/* Phần hiển thị danh sách Test */}
      <Text style={styles.sectionTitle}>Tests</Text>
      {loadingTest ? (
        <ActivityIndicator size="large" color={Colors.teal_dark} />
      ) : testDetails && testDetails.length > 0 ? (
        <FlatList
          data={testDetails}
          renderItem={renderTestItem}
          keyExtractor={(item) => item.testId.toString()}
          scrollEnabled={false}
        />
      ) : (
        <Text style={{ ...text.p, color: Colors.red }}>No tests available</Text>
      )}
    </View>
  );
};

export default Test;

const styles = StyleSheet.create({
  sectionTitle: {
    ...text.h4,
    color: Colors.black,
    marginTop: 8,
    fontWeight: "400",
  },
});
