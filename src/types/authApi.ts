import apiClient from "./todoApi";
import type { User } from "./todoApi";

export async function checkTokenValid(): Promise<User | null> {
  try {
    const res = await apiClient.get("/auth/");
    if (res.status !== 200) {
      return null;
    }
    if (!res.data || !res.data.user) {
      return null;
    }
    return res.data.user as User;
  } catch {
    return null;
  }
}
