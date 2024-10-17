import { useEffect, useState } from "react";
import { CourseDetailsBody } from "../types/course-details";
import { detailsServices } from "../services/course-details";

export const useDetails = (courseId: string) => {
  const [courseDetails, setCourseDetails] = useState<CourseDetailsBody>();
  const [errorMessageDetails, setErrorMessageDetails] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const getCourseDetails = await detailsServices.getdetails({ courseId });
        if (getCourseDetails.data.result) {
          setCourseDetails(getCourseDetails.data.result);
          console.log(getCourseDetails.data.result);
        } else {
          setErrorMessageDetails("Get course detail failed.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  return { courseDetails, errorMessageDetails, loading };
};
