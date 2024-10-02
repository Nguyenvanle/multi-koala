import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { Link, router } from "expo-router";
import { useEnrolled } from "../../../hooks/useEnrrolled";
import { EnrolledBody } from "../../../types/course-enrolled";
import useUser from "@/src/feature/user/hooks/useUser";

const MyCourses = (courseId: string) => {
  const { enrolled, errorMessage, loading } = useEnrolled(courseId);
  const { user, setUser, setErrorMessage } = useUser();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }
  const renderCourseItem = ({ item }: { item: EnrolledBody }) => (
    <Link href={`/${item.course.courseId}`} asChild>
      <TouchableOpacity style={styles.courseContainer}>
        <Image
          source={{ uri: item.course.image.imageUrl }}
          style={styles.image}
        />
        <View style={styles.containerText}>
          <Text style={styles.clampedText} numberOfLines={1}>
            {item.course.courseName}
          </Text>
          <Text style={styles.price}>
            ${item.course.coursePrice.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
  return (
    <View style={styles.container}>
      {user ? (
        <FlatList
          horizontal={true}
          data={enrolled}
          renderItem={renderCourseItem}
          keyExtractor={(item, index) => item.course.courseId}
          style={{ paddingHorizontal: 16 }}
        />
      ) : (
        <TouchableOpacity
          onPress={() => router.push("/(auth)/sign-in")}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 300,
          }}
        >
          <Text style={{ ...styles.clampedText, color: Colors.red }}>
            Please sign in to connect your courses
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusText: {
    textAlign: "center",
    padding: 16,
    fontSize: 16,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8,
    height: 221,
  },
  courseContainer: {
    alignItems: "center",
    width: 186,
    height: 221,
    padding: 8,
  },
  image: {
    width: 170,
    height: 140,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 10,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  instructor: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "300",
    paddingTop: 8,
  },
  containerText: {
    overflow: "hidden",
    width: 170,
    padding: 8,
  },
  clampedText: {
    // Styles can be adjusted according to your needs
    ...text.p,
    color: Colors.black,
    fontWeight: "400",
  },
});

export default MyCourses;
