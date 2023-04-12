import {
  Alert,
  Box,
  Container,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import AddOfferForm from "../components/forms/addofferform/AddOfferForm";
import { useState } from "react";

export default function AddOfferPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const [alertMessage, setAlertMessage] = useState("");

  return (
    <Container maxWidth={false} disableGutters>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          mx: "auto",
          position: 'relative'
        }}
      >
        { alertMessage !== "" && 
          <Alert severity="error" 
            sx={{position: 'absolute', top: {xs: 0, sm: "0.5rem"}}}>
              {alertMessage}
          </Alert>
        }
        <Paper elevation={3} sx={{ my: {xs: 0, sm: 10 }, p: { xs: 2, sm: 5 }, width: { xs: "100%", sm: "80%", md: "65%"} }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "fit-content",
            }}
          >
            <Typography
              fontFamily={"poppins"}
              fontSize={{ xs: "20px", sm: "22px", md: "28px" }}
            >
              Dodawanie oferty
            </Typography>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                width: "100%",
                height: "4px",
                mb: 3,
              }}
            />
          </Box>
          <Box>
            <AddOfferForm setAlertMessage={setAlertMessage} />
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}
