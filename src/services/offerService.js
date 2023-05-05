import axios from "axios";
import { BASE_URL } from "../constants/backendConsts";

function addOffer(token, offerData, realEstatePictures) {
  const destinationUrl = BASE_URL + "/api/v1/offer/add";
  const offerFormData = new FormData();

  offerFormData.append("offerData",
    new Blob([JSON.stringify(offerData)], { type: 'application/json' }));
  realEstatePictures.forEach((picture) => {
    offerFormData.append("picture", picture.file);
  });

  return axios.post(
    destinationUrl,
    offerFormData,
    {
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "multipart/form-data"
      }
    }
  );
}

function searchOffers(searchData, params) {
  const destinationUrl = BASE_URL + "/api/v1/offer/search";
  return axios.post(
    destinationUrl,
    !searchData ? {} : searchData,
    { params: params ? params : null }
  );
}

export { addOffer, searchOffers }