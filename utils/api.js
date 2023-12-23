import axios from "axios";
// const BASE_URL = "http://localhost:5000";
const BASE_URL = "https://dd-g1u8exm04-jakaissa.vercel.app/";

export const LOGIN_URL = "/api/v1/users/login";
export const REFRESH_TOKEN = "/api/v1/users/refresh";
export const newStore = "/api/v1/stores";
export const vsStore = "/api/v1/orders/visite";
export const newOrder = "/api/v1/orders";
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
export async function addOrder(data) {
  return axiosPrivate.post(newOrder, data);
}
