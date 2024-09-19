import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import API_MAIN from "./config";

const CourseAPI = async () => {
  const response = await API_MAIN.get("/courses");

  if (response.data.code === 200) {
    return response.data.result;
  } else {
    throw new Error(response.data.message || "Failed to fetch course data.");
  }
};
export default CourseAPI;
