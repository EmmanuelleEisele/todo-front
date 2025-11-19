import apiClient from "./todoApi";

export async function fetchTasksByDay() {
  const res = await apiClient.get("/stats/taskByDay");
  return res.data.stats;
}

export async function fetchTasksByWeek() {
  const res = await apiClient.get("/stats/taskByWeek");
  return res.data.stats;
}

export async function fetchTasksByMonth() {
  const res = await apiClient.get("/stats/taskByMonth");
  return res.data.stats;
}

export async function fetchTasksByYear() {
  const res = await apiClient.get("/stats/taskByYear");
  return res.data.stats;
}
