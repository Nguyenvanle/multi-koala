import API_CONFIG from "@/src/types/api/config";

const CourseAPI = async () => {
  const response = await API_CONFIG.get("/courses/approved-courses");

  if (response.data.code === 200) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || "Failed to fetch course data.");
  }
};
export default CourseAPI;
