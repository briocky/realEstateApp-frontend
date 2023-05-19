import { Box, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Button, useTheme, FormHelperText } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { useState } from "react";

export default function BasicInfoStage({ basicInfo, setBasicInfo, basicInfoErrors }) {
  const theme = useTheme();

  function handleInput(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    const regexResult = value.match(basicInfo[fieldName].validationRule);
    
    setBasicInfo({
      ...basicInfo, 
      [fieldName]: {
        ...basicInfo[fieldName], 
        value: value, 
        error: !regexResult
      }
    });
  }

  return (
    <Box>
      <Grid container spacing={2} rowSpacing={4}>
        <Grid item xs={12} md={4} >
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="real-estate-type-label">Typ nieruchomości</InputLabel>
            <Select
              labelId="real-estate-type-label" name="realEstateType" id="real-estate-type-select" 
              value={basicInfo.realEstateType.value} label="Typ nieruchomości" 
              onChange={(event) => handleInput(event)}
              error={basicInfo.realEstateType.error}>
              <MenuItem value={"APARTMENT"}>Mieszkanie</MenuItem>
              <MenuItem value={"HOUSE"}>Dom</MenuItem>
              <MenuItem value={"PLOT"}>Działka</MenuItem>
            </Select>
            <FormHelperText sx={{color: "#d32f2f"}} hidden={!basicInfo.realEstateType.error}>{basicInfo.realEstateType.errorMessage}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <FormControl sx={{ width: "100%" }} size="small">
            <InputLabel id="offer-type-label">Typ oferty</InputLabel>
            <Select 
              labelId="offer-type-label" id="offer-type-select" name="offerType" 
              value={basicInfo.offerType.value} label="Typ oferty" 
              onChange={(event) => handleInput(event)}
              error={basicInfo.offerType.error}>
              <MenuItem value={"SALE"}>Na sprzedaż</MenuItem>
              <MenuItem value={"RENT"}>Wynajem</MenuItem>
            </Select>
            <FormHelperText sx={{color: "#d32f2f"}} hidden={!basicInfo.offerType.error}>{basicInfo.offerType.errorMessage}</FormHelperText>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={4}>
          <TextField
            sx={{ width: "100%" }}
            size="small" label="Liczba pokoi" type="number" name="roomCount"
            disabled={basicInfo.realEstateType.value === "dzialka" ? true : false} 
            id="outlined-number" onChange={(event) => handleInput(event)}
            value={basicInfo.roomCount.value} InputLabelProps={{ shrink: true, }}
            error={basicInfo.roomCount.error}
            helperText={basicInfo.roomCount.error && basicInfo.roomCount.errorMessage}
          />
        </Grid>

        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <TextField
            size="small" fullWidth
            label="Cena" type="number" name="price" id="price" value={basicInfo.price.value}
            onChange={(event) => handleInput(event)}
            error={basicInfo.price.error}
            helperText={basicInfo.price.error && basicInfo.price.errorMessage}
            InputProps={{
              endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6} display="flex" alignItems="center">
          <TextField
            size="small" fullWidth label="Powierzchnia" type="number" name="area" 
            id="area" value={basicInfo.area.value} onChange={(event) => handleInput(event)}
            error={basicInfo.area.error}
            helperText={basicInfo.area.error && basicInfo.area.errorMessage}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end"><strong>㎡</strong></InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            size="small" fullWidth label="Tytuł oferty" type="text" name="offerTitle"
            id="offerTitle" value={basicInfo.offerTitle.value} 
            onChange={(event) => handleInput(event)} error={basicInfo.offerTitle.error}
            helperText={basicInfo.offerTitle.error && basicInfo.offerTitle.errorMessage} />
        </Grid>
      </Grid>
    </Box>
  );
}
