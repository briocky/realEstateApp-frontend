import { Container, Divider, Paper, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { useMediaQuery, useTheme } from "@mui/material";
import NavbarMobile from "../components/navbar/NavbarMobile";
import Footer from "../components/footer/Footer";
import { Box } from "@mui/system";

export default function AboutUsPage() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Box sx={{ backgroundColor: "#F9F5F6", minHeight: "90vh", display: "flex", justifyContent: "center" }} >
        <Paper sx={{ width: { xs: "100%", md: "50%" }, my: 4, height: "fit-content", p: 4 }}>
          <Typography align="center" variant="h5">~~ O nas ~~</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>Witamy na stronie <strong>"nowaposiadlosc.pl"</strong>! Jesteśmy dumnymi twórcami i operatorami platformy, która umożliwia wygodne, efektywne i bezpieczne sprzedawanie oraz kupowanie nieruchomości. Nasza firma powstała z pasji do innowacyjnych rozwiązań technologicznych oraz zrozumienia potrzeb naszych klientów w dziedzinie rynku nieruchomości.</Typography>
          <Typography my={2}>Naszym celem jest zapewnienie Ci wyjątkowego i bezproblemowego doświadczenia podczas sprzedaży lub zakupu nieruchomości. Wykorzystujemy najnowsze technologie i narzędzia, aby ułatwić Ci proces transakcji oraz zapewnić pełne wsparcie na każdym etapie.</Typography>
          <Typography variant="h6"><strong>Dlaczego warto nam zaufać?</strong></Typography>
          <ul>
            <li style={{ marginBottom: "0.5rem" }}>Bogata oferta nieruchomości: Na naszej platformie znajdziesz szeroki wybór nieruchomości dostępnych do zakupu. Niezależnie od tego, czy szukasz domu, mieszkania, działki lub komercyjnej przestrzeni, mamy dla Ciebie odpowiednie opcje.</li>
            <li style={{ marginBottom: "0.5rem" }}>Intuicyjna i łatwa w obsłudze platforma: Nasza strona internetowa została zaprojektowana tak, abyś mógł łatwo przeglądać oferty, umieszczać ogłoszenia i zarządzać swoimi transakcjami. Nawigacja jest prosta, a interfejs przyjazny dla użytkownika.</li>
            <li style={{ marginBottom: "0.5rem" }}>Profesjonalne wsparcie: Nasz zespół doświadczonych specjalistów jest gotów odpowiedzieć na Twoje pytania, udzielić wsparcia technicznego i pomóc Ci w rozwiązaniu wszelkich problemów. Jesteśmy tutaj, aby Ci pomóc na każdym kroku.</li>
          </ul>
          <Typography>Nie czekaj dłużej! Dołącz do naszej platformy i skorzystaj z możliwości sprzedaży lub zakupu nieruchomości w prosty i efektywny sposób. Odkryj pełen potencjał naszej platformy i przekonaj się, dlaczego coraz więcej osób polega na naszej jakości i profesjonalizmie.</Typography>
        </Paper>
      </Box>
      <Footer />
    </Container>
  )
}