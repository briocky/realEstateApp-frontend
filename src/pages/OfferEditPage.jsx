

import { Alert, Box, Button, Container, Divider, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";
import { editOfferDetails, getOfferDetailsToEdit } from "../services/offerService";
import { useNavigate, useParams } from "react-router";
import { NOT_FOUND } from "../constants/statusCodes";
import { APARTMENT, PLOT } from "../constants/consts";


export default function OfferEditPage() {
  const [alert, setAlert] = useState({ type: "success", message: "", show: false, duration: 4000 });
  const [offer, setOffer] = useState({});
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const { id } = useParams();
  const navigate = useNavigate();
  const placeInput = "placeInput", streetInput = "streetInput",
    voivodeshipInput = "voivodeshipInput", buildingNumberInput = "buildingNumberInput",
    apartmentNumberInput = "apartmentNumberInput", priceInput = "priceInput", roomCountInput = "roomCountInput",
    areaInput = "areaInput", descriptionInput = "descriptionInput", countyInput = "countyInput";

  function handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case placeInput:
        setOffer({ ...offer, place: value });
        break;
      case streetInput:
        setOffer({ ...offer, street: value });
        break;
      case buildingNumberInput:
        setOffer({ ...offer, buildingNumber: value });
        break;
      case apartmentNumberInput:
        setOffer({ ...offer, apartmentNumber: value });
        break;
      case voivodeshipInput:
        setOffer({ ...offer, voivodeship: value });
        break;
      case priceInput:
        setOffer({ ...offer, price: value });
        break;
      case roomCountInput:
        setOffer({ ...offer, roomCount: value });
        break;
      case areaInput:
        setOffer({ ...offer, area: value });
        break;
      case countyInput:
        setOffer({ ...offer, county: value });
        break;
      default:
        setOffer({ ...offer, description: value });
        break;

    }
  }

  function handleSubmit() {
    const idAsInt = parseInt(id);
    if (isNaN(idAsInt) || idAsInt < 0)
      return navigate("/notfound");

    editOfferDetails(idAsInt, offer).then(response => {
      setAlert({ ...alert, type: "success", message: "Oferta zaktualizowana!", show: true });
      setTimeout(() => setAlert({ ...alert, show: false }), alert.duration);
    }, error => {
      setAlert({ ...alert, type: "error", message: "Wystąpił problem podczas aktualizacji ogłoszenia!", show: true });
      setTimeout(() => setAlert({ ...alert, show: false }), alert.duration);
    });
  }

  useEffect(() => {
    const idAsInt = parseInt(id);
    if (isNaN(idAsInt) || idAsInt < 0)
      return navigate("/notfound");

    getOfferDetailsToEdit(idAsInt)
      .then((response) => {
        setOffer(response.data);
      }, (error) => {
        if (!error.response) {
          return navigate("/notfound", {
            state: {
              message: "Wystąpił problem podczas łączenia z serwerem",
              status: error.code
            }
          });
        }
        if (error.response.status === NOT_FOUND) {
          return navigate("/notfound", {
            state: {
              message: "Brak oferty o podanym ID",
              status: NOT_FOUND
            }
          });
        }
      })
  }, [id, navigate]);

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Paper sx={{ width: { xs: "90%", md: "50%" }, m: "auto" }}>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h5">Dane oferty</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3, mt: 1 }}>
          <Divider sx={{ width: "80%" }} />
        </Box>
        {alert.show &&
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Box>}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", px: 5 }}>
          <TextField name={placeInput} label="Miejscowość" variant="outlined"
            value={offer.place || ""} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={streetInput} label="Ulica" variant="outlined"
            value={offer.street || ""} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={voivodeshipInput} label="Województwo" variant="outlined"
            value={offer.voivodeship || ""} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={countyInput} label="Powiat" variant="outlined"
            value={offer.county || ""} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={buildingNumberInput} label="Numer budynku"
            variant="outlined" onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }}
            value={offer.buildingNumber || ""} InputLabelProps={{ shrink: true }} />
          <TextField name={apartmentNumberInput} label="Numer mieszkania"
            value={offer.apartmentNumber || ""} variant="outlined"
            InputLabelProps={{ shrink: true }} disabled={offer.realEstateType !== APARTMENT.variable}
            sx={{ mb: 2, mr: 2 }} onChange={(e) => handleInput(e)} />
          <TextField label="Cena" name={priceInput}
            value={offer.price || ""} variant="outlined" sx={{ mb: 2, mr: 2 }}
            InputLabelProps={{ shrink: true }} type="number"
            onChange={(e) => handleInput(e)} />
          <TextField name={roomCountInput} label="Liczba pokoi" variant="outlined"
            value={offer.roomCount || ""} InputLabelProps={{ shrink: true }}
            type="number" disabled={offer.realEstateType === PLOT.variable}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField label="Powierzchnia"
            value={offer.area || ""} variant="outlined" sx={{ mb: 2, mr: 2 }}
            InputLabelProps={{ shrink: true }} type="number" name={areaInput}
            onChange={(e) => handleInput(e)} />
          <TextField label="Opis"
            value={offer.description || ""} variant="outlined" sx={{ mb: 2, mr: 2 }}
            InputLabelProps={{ shrink: true }} type="text" multiline minRows={4}
            onChange={(e) => handleInput(e)} name={descriptionInput} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button variant="outlined" onClick={handleSubmit}>Zapisz zmiany</Button>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
}
