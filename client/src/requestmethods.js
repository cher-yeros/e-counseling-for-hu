import axios from "axios";

const BASE_URL = "http://localhost:5000/v1/api/";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;

const currentUser = user && JSON.parse(user).currentUser;
var TOKEN = currentUser?.accessToken;
export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  // TOKEN: currentUser?.accessToken,
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});
