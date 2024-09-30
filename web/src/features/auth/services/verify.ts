import { apiService } from "@/services/api";

export const verifyServices = {
  sendOTP: async (email: string) => {
    return await apiService.post(`/emails/${email}/send-OTP`);
  },

  verifyOTP: async (email: string, otp: string) => {
    return await apiService.post(`/emails/${email}/verify-OTP/${otp}`);
  },
};
