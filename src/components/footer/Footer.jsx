import { Box, Link, Typography } from "@mui/material";
import logo from "../../assets/logo_v8_no_bg_colors.png";

export default function Footer() {
  return (
    <Box sx={{
      backgroundColor: "#D7D7D3", display: "flex",
      justifyContent: "space-between", alignItems: "center",
      py: 3, mt: "auto", flexDirection: { xs: "column", sm: "row" }
    }}>
      <Box sx={{ display: "flex", alignItems: "center", pl: 5 }}>
        <img src={logo} alt="logo" width={50} height={50} />
        <Typography sx={{ ml: 2 }} variant="h6">nowaposiadlosc.pl</Typography>
      </Box>
      <Box sx={{ pr: 5 }}>
        <ul style={{ listStyle: "none", display: "flex" }}>
          <li style={{ marginRight: "0.7rem" }}>
            <Link href="/" color="black" underline="none">
              {'Kontakt'}
            </Link>
          </li>
          <li style={{ marginRight: "0.7rem" }}>
            <Link href="/" color="black" underline="none">
              {'O nas'}
            </Link>
          </li>
          <li>
            <Link href="/" color="black" underline="none">
              {'Zgłoś problem'}
            </Link>
          </li>
        </ul>
      </Box>
    </Box>
  )
}