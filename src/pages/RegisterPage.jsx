import { Box, Container } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import bgImage from '../assets/bg2.png'
import Footer from "../components/footer/Footer";
import RegisterForm from "../components/forms/registerform/RegisterForm";

export default function RegisterPage() {
  const theme = useTheme();
  const matchesBreakpoint = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Container maxWidth={false} disableGutters
      sx={{
        display: "flex", flexDirection: "column", minHeight: "100vh",
        backgroundImage: `url(${bgImage})`
      }}>
      {!matchesBreakpoint && <Navbar />}
      {matchesBreakpoint && <NavbarMobile />}
      <Box height="1200px" display="flex" justifyContent="center">
        <RegisterForm />
      </Box>
      <Footer />
    </Container>
  )
}