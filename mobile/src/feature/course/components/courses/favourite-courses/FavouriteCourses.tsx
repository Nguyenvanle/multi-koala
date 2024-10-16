import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Link, router } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import useUser from "@/src/feature/user/hooks/useUser";
import { ResultCourse } from "@/src/feature/favourite-courses/types/favourite-course";
import useGetCourse from "@/src/feature/favourite-courses/hooks/useGetFavourite";

const FavouriteCourses = () => {
  const { loading, errorFavouriteMessage, favouriteCourse } = useGetCourse();
  const { user } = useUser();
  console.log(favouriteCourse);
  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  const renderCourseItem = ({ item }: { item: ResultCourse }) => (
    <View>
      <Link href={`/${item.course.courseId}`} asChild>
        <TouchableOpacity style={{ marginTop: 16 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              width: 350,
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
                  paddingBottom: 0,
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
              <View style={{ marginVertical: 5, paddingTop: 0 }}>
                <Text
                  style={{
                    ...text.large,
                    fontWeight: "400",
                    color: Colors.teal_dark,
                  }}
                >
                  {item.course.uploadedByTeacher.firstname}{" "}
                  {item.course.uploadedByTeacher.lastname}
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
        onPress={() => {
          if (user) {
            router.push(`/${item.course.courseId}`);
          } else {
            Alert.alert(
              "LogIn Required",
              "You need to LogIn to buy this course.",
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Log In",
                  onPress: () => router.push("/(auth)/sign-in"),
                },
              ]
            );
          }
        }}
      >
        <Text
          style={{
            ...text.h4,
            fontWeight: "500",
            color: Colors.white,
          }}
        >
          Buy Now
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, paddingVertical: 10 }}>
      {loading && (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={favouriteCourse} // Dữ liệu từ hook
          renderItem={renderCourseItem}
          keyExtractor={(item) => item.course.courseId}
        />
      )}
    </View>
  );
};

export default FavouriteCourses;
