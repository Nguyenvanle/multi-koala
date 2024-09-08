// src/services/api/config.ts
export const API_CONFIG = {
  baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  cacheDuration: 5 * 60 * 1000, // 5 minutes in milliseconds
  cachableEndpoints: ["/courses", "/lessons", "/students"],
};
