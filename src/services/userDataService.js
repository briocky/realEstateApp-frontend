import tokenAxios from '../utils/tokenAxios';
import { BASE_URL } from '../constants/consts'

function getBasicUserInfo() {
    const destinationUrl = BASE_URL + "/api/v1/user/info";
    return tokenAxios.get(
        destinationUrl
    );
}

function getProfileData() {
    const destinationUrl = BASE_URL + "/api/v1/user/profile";
    return tokenAxios.get(
        destinationUrl
    );
}

function updateProfileData(data) {
    const destinationUrl = BASE_URL + "/api/v1/user/profile/change/" + data.id;
    return tokenAxios.put(destinationUrl, data);
}

export { getBasicUserInfo, getProfileData, updateProfileData }