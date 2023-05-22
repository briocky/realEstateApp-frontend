import { getMyOffers } from "../services/offerService";
import { useTheme } from "@emotion/react"
import { Alert, Box, Button, Container, Grid, IconButton, Pagination, Paper, Snackbar, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import OffersListItem from "../components/offerslistitem/OffersListItem";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import CloseIcon from '@mui/icons-material/Close';

const OFFERS_PER_PAGE = 10;


export default function ListMyOffersPage() {
  const [popup, setPopup] = useState({ message: "", show: false });
  const [offers, setOffers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    let queryParams = {
      page: currentPage - 1,
      pageSize: OFFERS_PER_PAGE
    };

    getMyOffers(queryParams).then((response) => {
      let fetchedOffers = [];
      response.data.offers.forEach(offer => {
        fetchedOffers.push(offer);
      });
      setOffers(fetchedOffers);
      setTotalPages(response.data.totalPages);
    });

  }, [currentPage]);

  function handlePageChange(event, page) {
    setCurrentPage(page);
  }

  function deleteOffer(id) {
    let updatedOffers = offers.filter((offer) => offer.id !== id);
    if (offers.length - 1 === 0) {
      setTotalPages(0);
    }
    setOffers(updatedOffers);
    setPopup({ ...popup, message: "Pomyślnie usunięto!", show: true })
  }

  function handlePopupClose() {
    setPopup({ ...popup, show: false });
  }

  function mapOffers(offers) {
    return offers.map((offer, index) =>
      <Grid item xs={12} key={index}>
        <OffersListItem elementData={offer} myOffersList={true} deleteOfferFromList={deleteOffer} />
      </Grid>
    );
  }

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}

      <Snackbar
        open={popup.show}
        autoHideDuration={4000}
        onClose={handlePopupClose}
        message={popup.message}
        action={
          <IconButton onClick={handlePopupClose} color="error">
            <CloseIcon />
          </IconButton>
        }
      />

      <Box display="flex" justifyContent={"center"} pt={4} sx={{ backgroundColor: "#F0F7F7", minHeight: "90vh" }}>
        <Paper elevation={4}
          sx={{
            width: { xs: "100%", sm: "80%", md: "70%" },
            py: { xs: "3rem" },
            px: { xs: "2.5rem", md: "4rem" },
            mb: 2,
            height: "fit-content"
          }}
        >
          <Grid container spacing={2} rowSpacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography fontFamily={"poppins"} fontSize={{ xs: 23, sm: 25, md: 28 }}>
                  Moje oferty
                </Typography>
                <Box
                  sx={{ backgroundColor: theme.palette.primary.main, width: "100%", height: "4px" }}
                />
              </Box>
              <Box>
                <Button variant="contained">
                  <FilterAltIcon />
                  <Box ml={1}>Filtry</Box>
                </Button>
              </Box>
            </Grid>
            {totalPages === 0 &&
              <Grid item xs={12} display={"flex"} justifyContent={"center"}>
                <Alert severity="warning">Nie masz żadnych ofert wystawionych!</Alert>
              </Grid>
            }
            {mapOffers(offers)}
            <Grid item xs={12} display={"flex"} justifyContent={"center"}>
              <Pagination sx={{ mt: 3 }} count={totalPages} color="primary" onChange={handlePageChange} />
            </Grid>
          </Grid>

        </Paper>
      </Box>
      <Footer />
    </Container>
  );
}