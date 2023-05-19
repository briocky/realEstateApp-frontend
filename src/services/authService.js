import { BASE_URL } from "../constants/consts"
import noConfigAxios from "../utils/noConfigAxios";

function getNewToken() {
  const destinationUrl = BASE_URL + "/api/v1/auth/refreshToken";
  return noConfigAxios.get(destinationUrl, { withCredentials: true });
}

export { getNewToken }