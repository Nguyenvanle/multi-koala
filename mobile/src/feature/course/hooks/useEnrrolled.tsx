import { useEffect, useState } from "react";

import { EnrolledBodyList } from "../types/course-enrolled";
import { enrolledServices } from "../services/course-enrolled";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useEnrolled = (courseId: string) => {
  const [enrolled, setEnrolled] = useState<EnrolledBodyList>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        setLoading(true);
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          setErrorMessage("No token found. Please log in.");
          return;
        }
        console.log(token);

        const course = await enrolledServices.getenrolled({ token }); // Sửa dòng này
        if (course.data.result) {
          setEnrolled(course.data.result);
          console.log(course.data.result);
        } else {
          setErrorMessage("Get course failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    getCourse(); // Gọi hàm getRating
  }, []); // Thêm courseId vào dependency array

  return { enrolled, errorMessage, loading }; // Trả về giá trị
};
