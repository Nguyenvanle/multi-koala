import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Styles, text } from "@/src/constants/Styles";
import { Colors } from "@/src/constants/Colors";

interface CourseDetails {
  id: string;
  title: string;
  description: string;
  // Thêm các trường khác theo cần thiết
}

const CourseDetailsScreen = () => {
  const { id } = useLocalSearchParams();
  const [courseDetails, setCourseDetails] = useState<CourseDetails | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Thay thế URL này bằng API thực tế của bạn
        const response = await fetch(`https://your-api.com/courses/${id}`);
        const data = await response.json();
        setCourseDetails(data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={Styles.container}>
        <ActivityIndicator size="large" color={Colors.teal_dark} />
      </View>
    );
  }

  if (!courseDetails) {
    return (
      <View style={Styles.container}>
        <Text style={text.h4}>Course not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={Styles.container}>
      <Text style={text.h2}>{courseDetails.title}</Text>
      <Text style={text.p}>{courseDetails.description}</Text>
      {/* Thêm các thông tin khác của khóa học ở đây */}
    </ScrollView>
  );
};

export default CourseDetailsScreen;
