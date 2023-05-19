import axios from "axios";
import { BASE_URL, TOKEN_KEY_NAME } from "../constants/consts";
import { TOKEN_EXPIRED } from "../constants/backendResponses";
import noConfigAxios from "./noConfigAxios";

const refreshTokenEndpoint = BASE_URL + "/api/v1/auth/refreshToken";

async function refreshAccessToken() {
  try {
    const response = await noConfigAxios.get(refreshTokenEndpoint, { withCredentials: true });
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    let originalRequest = error.config;
    if (error.response.status === TOKEN_EXPIRED.status &&
      error.response.data === TOKEN_EXPIRED.message) {
      return refreshAccessToken()
        .then((response) => {
          sessionStorage.setItem(TOKEN_KEY_NAME, response.data.token);
          originalRequest.headers.Authorization = `Bearer ${response.data.token}`;
          return axios(originalRequest);
        });
    }

    return Promise.reject(error);
  }
)

axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(TOKEN_KEY_NAME);

    config.headers = {
      "Authorization": "Bearer " + token,
    };
    return config;
  }, (error) => {
    Promise.reject(error);
  }
);

export default axios;