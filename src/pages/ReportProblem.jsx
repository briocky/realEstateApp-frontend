import { Button, Container, Divider, Paper, TextField, Typography } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import { useMediaQuery, useTheme } from "@mui/material";
import NavbarMobile from "../components/navbar/NavbarMobile";
import Footer from "../components/footer/Footer";
import { Box } from "@mui/system";
import BugReportIcon from '@mui/icons-material/BugReport';
import { DatePicker } from "@mui/x-date-pickers";

export default function ReportProblem() {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Box sx={{ backgroundColor: "#F9F5F6", minHeight: "90vh", display: "flex", justifyContent: "center" }} >
        <Paper sx={{ width: { xs: "100%", md: "50%" }, my: 4, height: "fit-content", p: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <BugReportIcon fontSize="large" color="error" sx={{ mr: 1 }} />
            <Typography align="center" variant="h5">Zgłaszanie problemu</Typography>
          </Box>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <TextField sx={{ mb: 2 }} id="title" label="Tytuł problemu" variant="outlined" />
            <DatePicker sx={{ mb: 2 }} />
            <TextField sx={{ mb: 2 }} id="description" label="Opis problemu" multiline minRows={4} variant="outlined" />
            <Button variant="contained">Wyślij zgłoszenie</Button>
          </Box>
        </Paper>
      </Box>
      <Footer />
    </Container>
  )
}