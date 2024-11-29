import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import { Link } from "expo-router";
import { useCourse } from "../../../hooks/useCourse";
import useUser from "@/feature/user/hooks/useUser";
import { CourseBody } from "../../../types/course";
import { useEnrolled } from "../../../hooks/useEnrrolled";
import { useRecommendCourse } from "../../../hooks/useRecommendCourse";
import { ResultBody } from "../../../types/recommend-course";

const NewCourses = () => {
  const { course, loading, errorMessage } = useCourse();
  const { recommend, errorMessageRecommend, loadingRecommend } =
    useRecommendCourse();
  const { user } = useUser();
  const { enrolled } = useEnrolled();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator color={Colors.teal_dark} />
      </View>
    );
  }

  if (errorMessage) {
    return (
      <Text style={{ ...text.large, color: Colors.red, fontWeight: "400" }}>
        {errorMessage}
      </Text>
    );
  }

  const getFilteredCourses = (courses, enrolled, user) => {
    const enrolledCourseIds = Array.isArray(enrolled)
      ? enrolled.map((enrolledCourse) => enrolledCourse.course.courseId)
      : [];

    const filteredCourses = courses?.filter((item) => {
      return !enrolledCourseIds.includes(item.courseId);
    });

    const numberOfCoursesToShow = user ? 10 : 5;
    return filteredCourses?.slice(0, numberOfCoursesToShow);
  };

  const coursesToShow = getFilteredCourses(course, enrolled, user);

  const renderCourseItem = ({ item }: { item: ResultBody }) => (
    <View style={styles.container}>
      <Link href={`/${item.courseId}`} asChild>
        <TouchableOpacity style={styles.courseContainer}>
          <Image
            source={{
              uri:
                item?.image?.imageUrl ||
                "https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5215.jpg?t=st=1732892833~exp=1732896433~hmac=f12b1f3fbbb20b6e374e81fb1d3283827dcf73904ef5d6c29434936df1b0432b&w=826",
            }}
            style={styles.courseImage}
          />
          <View style={styles.containerText}>
            <Text style={styles.clampedText} numberOfLines={2}>
              {item.courseName}
            </Text>
            <View style={{ paddingTop: 8 }}>
              <Text style={styles.priceText}>Enroll Now</Text>
            </View>
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );

  return (
    <View>
      {user && enrolled?.length > 0 ? (
        <View style={{ height: 270, paddingTop: 8, top: 100 }}>
          <FlatList
            data={Array.isArray(recommend) ? recommend : []} // Ensure recommend is an array
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={{ height: 600 }}>
          <FlatList
            data={coursesToShow}
            renderItem={renderCourseItem}
            keyExtractor={(item) => item.courseId}
            showsVerticalScrollIndicator={false}
            style={{ minHeight: 300 }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  price: {
    ...text.large,
    color: Colors.teal_dark,
    fontWeight: "300",
    paddingTop: 8,
  },
  courseContainer: {
    justifyContent: "flex-start",
    backgroundColor: Colors.white,
    flexDirection: "row",
    width: 350,
    borderRadius: 15,
    padding: 8,
    marginBottom: 16,
  },
  courseImage: {
    width: 110,
    height: 100,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  container: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  containerText: {
    overflow: "hidden",
    width: 170,
    padding: 8,
  },
  clampedText: {
    ...text.large,
    color: Colors.black,
    fontWeight: "400",
  },
  priceText: {
    ...text.p,
    color: Colors.teal_dark,
    fontWeight: "400",
  },
  duration: {
    ...text.small,
    color: Colors.dark_grey,
  },
  image: {
    width: 170,
    height: 140,
    borderRadius: 15,
    borderColor: Colors.grey,
    borderWidth: 1,
  },
});

export default NewCourses;
