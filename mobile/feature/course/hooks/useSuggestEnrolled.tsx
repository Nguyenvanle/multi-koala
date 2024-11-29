import { useEffect, useState } from "react";
import { SuggestEnrolled } from "../types/enrolled";
import { SuggestEnrolledServices } from "../services/enrolled";
import SuggestCourse from "../components/courses/suggest-course/suggest-course";

export const useSuggestEnroll = () => {
  const [suggestEnroll, setSuggestEnroll] = useState<SuggestEnrolled>(null);
  const [errorMessageSE, setErrorMessageSE] = useState<string>("");
  const [loadingSE, setLoadingSE] = useState<boolean>(true);

  const fetchCourseDetails = async (enrollId: string) => {
    try {
      setLoadingSE(true);
      const getSE = await SuggestEnrolledServices.getEnrolled({
        enrollId,
      });
      console.log("Suggest", getSE);
      if (getSE && getSE.data && getSE.data.result) {
        const result = getSE.data;
        setSuggestEnroll(result);
        <SuggestCourse />;
      } else {
        setErrorMessageSE("Get course detail failed.");
      }
    } catch (error) {
      setErrorMessageSE("An error occurred while fetching course details.");
    } finally {
      setLoadingSE(false);
    }
  };

  return { suggestEnroll, errorMessageSE, loadingSE, fetchCourseDetails };
};
