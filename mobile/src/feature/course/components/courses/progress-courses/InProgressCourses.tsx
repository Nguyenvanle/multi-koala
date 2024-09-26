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
import { Link } from "expo-router";
import { useEnrolled } from "../../../hooks/useEnrrolled";
import { EnrolledBody } from "../../../types/course-enrolled";

const InProgressCourses = () => {
  const { enrolled, errorMessage, loading } = useEnrolled();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={Colors.teal_dark} />
      </View>
    );
  }

  const renderCourseItem = ({ item }: { item: EnrolledBody }) => (
    <Link href={`/${item.course.courseId}`} asChild>
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
                {item.course.courseName}
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
                {item.process}%
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
                {item.course.uploadedByTeacher?.firstname}{" "}
                {item.course.uploadedByTeacher?.lastname}
              </Text>
              <TouchableOpacity
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
                  ${item.course.coursePrice}
                </Text>
              </TouchableOpacity>
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
