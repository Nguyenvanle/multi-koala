import API_CONFIG from "@/types/config";
import { ResultRes, SignUpRes } from "../types/signup";

export const signUpServices = {
  signUp: async (data: SignUpRes) => {
    return await API_CONFIG.post<ResultRes>("/students", data);
  },
};
