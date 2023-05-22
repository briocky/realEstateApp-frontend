import { Alert, Box, Button, Container, Divider, Paper, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../components/navbar/Navbar";
import NavbarMobile from "../components/navbar/NavbarMobile";
import Footer from "../components/footer/Footer";
import { useEffect, useState } from "react";
import { getProfileData, updateProfileData } from "../services/userDataService";

function getFormattedDate(date) {
  if (!date) {
    return "---";
  }
  const yyyy = date.getFullYear();
  const hour = date.getHours();
  const minutes = date.getMinutes();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;
  return dd + '.' + mm + '.' + yyyy + ", " + hour + ":" + minutes;
}

export default function ProfilePage() {
  const [user, setUser] = useState({});
  const [alert, setAlert] = useState({ type: "success", message: "", show: false, duration: 4000 });
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("md"));
  const firstNameInput = "firstNameInput", lastNameInput = "lastNameInput",
    usernameInput = "usernameInput", emailInput = "emailInput",
    phoneNumberInput = "phoneNumberInput", joinDateInput = "joinDateInput",
    pictureUrlInput = "pictureUrlInput";

  function handleInput(e) {
    const maxPhoneNumLength = 9;
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case firstNameInput:
        setUser({ ...user, firstName: value });
        break;
      case lastNameInput:
        setUser({ ...user, lastName: value });
        break;
      case usernameInput:
        setUser({ ...user, username: value });
        break;
      case emailInput:
        setUser({ ...user, email: value });
        break;
      case phoneNumberInput:
        if (value.length === maxPhoneNumLength + 1) {
          break;
        }
        setUser({ ...user, phoneNumber: value });
        break;
      case joinDateInput:
        setUser({ ...user, joinDate: value });
        break;
      case pictureUrlInput:
        setUser({ ...user, pictureUrl: value });
        break;
      default:
        break;

    }
  }

  function handleSubmit() {
    updateProfileData(user).then((response) => {
      setAlert({ ...alert, type: "success", message: "Dane zaktualizowane!", show: true });
      setTimeout(() => setAlert({ ...alert, show: false }), alert.duration);
    }, (error) => {
      setAlert({ ...alert, type: "error", message: "Wystąpił problem podczas zmiany danych!", show: true });
      setTimeout(() => setAlert({ ...alert, show: false }), alert.duration);
    });
  }

  useEffect(() => {
    getProfileData()
      .then((response) => {
        setUser({ ...response.data, joinDate: new Date(response.data.joinDate) });
      });
  }, []);

  return (
    <Container maxWidth={false} disableGutters sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {!matches && <Navbar />}
      {matches && <NavbarMobile />}
      <Paper sx={{ width: { xs: "90%", md: "50%" }, m: "auto" }}>
        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="h5">Dane profilowe</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3, mt: 1 }}>
          <Divider sx={{ width: "80%" }} />
        </Box>
        {alert.show &&
          <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
            <Alert severity={alert.type}>{alert.message}</Alert>
          </Box>}
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", px: 5 }}>
          <TextField name={firstNameInput} label="Imie" variant="outlined"
            value={user.firstName || ""} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={lastNameInput} label="Nazwisko" variant="outlined"
            value={user.lastName || ""} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={usernameInput} label="Nazwa użytkownika" variant="outlined"
            value={user.username || ""} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={emailInput} label="Email" variant="outlined"
            value={user.email || ""} InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: true, }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
          <TextField name={phoneNumberInput} label="Numer telefonu" type="number"
            variant="outlined" onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }}
            value={user.phoneNumber || ""} InputLabelProps={{ shrink: true }} />
          <TextField name={joinDateInput} label="Data dołączenia"
            value={getFormattedDate(user.joinDate)} variant="outlined"
            InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }}
            sx={{ mb: 2, mr: 2 }} />
          <TextField label="Zweryfikowane konto"
            value={user.verified ? "tak" : "nie"} variant="outlined" sx={{ mb: 2, mr: 2 }}
            InputProps={{ readOnly: true, }} InputLabelProps={{ shrink: true }} />
          {user.pictureUrl &&
            <img width="50" height="50" alt="profilePicture" src={user.pictureUrl} />}
          <TextField name={pictureUrlInput} label="Adres zdjęcia" variant="outlined"
            value={user.pictureUrl || ""} placeholder={"Nie podano"} InputLabelProps={{ shrink: true }}
            onChange={(e) => handleInput(e)} sx={{ mb: 2, mr: 2 }} />
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button variant="outlined" onClick={handleSubmit}>Zapisz zmiany</Button>
        </Box>
      </Paper>
      <Footer />
    </Container>
  );
}
