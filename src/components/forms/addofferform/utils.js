function buildOfferData(basicInfo, additionalInfo) {
    let offerData = {
        offerTitle: basicInfo.offerTitle.value,
        offerType: basicInfo.offerType.value,
        offerPrice: basicInfo.price.value,
        realEstate: {
            realEstateType: basicInfo.realEstateType.value,
            roomCount: basicInfo.roomCount.value,
            area: basicInfo.area.value,
            address: {
                place: additionalInfo.place.value,
                street: additionalInfo.street.value,
                voivodeship: additionalInfo.voivodeship.value,
                county: additionalInfo.county.value,
                buildingNumber: additionalInfo.buildingNumber.value !== "" ?
                    additionalInfo.buildingNumber.value : null,
                apartmentNumber: additionalInfo.apartmentNumber.value !== "" ?
                    additionalInfo.apartmentNumber.value : null,
            },
            description: additionalInfo.description.value,
        }
    }

    return offerData;
}

export { buildOfferData }