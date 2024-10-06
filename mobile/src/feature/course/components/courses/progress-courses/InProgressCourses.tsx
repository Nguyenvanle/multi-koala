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
import { useCourseDiscount } from "@/src/feature/discount/hooks/useCourseDiscount";

const InProgressCourses = () => {
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { enrolled, errorMessage, loading } = useEnrolled(courseIdString);
  const { discount } = useCourseDiscount(courseIdString);

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  const renderCourseItem = ({ item }: { item: EnrolledBody }) => {
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
                source={{ uri: item.course.image.imageUrl }}
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
                    {item.course.courseName}
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
                    {item.process}%
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
                    progress={item.process * 0.01}
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
                    {item.course.uploadedByTeacher?.firstname}{" "}
                    {item.course.uploadedByTeacher?.lastname}
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
          onPress={() => router.push(`/${item.course.courseId}`)}
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
    <View
      style={{
        flex: 1,
        paddingVertical: 10,
      }}
    >
      {loading ? (
        <Text style={{ ...text.p, color: Colors.teal_dark }}>Loading...</Text>
      ) : errorMessage ? (
        <Text style={{ color: "red" }}>{errorMessage}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={enrolled}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.course.courseId}
        />
      )}
    </View>
  );
};

export default InProgressCourses;
