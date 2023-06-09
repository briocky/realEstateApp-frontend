import { Box, Container } from "@mui/material";
import { useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import bgImage from '../assets/bg2.png'
import LoginForm from "../components/forms/loginform/LoginForm";
import Footer from "../components/footer/Footer";

export default function LoginPage() {
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
        <LoginForm />
      </Box>
      <Footer />
    </Container>
  )
}