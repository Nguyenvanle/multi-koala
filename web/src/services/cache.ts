// src/services/api/cache.ts
import { API_CONFIG } from "@/types/api/config";

export class ApiCache {
  private cache = new Map<
    string,
    { data: ApiResponse<any>; timestamp: number }
  >();

  public get<T>(key: string): ApiResponse<T> | null {
    const cachedItem = this.cache.get(key);
    if (!cachedItem) return null;

    const now = Date.now();
    if (now - cachedItem.timestamp < API_CONFIG.cacheDuration) {
      return cachedItem.data;
    }

    this.cache.delete(key);
    return null;
  }

  public set<T>(key: string, data: ApiResponse<T>): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  public clear(): void {
    this.cache.clear();
  }
}
