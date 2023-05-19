import { Box, Typography } from "@mui/material";
import logo from "../../assets/logo_v8_no_bg_colors.png";

export default function Footer() {
  return (
    <Box sx={{ backgroundColor: "grey", display: "flex" }}>
      <Box sx={{ display: "flex" }}>
        <img src={logo} />
        <Typography variant="h6">nowaposiadlosc.pl</Typography>
      </Box>
      <Box>
        <ul>
          <li>Kontakt</li>
          <li>O nas</li>
          <li>Zgłoś problem</li>
        </ul>
      </Box>
    </Box>
  )
}