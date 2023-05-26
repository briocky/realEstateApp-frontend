import { Container, Divider, Paper, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { useMediaQuery, useTheme } from "@mui/material";
import NavbarMobile from "../components/navbar/NavbarMobile";
import Footer from "../components/footer/Footer";
import { Box } from "@mui/system";
import logo from "../assets/logo_v8_no_bg_colors.png";

export default function ContactPage() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Box sx={{ backgroundColor: "#F9F5F6", minHeight: "90vh", display: "flex", justifyContent: "center" }} >
        <Paper sx={{ width: { xs: "100%", md: "50%" }, mt: 4, height: "fit-content", p: 4 }}>
          <Typography align="center" variant="h5">~~ KONTAKT ~~</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography sx={{ mb: 3 }}>Witamy serdecznie! Jeśli jesteś zainteresowany skorzystaniem z naszych usług w zakresie wystawiania ogłoszeń sprzedaży lub zakupu nieruchomości, chcielibyśmy podzielić się z Tobą naszymi danymi kontaktowymi. Jesteśmy gotowi odpowiedzieć na wszelkie pytania i zapewnić Ci pełne wsparcie.</Typography>
          <Box sx={{ mb: 2 }}>
            <Typography sx={{ mb: 1 }}>{"Nasz zespół doświadczonych specjalistów jest gotowy, by pomóc Ci osiągnąć cel => sprzedaż lub zakup. Oto jak możesz się z nami skontaktować:"}</Typography>
            <Typography><strong>Telefon: +48 123 456 789</strong></Typography>
            <Typography><strong>E-mail: info@nowaposiadlosc.pl</strong></Typography>
          </Box>
          <Typography>Nasi przedstawiciele są dostępni od poniedziałku do piątku w godzinach 9:00-17:00, aby odpowiedzieć na Twoje pytania i udzielić informacji. Nie wahaj się z nami skontaktować, jesteśmy tu po to, aby Ci pomóc!</Typography>

          <Box sx={{ display: "flex", justifyContent: "right", }}>
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <Typography sx={{ mb: 1 }}><strong>Zespół nowaposiadlosc.pl</strong></Typography>
              <img alt="" height={"60px"} src={logo} />
            </Box>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </Container>
  )
}