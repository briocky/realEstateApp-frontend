import { BASE_URL } from "../constants/consts";
import tokenAxios from '../utils/tokenAxios';
import noConfigAxios from "../utils/noConfigAxios";

function addOffer(offerData, realEstatePictures) {
  const destinationUrl = BASE_URL + "/api/v1/offer/add";
  const offerFormData = new FormData();

  offerFormData.append("offerData",
    new Blob([JSON.stringify(offerData)], { type: 'application/json' }));
  realEstatePictures.forEach((picture) => {
    offerFormData.append("picture", picture.file);
  });

  return tokenAxios.post(
    destinationUrl,
    offerFormData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );
}

function searchOffers(searchData, params) {
  const destinationUrl = BASE_URL + "/api/v1/offer/search";
  return noConfigAxios.post(
    destinationUrl,
    !searchData ? {} : searchData,
    { params: params ? params : null }
  );
}

function getOfferDetails(offerId) {
  const destinationUrl = BASE_URL + "/api/v1/offer/" + offerId;
  return tokenAxios.get(
    destinationUrl
  );
}

export { addOffer, searchOffers, getOfferDetails }