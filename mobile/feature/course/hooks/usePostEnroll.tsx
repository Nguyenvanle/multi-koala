import { useEffect, useState } from "react";
import { EnrollBody } from "../types/post-enroll";
import { postEnrollCourseServices } from "../services/post-enroll";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const usePostEnroll = (courseId: string) => {
  const [postEnroll, setPostEnroll] = useState<EnrollBody>();
  const [loadingPostEnroll, setLoadingPostEnroll] = useState<boolean>(true);
  const [errorPostEnroll, setErrorPostEnroll] = useState<string | null>(null);

  const fetchPostEnroll = async () => {
    try {
      setLoadingPostEnroll(true);
      // Thay thế URL này bằng URL thực của API của bạn
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        setErrorPostEnroll("No token found. Please log in.");
        return;
      }

      const postEnroll = await postEnrollCourseServices.postEnroll(
        token,
        courseId
      );
      if (postEnroll && postEnroll.data && postEnroll.data.result) {
        setPostEnroll(postEnroll.data.result);
      } else {
        setErrorPostEnroll("Post Course failed.");
      }
    } catch (err: any) {
      setErrorPostEnroll(err); // Lấy thông báo lỗi từ Axios
    } finally {
      setLoadingPostEnroll(false);
    }
  };

  return { postEnroll, loadingPostEnroll, errorPostEnroll, fetchPostEnroll };
};
