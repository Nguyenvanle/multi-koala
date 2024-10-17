import { useEffect, useState } from "react";
import { CourseDetailsBody } from "../types/course-details";
import { detailsServices } from "../services/course-details";

export const useDetails = (courseId: string) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetailsBody | null>(
    null
  );
  const [errorMessageDetails, setErrorMessageDetails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const getCourseDetails = await detailsServices.getdetails({ courseId });
        if (getCourseDetails.data.result) {
          const result = getCourseDetails.data.result;

          // Chuyển đổi courseResponsibilityEndAt thành Date
          const updatedCourseDetails: CourseDetailsBody = {
            ...result,
            courseResponsibilityEndAt: new Date(
              result.courseResponsibilityEndAt
            ).toLocaleDateString(), // Hoặc sử dụng toLocaleDateString() nếu cần
          };

          setCourseDetails(updatedCourseDetails);
        } else {
          setErrorMessageDetails("Get course detail failed.");
        }
      } catch (error) {
        setErrorMessageDetails(
          "An error occurred while fetching course details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { courseDetails, errorMessageDetails, loading };
};
