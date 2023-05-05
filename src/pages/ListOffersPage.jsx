import { useTheme } from "@emotion/react"
import { Alert, Box, Button, Container, Grid, Pagination, Paper, Typography, useMediaQuery } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import OffersListItem from "../components/offerslistitem/OffersListItem";
import { useEffect, useState } from "react";
import { searchOffers } from "../services/offerService";
import { useLocation } from "react-router-dom";

const OFFERS_PER_PAGE = 10;

function mapOffers(offers) {
  return offers.map((offer, index) =>
    <Grid item xs={12} key={index}>
      <OffersListItem elementData={offer} />
    </Grid>
  );
}

export default function ListOffersPage() {
  const location = useLocation();
  const [offers, setOffers] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState(location.state);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    let queryParams = {
      page: currentPage - 1,
      pageSize: OFFERS_PER_PAGE
    };

    searchOffers(searchCriteria, queryParams)
      .then((response) => {
        let fetchedOffers = [];
        response.data.offers.forEach(offer => {
          fetchedOffers.push(offer);
        });
        setOffers(fetchedOffers);
        setTotalPages(response.data.totalPages);
      });
  }, [searchCriteria, currentPage]);

  function handlePageChange(event, page) {
    setCurrentPage(page);
  }

  return (
    <Container maxWidth={false} disableGutters>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}

      <Box display="flex" justifyContent={"center"} mt={4}>
        <Paper elevation={4}
          sx={{
            width: { xs: "100%", sm: "80%", md: "70%" },
            py: { xs: "3rem" },
            px: { xs: "2.5rem", md: "4rem" },
            mb: 2
          }}
        >
          <Grid container spacing={2} rowSpacing={{ xs: 2, sm: 4 }}>
            <Grid item xs={12} display={"flex"} justifyContent={"space-between"}>
              <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography fontFamily={"poppins"} fontSize={{ xs: 23, sm: 25, md: 28 }}>
                  Lista ofert
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
                <Alert severity="warning">Nie znaleziono ofert o podanych kryteriach!</Alert>
              </Grid>
            }
            {mapOffers(offers)}
            <Grid item xs={12} display={"flex"} justifyContent={"center"}>
              <Pagination sx={{ mt: 3 }} count={totalPages} color="primary" onChange={handlePageChange} />
            </Grid>
          </Grid>

        </Paper>
      </Box>

    </Container>
  )
}