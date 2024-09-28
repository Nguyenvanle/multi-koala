import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { text } from "@/src/constants/Styles";
import { useCourse } from "../../../hooks/useCourse";
import useUser from "@/src/feature/user/hooks/useUser";
import { CourseBody } from "../../../types/course";

const AllCourses = () => {
  const { course, errorMessage, loading } = useCourse();
  const { user } = useUser();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  const renderCourseItem = ({ item }: { item: CourseBody }) => (
    <Link href={`/${item.courseId}`} asChild>
      <TouchableOpacity style={{ marginTop: 16 }}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: 350,
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

                paddingTop: 8,
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
            <View style={{ marginVertical: 5, paddingTop: 0 }}>
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
                  width: 350,
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
                  Buy Now
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );

  return (
    <View>
      {user ? (
        <View
          style={{
            paddingVertical: 10,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={course}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
          />
        </View>
      ) : (
        <View
          style={{
            flex: 0,
            paddingVertical: 10,
            height: 700,
            top: -160,
          }}
        >
          <FlatList
            showsVerticalScrollIndicator={false}
            data={course}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            style={{ height: 630 }}
          />
        </View>
      )}
    </View>
  );
};

export default AllCourses;
