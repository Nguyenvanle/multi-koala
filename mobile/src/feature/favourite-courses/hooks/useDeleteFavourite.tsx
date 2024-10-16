import { useGlobalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { CourseDelete } from "../types/favourite-course";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CourseDeleteService } from "../services/favourite-delete";

const useDeleteCourse = () => {
  const favouriteId = useGlobalSearchParams();
  const favouriteIdString = Array.isArray(favouriteId)
    ? favouriteId[0]
    : favouriteId;
  const [loadingDelete, setLoadingDelete] = useState<boolean>(true);
  const [errorDeleteMessage, setErrorDeleteMessage] = useState<string>("");
  const [deleteCourse, setDeleteCourse] = useState<CourseDelete>();

  useEffect(() => {
    const fetchDeleteCourse = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) return;
        // Lấy thông tin khóa học yêu thích từ server
        const result = await CourseDeleteService.deleteCourse(
          favouriteIdString,
          token
        );

        // Kiểm tra kết quả từ API
        if (result && result.data && result.data.message) {
          //Kiểm tra giá trị của message
          if (result.data.message === null) {
            setErrorDeleteMessage(
              "Can not delete favourite in this course. Please try again."
            );
          } else {
            setErrorDeleteMessage("Delete completed!");
          }
        } else {
          setErrorDeleteMessage("Invalid delete course from this server.");
        }
      } catch (error) {
        // console.log(error.message || "Error fetching delete favourite course.");
      } finally {
        setLoadingDelete(false);
      }
    };

    fetchDeleteCourse();
  }, [favouriteIdString]);

  return {
    loadingDelete,
    errorDeleteMessage,
    deleteCourse,
  };
};

export default useDeleteCourse;
