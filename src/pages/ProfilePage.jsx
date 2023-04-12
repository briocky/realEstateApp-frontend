import { Container, Paper, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../components/context/AuthContext";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";

export default function ProfilePage() {
  const { user, setUser } = useContext(AuthContext);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Container maxWidth={false} disableGutters>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Paper sx={{ width: 500 }}>
        Imię i nazwisko: {user.firstName + " " + user.lastName}
      </Paper>
    </Container>
  );
}
