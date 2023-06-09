import {
  Box, Button, Divider, Grid, Input, InputAdornment, TextField, Typography,
} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import AddIcon from '@mui/icons-material/Add';
import { useRef } from "react";
import { APARTMENT } from "../../../../constants/consts";
import OfferImage from "../offerImage/OfferImage";

export default function AdditionalInfoStage({
  basicInfo,
  additionalInfo,
  setAdditionalInfo
}) {
  const hiddenFileInput = useRef(null);

  function onPictureAdded(e) {
    let file = e.target.files[0];
    if (!file || !["image/jpeg", "image/png"].includes(file.type)) return;
    let url = window.URL.createObjectURL(file);

    setAdditionalInfo({
      ...additionalInfo,
      pictures: {
        ...additionalInfo.pictures,
        value: new Map(additionalInfo.pictures.value)
          .set(file.name, { file, url }),
      }
    });
  }

  function handleDeleteImage(pictureName) {
    let pictures = new Map(additionalInfo.pictures.value);
    pictures.delete(pictureName);

    setAdditionalInfo({
      ...additionalInfo,
      pictures: {
        ...additionalInfo.pictures,
        value: pictures
      }
    });
  }

  function handleInput(e) {
    const fieldName = e.target.name;
    const value = e.target.value;
    const regexResult = value.match(additionalInfo[fieldName].validationRule);

    setAdditionalInfo({
      ...additionalInfo,
      [fieldName]: {
        ...additionalInfo[fieldName],
        value: value,
        error: !regexResult
      }
    });
  }

  return (
    <Box>
      <Grid container spacing={2} rowSpacing={2}>
        <Grid item xs={12} md={6}>
          <TextField size="small" fullWidth value={additionalInfo.place.value}
            label="Wpisz miejscowość" id="place-start-adornment" name="place"
            onChange={(e) => handleInput(e)}
            helperText={additionalInfo.place.error && additionalInfo.place.errorMessage}
            error={additionalInfo.place.error}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PlaceIcon></PlaceIcon>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField size="small" fullWidth value={additionalInfo.voivodeship.value}
            label="Województwo" name="voivodeship" id="voivodeship"
            onChange={(e) => handleInput(e)}
            helperText={additionalInfo.voivodeship.error && additionalInfo.voivodeship.errorMessage}
            error={additionalInfo.voivodeship.error}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField size="small" value={additionalInfo.county.value} fullWidth
            label="Powiat" name="county" id="county"
            onChange={(e) => handleInput(e)}
            helperText={additionalInfo.county.error && additionalInfo.county.errorMessage}
            error={additionalInfo.county.error}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField size="small" fullWidth value={additionalInfo.street.value}
            label="Ulica" name="street" id="street"
            placeholder="Pozostaw puste - jeśli nie dotyczy"
            onChange={(e) => handleInput(e)}
            helperText={additionalInfo.street.error && additionalInfo.street.errorMessage}
            error={additionalInfo.street.error}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField size="small" fullWidth value={additionalInfo.buildingNumber.value}
            label="Numer budynku" name="buildingNumber" id="buildingNumber"
            onChange={(e) => handleInput(e)}
            helperText={additionalInfo.buildingNumber.error && additionalInfo.buildingNumber.errorMessage}
            error={additionalInfo.buildingNumber.error}
          />
        </Grid>

        {basicInfo.realEstateType.value === APARTMENT.variable && (
          <Grid item xs={12} md={6}>
            <TextField size="small" fullWidth value={additionalInfo.apartmentNumber.value}
              label="Numer mieszkania" name="apartmentNumber" id="apartmentNumber"
              onChange={(e) => handleInput(e)}
              helperText={additionalInfo.apartmentNumber.error && additionalInfo.apartmentNumber.errorMessage}
              error={additionalInfo.apartmentNumber.error}
            />
          </Grid>
        )}

        <Grid item xs={12} mt={2}>
          <Divider />
        </Grid>

        <Grid container spacing={2} p={2}>
          <Grid item xs={5}>
            <Typography variant="h6">Zdjęcia oferty</Typography>
          </Grid>

          <Grid item xs={7}></Grid>
          <Grid item xs={12}>
            <Box>
              <Input
                sx={{ display: "none" }}
                type="file" ref={hiddenFileInput}
                name="hiddenFileInput1"
                inputProps={{ accept: "image/jpeg, image/png" }}
                onChange={(e) => onPictureAdded(e)}
              />
              <Button variant="outlined" color="info"
                onClick={(e) => hiddenFileInput.current.children[0].click()}>
                <AddIcon fontSize="medium" />
                Dodaj zdjęcia
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} display={additionalInfo.pictures.value.size > 0 ? "block" : "none"}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {(() => {
                let fileNames = [];
                for (let [fileName, fileContent] of additionalInfo.pictures.value) {
                  fileNames.push({ name: fileName, content: fileContent });
                }
                return fileNames.map((file, index) => <OfferImage file={file} handleDelete={handleDeleteImage} key={index} />);
              })()}
            </Box>
          </Grid>

        </Grid>

        <Grid item xs={12}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6">Opis oferty</Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField id="outlined-multiline-static" label="Opis" name="description"
            fullWidth multiline value={additionalInfo.description.value} rows={4}
            placeholder="Tutaj wpisz dokładny opis swojej nieruchomości"
            onChange={(e) => handleInput(e)}
            InputLabelProps={{ shrink: true, }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
