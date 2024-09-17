// api/courses.ts
import AsyncStorage from "@react-native-async-storage/async-storage";
import API_MAIN from "@/src/feature/api/config";

export const fetchCourseDetails = async (courseId: string) => {
  try {
    const token = await AsyncStorage.getItem("token");

    if (!token) {
      throw new Error("Không tìm thấy token. Vui lòng đăng nhập.");
    }

    const response = await API_MAIN.get(`/courses/{courseId}`);

    if (response.data.code === 200) {
      return response.data.result;
    } else {
      throw new Error(
        response.data.message || "Không thể tải thông tin khóa học."
      );
    }
  } catch (error) {
    console.error("Lỗi khi tải thông tin khóa học:", error);
    throw error;
  }
};
