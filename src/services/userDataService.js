import tokenAxios from '../utils/tokenAxios';
import { BASE_URL } from '../constants/consts'

function getBasicUserInfo() {
    const destinationUrl = BASE_URL + "/api/v1/user/info";
    return tokenAxios.get(
        destinationUrl
    );
}

export { getBasicUserInfo }