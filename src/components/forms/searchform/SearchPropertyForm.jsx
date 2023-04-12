import PlaceIcon from "@mui/icons-material/Place";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import "./SearchPropertyForm.css";

export default function SearchPropertyForm() {
  const [propertyType, setPropertyType] = useState("");
  const [offerType, setOfferType] = useState("");
  const [roomCount, setRoomCount] = useState("");
  const [place, setPlace] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [areaMin, setAreaMin] = useState("");
  const [areaMax, setAreaMax] = useState("");

  const theme = useTheme();

  function handlePositiveNumericInput(e) {
    const name = e.target.name;
    let value = e.target.value;

    if (value < 0) {
      value = 0;
    } else if (value === "-") {
      value = "";
    }

    switch (name) {
      case "roomCount":
        setRoomCount(value);
        break;
      case "priceMin":
        setPriceMin(value);
        break;
      case "priceMax":
        setPriceMax(value);
        break;
      case "areaMin":
        setAreaMin(value);
        break;
      default:
        setAreaMax(value);
        break;
    }
  }

  function handleSelectInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    switch (name) {
      case "propertyType":
        setPropertyType(value);
        break;
      default:
        setOfferType(value);
        break;
    }
  }

  return (
    <Paper
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%" },
        py: { xs: "3rem" },
        px: { xs: "2.5rem", md: "4rem" },
      }}
    >
      <Grid container spacing={2} rowSpacing={{xs: 2, sm: 4 }}>
        <Grid item xs={2}>
          <Box className="search_property_heading_text">
            <Typography fontFamily={"poppins"} fontSize={{xs: 23, sm: 25, md: 28}}>
              Szukaj
            </Typography>
            <Box
              sx={{ backgroundColor: theme.palette.primary.main }}
              className="vertical_bar"
            />
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={9} display="flex" alignItems="center">
          <Typography
            fontFamily={"poppins"}
            lineHeight={1}
            color="gray"
            fontSize={{xs: 12, sm: 13, md: 14}}
          >
            Niezależnie czego szukasz:
            <strong>
              <i> mieszkanie, dom, działka </i>
            </strong>
            nasza platforma pomoże Ci to znaleźć w mgnieniu oka
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth 
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}>
            <InputLabel id="property-type-label" sx={{ fontSize: {xs: "0.9rem", md: 16} }}>
              Typ nieruchomości
            </InputLabel>
            <Select
              labelId="property-type-label"
              name="propertyType"
              id="property-type-select"
              value={propertyType}
              label="Typ nieruchomości"
              onChange={(event) => handleSelectInput(event)}
            >
              <MenuItem value={"mieszkanie"}>Mieszkanie</MenuItem>
              <MenuItem value={"dom"}>Dom</MenuItem>
              <MenuItem value={"dzialka"}>Działka</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}>
            <InputLabel id="offer-type-label" sx={{ fontSize: {xs: "0.9rem", md: 16} }}>
              Typ oferty
            </InputLabel>
            <Select
              labelId="offer-type-label"
              id="offer-type-select"
              name="offerType"
              value={offerType}
              label="Typ oferty"
              onChange={(event) => handleSelectInput(event)}
            >
              <MenuItem value={10}>Na sprzedaż</MenuItem>
              <MenuItem value={20}>Wynajem</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}
            id="outlined-number"
            disabled={propertyType === "dzialka" ? true : false}
            label="Liczba pokoi"
            type="number"
            name="roomCount"
            value={roomCount}
            onChange={(event) => handlePositiveNumericInput(event)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}
            label="Wpisz miejscowość lub wybierz z listy"
            id="outlined-start-adornment"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon/>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}
            label="Cena min."
            id="min-price"
            name="priceMin"
            value={priceMin}
            type="number"
            onChange={(event) => handlePositiveNumericInput(event)}
            InputProps={{
              endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
          />
          <Box
            mx={1.5}
            width={30}
            height={3}
            bgcolor={theme.palette.grey[500]}
          />
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}
            label="Cena max."
            type="number"
            name="priceMax"
            value={priceMax}
            id="max-price"
            onChange={(event) => handlePositiveNumericInput(event)}
            InputProps={{
              endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}
            label="Pow. od"
            type="number"
            name="areaMin"
            value={areaMin}
            id="area-from"
            onChange={(event) => handlePositiveNumericInput(event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <strong>㎡</strong>
                </InputAdornment>
              ),
            }}
          />
          <Box
            mx={1.5}
            width={30}
            height={3}
            bgcolor={theme.palette.grey[500]}
          />
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small":"medium"}
            label="Pow. do"
            type="number"
            name="areaMax"
            value={areaMax}
            id="area-to"
            onChange={(event) => handlePositiveNumericInput(event)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <strong>㎡</strong>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent={"center"} mt={2}>
          <Button
            sx={{ width: "80%", fontSize: 19, textTransform: "none" }}
            variant="contained"
          >
            Pokaż oferty
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
