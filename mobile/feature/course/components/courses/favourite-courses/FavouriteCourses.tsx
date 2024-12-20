import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import * as Progress from "react-native-progress";
import { Link, router, useGlobalSearchParams } from "expo-router";
import { useEnrolled } from "../../../hooks/useEnrrolled";
import {
  Course,
  ResultCourse,
} from "@/feature/favourite-courses/types/favourite-course";
import useGetCourse from "@/feature/favourite-courses/hooks/useGetFavourite";

const InProgressCourses = () => {
  const { courseId } = useGlobalSearchParams();
  const courseIdString = Array.isArray(courseId) ? courseId[0] : courseId;
  const { loading, errorFavouriteMessage, favouriteCourse } = useGetCourse();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator color={Colors.teal_dark} />
      </View>
    );
  }

  const renderCourseItem = ({ item }: { item: ResultCourse }) => {
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
                source={{
                  uri:
                    item.course.image.imageUrl ||
                    "https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5215.jpg?t=st=1732892833~exp=1732896433~hmac=f12b1f3fbbb20b6e374e81fb1d3283827dcf73904ef5d6c29434936df1b0432b&w=826",
                }}
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
      ) : errorFavouriteMessage ? (
        <Text style={{ color: "red" }}>{errorFavouriteMessage}</Text>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favouriteCourse}
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.course.courseId}
        />
      )}
    </View>
  );
};

export default InProgressCourses;
