import API_CONFIG from "@/src/types/api/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const CourseAPI = async () => {
  const response = await API_CONFIG.get("/courses");

  if (response.data.code === 200) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || "Failed to fetch course data.");
  }
};
export default CourseAPI;
