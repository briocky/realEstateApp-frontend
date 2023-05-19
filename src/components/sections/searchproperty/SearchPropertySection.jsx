import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import bgImage from "../../../assets/home_bg_img.jpg";
import SearchPropertyForm from "../../forms/searchform/SearchPropertyForm";
import "./SearchPropertySection.css";

export default function SearchPropertySection() {
  const headingFontFamily = "Rubik Mono One";

  return (
    <Box
      className="search_property_container"
      sx={{ backgroundImage: `url(${bgImage})`, pb: 12 }}
    >
      <Box height={{xs: "2rem", sm: "4rem", md: "7rem"}}></Box>
      <Paper elevation={6} className="search_property_heading">
        <Typography fontSize={{xs: "1.2rem", sm: "1.5rem", md: "2rem"}} fontFamily={headingFontFamily}>
          ODKRYJ WYJĄTKOWE NIERUCHOMOŚCI
        </Typography>
        <Typography
          fontSize={{xs: "1.2rem", sm: "1.5rem", md: "2rem"}}
          color="primary"
          fontFamily={headingFontFamily}
        >
          W NIEZWYKŁYCH MIEJSCACH
        </Typography>
      </Paper>
      <Box className="search_property_form" mt={{xs: "2rem", sm: "3.5rem", md: "5rem"}}>
        <SearchPropertyForm />
      </Box>
    </Box>
  );
}
