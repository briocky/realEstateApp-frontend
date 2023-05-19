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
import { useNavigate } from "react-router-dom";

function mapSearchFieldsToSearchData(searchFields) {
  const searchData = Object.entries(searchFields).reduce((prev, [key, data]) => {
    if (typeof data.value === "string" && data.value.length !== 0) {
      prev[key] = data.value;
    }
    return prev;
  }, {});
  return searchData;
}

export default function SearchPropertyForm() {
  const navigate = useNavigate();
  const [searchFields, setSearchFields] = useState({
    realEstateType: {
      value: "",
      validationRule: /[A-Za-z]+|/,
      error: false,
      errorMessage: "Niepoprawny typ nieruchomości"
    },
    offerType: {
      value: "",
      validationRule: /[A-Za-z]+/,
      error: false,
      errorMessage: "Niepoprawny typ oferty"
    },
    roomCount: {
      value: "",
      validationRule: /[+]?[0-9]+/,
      error: false,
      errorMessage: "Niepoprawna liczba pokoi"
    },
    priceMin: {
      value: "",
      validationRule: /[+]?([0-9]*[.])?[0-9]+/,
      error: false,
      errorMessage: "Cena musi być liczbą"
    },
    priceMax: {
      value: "",
      validationRule: /[+]?([0-9]*[.])?[0-9]+/,
      error: false,
      errorMessage: "Cena musi być liczbą"
    },
    areaMin: {
      value: "",
      validationRule: /[+]?([0-9]*[.])?[0-9]+/,
      error: false,
      errorMessage: "Powierzchnia musi być liczbą"
    },
    areaMax: {
      value: "",
      validationRule: /[+]?([0-9]*[.])?[0-9]+/,
      error: false,
      errorMessage: "Powierzchnia musi być liczbą"
    },
    offerTitle: {
      value: "",
      validationRule: /^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9 ]{5,100}$/,
      error: false,
      errorMessage: "Tytuł musi mieć od 5 do 100 znaków"
    },
    place: {
      value: "",
      validationRule: /^([A-Za-z]+[-]?[ ]?)+$/,
      error: false,
      errorMessage: "Niepoprawna nazwa miejscowości"
    }
  });

  const theme = useTheme();

  function handleInput(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    const regexResult = value.match(searchFields[fieldName].validationRule);

    setSearchFields({
      ...searchFields,
      [fieldName]: {
        ...searchFields[fieldName],
        value: value,
        error: !regexResult
      }
    });
  }

  function handleSubmit(e) {
    const searchData = mapSearchFieldsToSearchData(searchFields);
    navigate("/offers", { state: searchData });
  }

  return (
    <Paper
      sx={{
        width: { xs: "100%", sm: "80%", md: "60%" },
        py: { xs: "3rem" },
        px: { xs: "2.5rem", md: "4rem" },
      }}
    >
      <Grid container spacing={2} rowSpacing={{ xs: 2, sm: 4 }}>
        <Grid item xs={2}>
          <Box className="search_property_heading_text">
            <Typography fontFamily={"poppins"} fontSize={{ xs: 23, sm: 25, md: 28 }}>
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
            fontSize={{ xs: 12, sm: 13, md: 14 }}
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
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}>
            <InputLabel id="real-estate-type-label" sx={{ fontSize: { xs: "0.9rem", md: 16 } }}>
              Typ nieruchomości
            </InputLabel>
            <Select
              labelId="real-estate-type-label"
              name="realEstateType"
              id="real-estate-type-select"
              value={searchFields.realEstateType.value}
              label="Typ nieruchomości"
              onChange={(event) => handleInput(event)}
            >
              <MenuItem value={"APARTMENT"}>Mieszkanie</MenuItem>
              <MenuItem value={"HOUSE"}>Dom</MenuItem>
              <MenuItem value={"PLOT"}>Działka</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <FormControl fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}>
            <InputLabel id="offer-type-label" sx={{ fontSize: { xs: "0.9rem", md: 16 } }}>
              Typ oferty
            </InputLabel>
            <Select
              labelId="offer-type-label"
              id="offer-type-select"
              name="offerType"
              value={searchFields.offerType.value}
              label="Typ oferty"
              onChange={(event) => handleInput(event)}
            >
              <MenuItem value={"SALE"}>Na sprzedaż</MenuItem>
              <MenuItem value={"RENT"}>Wynajem</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}
            id="outlined-number"
            disabled={searchFields.realEstateType.value === "dzialka" ? true : false}
            label="Liczba pokoi"
            type="number"
            name="roomCount"
            value={searchFields.roomCount.value}
            onChange={(event) => handleInput(event)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}
            label="Wpisz miejscowość lub wybierz z listy"
            id="outlined-start-adornment"
            name="place"
            value={searchFields.place.value}
            onChange={(event) => handleInput(event)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}
            label="Cena min."
            id="min-price"
            name="priceMin"
            value={searchFields.priceMin.value}
            type="number"
            onChange={(event) => handleInput(event)}
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
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}
            label="Cena max."
            type="number"
            name="priceMax"
            value={searchFields.priceMax.value}
            id="max-price"
            onChange={(event) => handleInput(event)}
            InputProps={{
              endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <TextField
            fullWidth
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}
            label="Pow. od"
            type="number"
            name="areaMin"
            value={searchFields.areaMin.value}
            id="area-from"
            onChange={(event) => handleInput(event)}
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
            size={useMediaQuery(theme.breakpoints.only('xs')) ? "small" : "medium"}
            label="Pow. do"
            type="number"
            name="areaMax"
            value={searchFields.areaMax.value}
            id="area-to"
            onChange={(event) => handleInput(event)}
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
            onClick={(e) => handleSubmit(e)}
          >
            Pokaż oferty
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}
