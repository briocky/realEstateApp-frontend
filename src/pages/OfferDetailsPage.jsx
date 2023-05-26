import { Box, CircularProgress, Container, Divider, Paper, Typography, useMediaQuery } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import { useEffect, useState } from "react";
import { useTheme } from "@emotion/react";
import { getOfferDetails } from "../services/offerService";
import { NOT_FOUND } from "../constants/statusCodes";
import ImageCarousel from "../components/imagecarousel/ImageCarousel";
import DetailBox from "../components/offerdetails/DetailBox";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Footer from "../components/footer/Footer";
import { useAuthContext } from "../components/context/AuthContext";
import { APARTMENT, HOUSE, PLOT, RENT, SALE } from "../constants/consts";

export default function OfferDetailsPage() {
  const { user } = useAuthContext();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const [offer, setOffer] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  function getOfferTypeAsText(realEstateType) {
    let type;
    switch (realEstateType) {
      case SALE.variable:
        type = SALE.asText;
        break;
      default:
        type = RENT.asText;
        break;
    }
    return type;
  }

  function getRealEstateTypeAsText(realEstateType) {
    let type;
    switch (realEstateType) {
      case APARTMENT.variable:
        type = APARTMENT.asText;
        break;
      case PLOT.variable:
        type = PLOT.asText;
        break;
      default:
        type = HOUSE.asText;
        break;
    }
    return type;
  }

  let dataSections = [];
  if (offer !== null) {
    dataSections = [
      {
        title: "Ogólne informacje",
        icon: <InfoOutlinedIcon />,
        data: [
          ["Typ oferty", getOfferTypeAsText(offer.offerType)],
          ["Typ nieruchomości", getRealEstateTypeAsText(offer.realEstate.realEstateType)],
          ["Powierzchnia", offer.realEstate.area + " m²"],
          ["Liczba pokoi", offer.realEstate.realEstateType !== "PLOT" ? offer.realEstate.roomCount : "---"]
        ]
      },
      {
        title: "Cena",
        icon: <AttachMoneyOutlinedIcon />,
        data: [
          ["PLN", offer.price]
        ]
      },
      {
        title: "Lokalizacja",
        icon: <LocationOnOutlinedIcon />,
        data: [
          ["Miejscowość", offer.realEstate.address.place],
          ["Ulica", offer.realEstate.address.street],
          ["Województwo", offer.realEstate.address.voivodeship],
          ["Powiat", offer.realEstate.address.county],
          ["Numer", offer.realEstate.address.buildingNumber ?
            `${offer.realEstate.address.buildingNumber}
            ${offer.realEstate.address.apartmentNumber ?
              "/" + offer.realEstate.address.apartmentNumber : ""}` : "---"]
        ]
      },
      {
        title: "Dane kontaktowe",
        icon: <ConnectWithoutContactOutlinedIcon />,
        data: [
          ["Imie", offer.owner.firstName],
          ["Email", offer.owner.email],
          ["Telefon", offer.owner.phoneNumber === null ? "---" : offer.owner.phoneNumber],
          ["Z nami od", `${new Date(offer.owner.joinDate).getMonth() + 1}.${new Date(offer.owner.joinDate).getFullYear()}r.`]
        ]
      },
    ];
  }

  useEffect(() => {
    const idAsInt = parseInt(id);
    if (isNaN(idAsInt) || idAsInt < 0)
      return navigate("/notfound");

    getOfferDetails(idAsInt, user.token)
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
  }, [id, navigate, user.token]);

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Box sx={{
        backgroundColor: "#F0F7F7",
        display: "flex",
        justifyContent: "center",
        minHeight: "100vh"
      }}>
        {offer === null ? <CircularProgress sx={{ my: "auto" }} /> :
          <Paper elevation={4} sx={{ width: "80%", my: 4, p: 3 }}>
            <Box sx={{}}>
              <Typography variant="h4">{offer.title}</Typography>
            </Box>
            <Divider sx={{ mb: 3, mt: 2 }} />
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between" }}>
              <ImageCarousel images={offer.realEstate.images} />
              <Box sx={{
                width: { xs: "unset", md: "45%" },
                display: "flex", flexDirection: { xs: "row", md: "column" },
                flexWrap: "wrap", justifyContent: "space-between", mt: { xs: 2, md: 0 }
              }}>
                {dataSections.map((section, idx) => <DetailBox key={idx} title={section.title} icon={section.icon} data={section.data} />)}
              </Box>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AssignmentOutlinedIcon />
                <Typography sx={{ ml: 1 }} variant="h6" color="grey">Opis oferty</Typography>
              </Box>
              <Box>
                <Typography variant="p">
                  {offer.realEstate.description === "" ?
                    "Użytkownik nie zamieścił jeszcze opisu" : offer.realEstate.description}
                </Typography>
              </Box>
            </Box>
          </Paper>
        }
      </Box>
      <Footer />
    </Container>
  );
}