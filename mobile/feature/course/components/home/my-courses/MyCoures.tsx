import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Colors } from "@/constants/Colors";
import { text } from "@/constants/Styles";
import { Link, router } from "expo-router";
import { useEnrolled } from "../../../hooks/useEnrrolled";
import { EnrolledBody } from "../../../types/course-enrolled";

const MyCourses = () => {
  const { enrolled, errorMessage, loading } = useEnrolled();

  if (loading) {
    return (
      <View style={{ paddingTop: 16, justifyContent: "center" }}>
        <ActivityIndicator color={Colors.teal_dark} />
      </View>
    );
  }
  const renderCourseItem = ({ item }: { item: EnrolledBody }) => (
    <Link href={`/${item.course.courseId}`} asChild>
      <TouchableOpacity style={styles.courseContainer}>
        <Image
          source={{
            uri:
              item?.course?.image?.imageUrl ||
              "https://img.freepik.com/free-vector/faqs-concept-illustration_114360-5215.jpg?t=st=1732892833~exp=1732896433~hmac=f12b1f3fbbb20b6e374e81fb1d3283827dcf73904ef5d6c29434936df1b0432b&w=826",
          }}
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
      {enrolled ? (
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={enrolled}
          renderItem={renderCourseItem}
          keyExtractor={(item, index) => item.course.courseId}
          style={{ paddingHorizontal: 16 }}
        />
      ) : (
        ""
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
    paddingHorizontal: 8,
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
    fontWeight: "400",
  },
  containerText: {
    overflow: "hidden",
    width: 170,
    paddingTop: 8,
  },
  clampedText: {
    // Styles can be adjusted according to your needs
    ...text.p,
    color: Colors.black,
    fontWeight: "500",
  },
});

export default MyCourses;
