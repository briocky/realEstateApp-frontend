import { Alert, AlertTitle, Container, Paper, useMediaQuery } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import { useTheme } from "@emotion/react";
import { useLocation } from "react-router-dom";
import Footer from "../components/footer/Footer";

export default function NotFoundPage() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const location = useLocation();

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Paper elevation={4} sx={{ width: "60%", mx: "auto", my: 5 }}>
        <Alert severity="error" sx={{ fontSize: "18px" }}>
          <AlertTitle sx={{ fontSize: "25px", fontWeight: "bold" }}>Strony nie znaleziono!</AlertTitle>
          {!location.state ?
            "Wygląda na to, że strona o podanym adresie, nie istnieje w naszym serwisie!"
            : location.state.message + " (kod: " + location.state.status + ")"
          }
        </Alert>
      </Paper>
      <Footer />
    </Container>
  )
}