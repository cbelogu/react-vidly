import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode";
const tokenKey = 'token';

http.setJwt(getAuthToken());

export async function login(email, password) {
  const { data: jwt } = await http.post(config.apiEndPointAuth, {
    email,
    password
  });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(token) {
  localStorage.setItem(tokenKey, token);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function logout(){
  localStorage.removeItem(tokenKey);
}

export function getAuthToken() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  getCurrentUser,
  getAuthToken,
  logout
};
