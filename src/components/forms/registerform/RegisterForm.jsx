import { Alert, Box, Button, Divider, Paper, TextField, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/logo_v8_no_bg_colors.png";
import { register } from "../../../services/authService";

export default function RegisterForm() {
  const theme = useTheme();
  const [alert, setAlert] = useState({ type: "success", message: "", show: false, duration: 4000 });
  const [firstName, setFirstName] = useState({ data: "", error: "" });
  const [lastName, setLastName] = useState({ data: "", error: "" });
  const [email, setEmail] = useState({ data: "", error: "" });
  const [username, setUsername] = useState({ data: "", error: "" });
  const [password, setPassword] = useState({ data: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({ data: "", error: "" });
  const [phoneNumber, setPhoneNumber] = useState({ data: "", error: "" });
  const [pictureUrl, setPictureUrl] = useState({ data: "", error: "" });
  const firstNameInput = "firstNameInput", lastNameInput = "lastNameInput",
    emailInput = "emailInput", usernameInput = "usernameInput",
    passwordInput = "passwordInput", confirmPasswordInput = "confirmPasswordInput",
    phoneNumberInput = "phoneNumberInput", pictureUrlInput = "pictureUrlInput";
  const navigate = useNavigate();

  function handleSubmit() {
    const redirectionOffsetTime = 1000;

    register({
      firstName: firstName.data, lastName: lastName.data,
      email: email.data, username: username.data,
      password: password.data, confirmPassword: confirmPassword.data,
      phoneNumber: phoneNumber.data, pictureUrl: pictureUrl.data
    }).then((response) => {
      setAlert({ ...alert, type: "success", message: "Zarejestrowano pomyślnie!", show: true });
      setTimeout(() => navigate("/login"), redirectionOffsetTime);
    }, (error) => {
      setAlert({ ...alert, type: "error", message: "Wystąpił problem podczas zmiany danych!", show: true });
      setTimeout(() => setAlert({ ...alert, show: false }), alert.duration);
    });
  }

  function handleInput(e) {
    const maxPhoneNumLength = 9;
    const name = e.target.name;
    const value = e.target.value;

    switch (name) {
      case firstNameInput:
        setFirstName({ ...firstName, data: value });
        break;
      case lastNameInput:
        setLastName({ ...lastName, data: value });
        break;
      case usernameInput:
        setUsername({ ...username, data: value });
        break;
      case emailInput:
        setEmail({ ...email, data: value });
        break;
      case phoneNumberInput:
        if (value.length === maxPhoneNumLength + 1) {
          break;
        }
        setPhoneNumber({ ...phoneNumber, data: value });
        break;
      case passwordInput:
        setPassword({ ...password, data: value });
        break;
      case confirmPasswordInput:
        setConfirmPassword({ ...confirmPassword, data: value });
        break;
      case pictureUrlInput:
        setPictureUrl({ ...pictureUrl, data: value });
        break;
      default:
        break;

    }
  }

  return (
    <Paper sx={{ width: { xs: "100%", sm: "77%", md: "50%" }, mt: 10, height: "fit-content" }}>
      <Box display="flex" flexDirection="column" alignItems="center" my={5} mx={{ xs: 2, md: 5 }}>
        <Box component="img" sx={{ width: 70, mb: 2 }} src={logo} />
        <Typography fontSize={25} fontFamily="Rubik Mono One">
          Rejestracja
        </Typography>
        <Box
          sx={{ backgroundColor: theme.palette.grey.main, mt: 3 }}
          component="div" width={"60%"} height={2}
        ></Box>
        {alert.show &&
          <Alert severity={alert.type}>{alert.message}</Alert>
        }
        <Box width={{ xs: "90%", md: "70%" }} mt={5} display={"flex"} flexDirection={"column"} >
          <TextField
            size="small" sx={{ mb: 2 }}
            label="Imie" type="text" name={firstNameInput} id={firstNameInput}
            value={firstName.data}
            onChange={(event) => handleInput(event)}
            error={firstName.error === "" ? false : true}
            helperText={firstName.error}
          />
          <TextField
            size="small" sx={{ mb: 2 }}
            label="Nazwisko" type="text" name={lastNameInput} id={lastNameInput}
            value={lastName.data}
            onChange={(event) => handleInput(event)}
            error={lastName.error === "" ? false : true}
            helperText={lastName.error}
          />
          <TextField
            size="small" sx={{ mb: 2 }}
            label="Email" type="email" name={emailInput} id={emailInput}
            value={email.data}
            onChange={(event) => handleInput(event)}
            error={email.error === "" ? false : true}
            helperText={email.error}
          />
          <TextField
            size="small" sx={{ mb: 2 }}
            label="Nazwa użytkownika" type="text" name={usernameInput}
            id={usernameInput} value={username.data}
            onChange={(event) => handleInput(event)}
            error={username.error === "" ? false : true}
            helperText={username.error}
          />
          <TextField
            size="small" sx={{ mb: 3 }}
            label="Hasło" type="password" name={passwordInput} id={passwordInput}
            value={password.data}
            onChange={(event) => handleInput(event)}
            error={password.error === "" ? false : true}
            helperText={password.error}
          />
          <TextField
            size="small" sx={{ mb: 3 }}
            label="Powtórz hasło" type="password" name={confirmPasswordInput}
            id={confirmPasswordInput} value={confirmPassword.data}
            onChange={(event) => handleInput(event)}
            error={confirmPassword.error === "" ? false : true}
            helperText={confirmPassword.error}
          />
          <TextField
            size="small" sx={{ mb: 2 }}
            label="Numer telefonu" type="number" name={phoneNumberInput}
            id={phoneNumberInput} value={phoneNumber.data}
            onChange={(event) => handleInput(event)}
            error={phoneNumber.error === "" ? false : true}
            helperText={phoneNumber.error}
          />
          <TextField
            size="small" sx={{ mb: 2 }}
            label="Adres zdjęcia" type="text" name={pictureUrlInput}
            id={pictureUrlInput} value={pictureUrl.data}
            onChange={(event) => handleInput(event)}
            error={pictureUrl.error === "" ? false : true}
            helperText={pictureUrl.error}
          />
          <Button fullWidth={false} variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>Zarejestruj</Button>
          <Divider>Masz już konto?</Divider>
          <Button variant="outlined" sx={{ mt: 2, mb: 4 }} href="/login">Zaloguj się</Button>
        </Box>

      </Box>
    </Paper>
  );
}