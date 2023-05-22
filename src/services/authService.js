import { BASE_URL } from "../constants/consts"
import noConfigAxios from "../utils/noConfigAxios";

function getNewToken() {
  const destinationUrl = BASE_URL + "/api/v1/auth/refreshToken";
  return noConfigAxios.get(destinationUrl, { withCredentials: true });
}

function authenticate(loginData) {
  const destinationUrl = BASE_URL + "/api/v1/auth/login";
  return noConfigAxios.post(destinationUrl, loginData, { withCredentials: true });
}

function register(registerData) {
  const destinationUrl = BASE_URL + "/api/v1/auth/register";
  return noConfigAxios.post(destinationUrl, registerData);
}

export { getNewToken, authenticate, register }