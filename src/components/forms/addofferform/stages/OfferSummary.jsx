import { Box, Divider, Typography } from "@mui/material";

export default function OfferSummary({ basicInfo, additionalInfo }) {
  return (
    <Box>
      <Box display={"flex"} flexDirection={"column"}>
        <Typography variant="h6">Podstawowe informacje:</Typography>
        <Divider sx={{my: 1}}/>
        <Typography variant="p">Tytuł oferty: <strong>{basicInfo.offerTitle.value}</strong></Typography>
        <Typography variant="p">Typ oferty: <strong>{basicInfo.offerType.value}</strong></Typography>
        <Typography variant="p">Typ nieruchomości: <strong>{basicInfo.realEstateType.value}</strong></Typography>
        <Typography variant="p">Liczba pokoi: <strong>{basicInfo.roomCount.value}</strong></Typography>
        <Typography variant="p">Cena: <strong>{basicInfo.price.value} zł</strong></Typography>
        <Typography variant="p">Powierzchnia: <strong>{basicInfo.area.value} ㎡</strong></Typography>
      
        <Typography variant="h6" mt={2}>Dodatkowe informacje:</Typography>
        <Divider sx={{my: 1}}/>
        <Typography variant="p">Miejscowość: <strong>{additionalInfo.place.value}</strong></Typography>
        <Typography variant="p">Województwo: <strong>{additionalInfo.voivodeship.value}</strong></Typography>
        <Typography variant="p">Powiat: <strong>{additionalInfo.county.value}</strong></Typography>
        <Typography variant="p">Ulica: <strong>{additionalInfo.street.value}</strong></Typography>
        <Typography variant="p">Numery budynku: <strong>{additionalInfo.buildingNumber.value}</strong></Typography>
        <Typography display={basicInfo.realEstateType.value !== "mieszkanie" && 'none'} variant="p">Numer mieszkania: <strong>{additionalInfo.apartmentNumber.value}</strong></Typography>
        <Typography variant="p">Opis: {additionalInfo.description.value === "" && <i>Brak opisu</i>}<strong>{additionalInfo.description.value}</strong></Typography>
      </Box>
    </Box>
  );
}
