import { Paper, Box, Typography, Button, useTheme, TextField, Divider } from "@mui/material";
import { useState } from "react";
import logo from "../../../assets/logo_v8_no_bg_colors.png";
import googleIcon from "../../../assets/google_icon.png";

export default function LoginForm() {
  const theme = useTheme();
  const googleAuthLink = "http://localhost:8080/oauth2/authorization/google";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  return (
    <Paper sx={{ width: {xs: "100%", sm: "77%", md: "50%"}, mt: 10, height: "fit-content" }}>
      <Box display="flex" flexDirection="column" alignItems="center" my={5} mx={{xs: 2,md: 5}}>
        <Box component="img" sx={{ width: 70, mb: 2 }} src={logo} />
        <Typography fontSize={25} fontFamily="Rubik Mono One">
          Logowanie
        </Typography>
        <Box
          sx={{ backgroundColor: theme.palette.grey.main, mt: 3 }}
          component="div" width={"60%"} height={2}
        ></Box>
        <Box width={{xs: "90%", md: "70%"}} mt={5} display={"flex"} flexDirection={"column"} >
          <TextField
            size="small" sx={{mb: 2}}
            label="Email" type="email" name="email" id="email" value={email}
            onChange={(event) => setEmail(event.target.value)}
            // error={basicInfoErrors.priceError}
            // helperText={basicInfoErrors.priceError && "Niepoprawna cena"}
          />
          <TextField
            size="small" sx={{mb: 3}}
            label="Hasło" type="password" name="password" id="password" value={password}
            onChange={(event) => setPassword(event.target.value)}
            // error={basicInfoErrors.priceError}
            // helperText={basicInfoErrors.priceError && "Niepoprawna cena"}
          />
          <Button fullWidth={false} variant="contained" sx={{mb: 2}}>Zaloguj</Button>
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
          <Button variant="outlined" sx={{mt: 2, mb: 4}}>Zarejestruj się</Button>
        </Box>
        
      </Box>
    </Paper>
  );
}
