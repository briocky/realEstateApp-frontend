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

function getOfferDetails(offerId, token) {
  const destinationUrl = BASE_URL + "/api/v1/offer/" + offerId;
  if (token)
    return tokenAxios.get(destinationUrl);
  else
    return noConfigAxios.get(destinationUrl);
}

function getOfferDetailsToEdit(offerId) {
  const destinationUrl = BASE_URL + "/api/v1/offer/toEdit/" + offerId;
  return tokenAxios.get(destinationUrl);
}

function getMyOffers(params) {
  const destinationUrl = BASE_URL + "/api/v1/offer/my";
  return tokenAxios.get(destinationUrl, { params: params });
}

function deleteOffer(id) {
  const destinationUrl = BASE_URL + "/api/v1/offer/delete/" + id;
  return tokenAxios.delete(destinationUrl);
}

function editOfferDetails(id, offerData) {
  const destinationUrl = BASE_URL + "/api/v1/offer/edit/" + id;
  return tokenAxios.put(destinationUrl, offerData);
}

export { addOffer, searchOffers, getOfferDetails, getMyOffers, deleteOffer, editOfferDetails, getOfferDetailsToEdit }