import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import * as Progress from "react-native-progress";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { useEnrolled } from "../../../hooks/useEnrrolled";
import { EnrolledBody } from "../../../types/course-enrolled";

interface Filter {
  types: string[];
  fields: string[];
}

interface InProgressCoursesProps {
  searchQuery?: string; // Made optional
  filter: Filter; // Added filter property
}

const InProgressCourses: React.FC<InProgressCoursesProps> = ({
  searchQuery = "", // Default value
  filter, // Receive filter prop
}) => {
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { enrolled = [], errorMessage, loading } = useEnrolled(courseIdString); // Default empty array

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  // Kiểm tra và lọc khóa học
  const filteredEnrolled = enrolled.filter((item) => {
    if (!item?.course?.courseName) return false;

    const matchesSearch = searchQuery
      ? item.course.courseName.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const inProgress = item.process != null && item.process < 1.0;

    // Lọc dựa trên types và fields
    const matchesType =
      filter.types.length === 0 ||
      filter.types.every((type) =>
        item.course.types.some((courseType) => courseType.typeName === type)
      );

    const matchesField =
      filter.fields.length === 0 ||
      filter.fields.every((field) =>
        item.course.fields.some((itemField) => itemField.fieldName === field)
      );

    return matchesSearch && inProgress && matchesType && matchesField;
  });

  const renderCourseItem = ({ item }: { item: EnrolledBody }) => {
    if (!item?.course) return null;

    return (
      <View>
        <Link href={`/${item.course.courseId}`} asChild>
          <TouchableOpacity>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                width: 350,
                marginTop: 16,
              }}
            >
              <Image
                source={{ uri: item.course?.image?.imageUrl }}
                style={{
                  width: 350,
                  height: 200,
                  borderRadius: 15,
                  borderColor: Colors.grey,
                  borderWidth: 1,
                }}
              />
              <View style={{ flexDirection: "column", alignSelf: "center" }}>
                <View
                  style={{
                    flexDirection: "row",
                    alignSelf: "baseline",
                    width: 345,
                    paddingTop: 8,
                  }}
                >
                  <Text
                    style={{
                      ...text.h4,
                      color: Colors.black,
                      fontWeight: "400",
                    }}
                  >
                    {item.course.courseName || "Untitled Course"}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "flex-end",
                  }}
                >
                  <Text
                    style={{
                      ...text.small,
                      fontWeight: "500",
                      color: Colors.teal_dark,
                    }}
                  >
                    {((item.process || 0) * 100).toFixed(1)}%
                  </Text>
                </View>
                <View
                  style={{
                    backgroundColor: Colors.white,
                    borderRadius: 20,
                    width: 350,
                  }}
                >
                  <Progress.Bar
                    width={350}
                    progress={item.process || 0}
                    color={Colors.teal_light}
                  />
                </View>
                <View style={{ marginVertical: 5 }}>
                  <Text
                    style={{
                      ...text.large,
                      fontWeight: "400",
                      color: Colors.teal_dark,
                    }}
                  >
                    {item.course.uploadedByTeacher?.firstname || ""}{" "}
                    {item.course.uploadedByTeacher?.lastname || ""}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity
          style={{
            borderRadius: 10,
            backgroundColor: Colors.teal_dark,
            alignItems: "center",
            height: 50,
            width: 350,
            marginTop: 8,
            marginBottom: 8,
            justifyContent: "center",
          }}
          onPress={() =>
            item.course?.courseId && router.push(`/${item.course.courseId}`)
          }
        >
          <Text
            style={{
              ...text.h4,
              fontWeight: "500",
              color: Colors.white,
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingVertical: 10, marginBottom: 53 }}>
      {errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={filteredEnrolled}
          renderItem={renderCourseItem}
          keyExtractor={(item) =>
            item.course?.courseId || Math.random().toString()
          }
          ListEmptyComponent={() => (
            <Text
              style={{
                ...text.large,
                marginTop: 8,
                fontWeight: "400",
                color: Colors.dark_grey,
              }}
            >
              No courses available
            </Text>
          )}
        />
      )}
    </View>
  );
};

export default InProgressCourses;
