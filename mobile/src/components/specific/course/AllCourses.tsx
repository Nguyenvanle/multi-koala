import React from "react";
import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import * as Progress from "react-native-progress";
import { useCourses } from "@/src/hook/course/useCourse";

const AllCourses = () => {
  const { courseData, errorMessage, loading } = useCourses();

  if (loading) {
    return (
      <Text style={{ ...text.p, color: Colors.teal_dark, paddingVertical: 10 }}>
        Loading...
      </Text>
    );
  }

  if (errorMessage) {
    return <Text>{errorMessage}</Text>;
  }

  const renderCourseItem = ({ item }: { item: CourseData }) => (
    <Link href={`/courseDetails/${item.courseId}`} asChild push>
      <TouchableOpacity>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 350,
            marginTop: 28,
          }}
        >
          <Image
            source={{ uri: item.image.imageUrl }}
            style={{
              width: 350,
              height: 200,
              borderRadius: 15,
              borderColor: Colors.grey,
              borderWidth: 1,
            }}
          />
          <View
            style={{
              flexDirection: "column",
              alignSelf: "center",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignSelf: "baseline",
                width: 345,
                padding: 8,
                paddingBottom: 0,
              }}
            >
              <Text
                style={{
                  ...text.h4,
                  color: Colors.black,
                  fontWeight: "300",
                }}
              >
                {item.courseName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                paddingHorizontal: 8,
              }}
            >
              <Text
                style={{
                  ...text.small,
                  color: Colors.teal_dark,
                }}
              >
                10/12
              </Text>
            </View>
            <View
              style={{
                backgroundColor: Colors.white,
                borderRadius: 20,
              }}
            >
              <Progress.Bar
                width={346}
                progress={item.process}
                color={Colors.teal_light}
              />
            </View>
            <View style={{ marginVertical: 5, padding: 8, paddingTop: 0 }}>
              <Text
                style={{
                  ...text.large,
                  fontWeight: "300",
                  color: Colors.dark,
                }}
              >
                {item.uploadedByTeacher.firstname}{" "}
                {item.uploadedByTeacher.lastname}
              </Text>
              <View
                style={{
                  borderRadius: 10,
                  backgroundColor: Colors.teal_dark,
                  alignItems: "center",
                  height: 50,
                  width: 330,
                  marginTop: 8,
                  marginBottom: 8,
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...text.h4,
                    fontWeight: "500",
                    color: Colors.white,
                  }}
                >
                  ${item.coursePrice}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={courseData}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.courseId}
      />
    </View>
  );
};

export default AllCourses;
