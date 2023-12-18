import axios from "axios";
const BASE_URL = "http://localhost:5000";

export const LOGIN_URL = "/api/v1/users/login";
export const REFRESH_TOKEN = "/api/v1/users/refresh";
export const newStore = "http://localhost:5000/api/v1/stores";
export const vsStore = "/api/v1/orders/visite";
export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});

export async function addStore(data) {
  return axiosPrivate.post(newStore, data);
}
export async function visiteStore(data) {
  return axiosPrivate.post(vsStore, data);
}
export async function availabelStores(data) {
  const dt = { wilaya: data[0], commune: data[1] };

  return axiosPrivate.post("/api/v1/stores/availabelstores", dt);
}
