import { Paper, Box, Typography, Button, useTheme, TextField, Divider, Alert } from "@mui/material";
import { useState } from "react";
import logo from "../../../assets/logo_v8_no_bg_colors.png";
import googleIcon from "../../../assets/google_icon.png";
import { authenticate } from "../../../services/authService";
import { TOKEN_KEY_NAME } from "../../../constants/consts";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function LoginForm() {
  const { user, setUser } = useAuthContext();
  const theme = useTheme();
  const googleAuthLink = "http://localhost:8080/oauth2/authorization/google";
  const [alertMessage, setAlertMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  function handleSubmit() {
    let emailErr = emailError, passwdErr = passwordError;
    if (email === "") {
      emailErr = "Proszę podać poprawny email";
    } else {
      emailErr = "";
      setEmailError(emailErr);
    }
    if (password === "") {
      passwdErr = "Proszę podać poprawne hasło";
    } else {
      passwdErr = "";
      setPasswordError(passwdErr);
    }
    if (emailErr !== "" || passwdErr !== "") {
      setEmailError(emailErr);
      setPasswordError(passwdErr);
    } else {
      authenticate({ email: email, password: password }).then((response) => {
        let token = response.data.token;
        sessionStorage.setItem(TOKEN_KEY_NAME, token);
        setUser({ ...user, token: token });
        navigate("/");
      }, (error) => {
        setAlertMessage("Nastąpił problem z logowaniem. Spróbuj ponownie.");
      })
    }
  }

  return (
    <Paper sx={{ width: { xs: "100%", sm: "77%", md: "50%" }, mt: 10, height: "fit-content" }}>
      <Box display="flex" flexDirection="column" alignItems="center" my={5} mx={{ xs: 2, md: 5 }}>
        <Box component="img" sx={{ width: 70, mb: 2 }} src={logo} />
        <Typography fontSize={25} fontFamily="Rubik Mono One">
          Logowanie
        </Typography>
        <Box
          sx={{ backgroundColor: theme.palette.grey.main, mt: 3 }}
          component="div" width={"60%"} height={2}
        ></Box>
        {alertMessage !== "" &&
          <Alert severity="error">{alertMessage}</Alert>
        }
        <Box width={{ xs: "90%", md: "70%" }} mt={5} display={"flex"} flexDirection={"column"} >
          <TextField
            size="small" sx={{ mb: 2 }}
            label="Email" type="email" name="email" id="email" value={email}
            onChange={(event) => setEmail(event.target.value)}
            error={emailError === "" ? false : true}
            helperText={emailError}
          />
          <TextField
            size="small" sx={{ mb: 3 }}
            label="Hasło" type="password" name="password" id="password" value={password}
            onChange={(event) => setPassword(event.target.value)}
            error={passwordError === "" ? false : true}
            helperText={passwordError}
          />
          <Button fullWidth={false} variant="contained" onClick={handleSubmit} sx={{ mb: 2 }}>Zaloguj</Button>
          <Divider>Lub</Divider>
          <Button
            sx={{ textTransform: "none", mt: 2, mb: 3 }}
            color="grey" href={googleAuthLink} variant="outlined"
          >
            <Box component={"img"} src={googleIcon} sx={{ width: 23 }} />
            <Typography fontFamily={"poppins"} ml={1}>
              Kontynuuj przez Google
            </Typography>
          </Button>
          <Divider>Nie masz jeszcze konta?</Divider>
          <Button variant="outlined" sx={{ mt: 2, mb: 4 }} href="/register">Zarejestruj się</Button>
        </Box>

      </Box>
    </Paper>
  );
}
