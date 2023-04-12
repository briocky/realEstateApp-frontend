import axios from "axios";
import { BASE_URL } from '../constants/backendConsts'

function getBasicUserInfo(token) {
    const destinationUrl = BASE_URL + "/api/v1/user/info";
    return axios.get(
        destinationUrl,
        { headers: { "Authorization": "Bearer " + token } }
    );
}

export { getBasicUserInfo }