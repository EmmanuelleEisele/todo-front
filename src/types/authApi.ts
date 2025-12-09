import apiClient from "./todoApi";
import type { User } from "./todoApi";

export async function checkTokenValid(): Promise<User | null> {
  try {
    const res = await apiClient.get("/auth/");
    return res.data.user as User;
  } catch {
    return null;
  }
}
