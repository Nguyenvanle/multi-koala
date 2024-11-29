import { useEffect, useState } from "react";
import { SuggestEnrolled } from "../types/enrolled";
import { SuggestEnrolledServices } from "../services/enrolled";

export const useSuggestEnroll = () => {
  const [suggestEnroll, setSuggestEnroll] = useState<SuggestEnrolled>(null);
  const [errorMessageSE, setErrorMessageSE] = useState<string>("");
  const [loadingSE, setLoadingSE] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourseDetails = async (enrollId: string) => {
      try {
        setLoadingSE(true);
        const getSE = await SuggestEnrolledServices.getEnrolled({
          enrollId,
        });
        if (getSE && getSE.data && getSE.data.result) {
          const result = getSE.data;

          setSuggestEnroll(result);
        } else {
          setErrorMessageSE("Get course detail failed.");
        }
      } catch (error) {
        setErrorMessageSE("An error occurred while fetching course details.");
      } finally {
        setLoadingSE(false);
      }
    };
  }, []);

  return { suggestEnroll, errorMessageSE, loadingSE };
};
