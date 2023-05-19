import {
  Box,
  Button,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import BasicInfoStage from "./stages/BasicInfoStage";
import AdditionalInfoStage from "./stages/AdditionalInfoStage";
import OfferSummary from "./stages/OfferSummary";
import { validateBasicInfoStep, validateAdditionalDataStep } from "./validations";
import { addOffer } from "../../../services/offerService";
import AuthContext from "../../context/AuthContext";
import { buildOfferData } from "./utils";

const steps = ["Podstawowe dane", "Szczegóły oferty", "Podsumowanie"];

export default function AddOfferForm({ setAlertMessage }) {
  const [activeStep, setActiveStep] = useState(0);
  const { user, setUser } = useContext(AuthContext);

  const [basicInfo, setBasicInfo] = useState({
    realEstateType: {
      value: "",
      validationRule: /[A-Za-z]+/,
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
    price: {
      value: "",
      validationRule: /[+]?([0-9]*[.])?[0-9]+/,
      error: false,
      errorMessage: "Cena musi być liczbą"
    },
    area: {
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
    }
  });

  const [additionalInfo, setAdditionalInfo] = useState({
    place: {
      value: "",
      validationRule: /^([A-Za-z]+[-]?[ ]?)+$/,
      error: false,
      errorMessage: "Niepoprawna nazwa miejscowości"
    },
    voivodeship: {
      value: "",
      validationRule: /^[A-Za-z]+[-]?[A-Za-z]*$/,
      error: false,
      errorMessage: "Niepoprawna nazwa województwa"
    },
    street: {
      value: "",
      validationRule: /^([A-Za-z]+[ ]?)+$/,
      error: false,
      errorMessage: "Niepoprawna nazwa ulicy"
    },
    buildingNumber: {
      value: "",
      validationRule: /^[0-9]*[a-zA-z]?$/,
      error: false,
      errorMessage: "Niepoprawny numer budynku"
    },
    apartmentNumber: {
      value: "",
      validationRule: /^[0-9]*$/,
      error: false,
      errorMessage: "Niepoprawny numer mieszkania"
    },
    county: {
      value: "",
      validationRule: /^[A-Za-z]+[-]?[A-Za-z]*$/,
      error: false,
      errorMessage: "Niepoprawna nazwa powiatu"
    },
    pictures: {
      value: new Map(),
      validationRule: /[A-Za-z]+/, //TODO
      error: false,
      errorMessage: "Niepoprawny typ zdjęcia"
    },
    description: {
      value: "",
      validationRule: null,
      error: false,
      errorMessage: "Niepoprawny opis"
    },
  });

  async function validateStep(activeStep) {
    let result;
    switch (activeStep) {
      case 0:
        result = validateBasicInfoStep(basicInfo, setBasicInfo);
        break;
      case 1:
        result = validateAdditionalDataStep(additionalInfo, setAdditionalInfo);
        break;
      case 2:
        result = true;
        break;
      default:
        break;
    }

    if (result) {
      let isDataValid = true;
      if (activeStep === 2) {
        let offerData = buildOfferData(basicInfo, additionalInfo);
        await addOffer(offerData, additionalInfo.pictures.value)
          .then(
            (response) => setAlertMessage(""),
            (error) => {
              let errorMessage = "Wystąpił problem podczas wysyłania danych. Proszę zweryfikować dane.";
              isDataValid = false;
              setAlertMessage(errorMessage);
              window.scrollTo(0, 0);
            }
          );
      }

      if (isDataValid) {
        setActiveStep(activeStep + 1);
      }
    }
  }

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ mb: 1 }}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    fontSize: { xs: "11px", md: "13px" },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>

      <Divider sx={{ mb: 2 }} />

      {activeStep === steps.length ? (
        <Typography>WYSYŁAM DANE!</Typography>
      ) : (
        <Box>
          {(() => {
            switch (activeStep) {
              case 0:
                return (
                  <BasicInfoStage basicInfo={basicInfo} setBasicInfo={setBasicInfo} />
                );
              case 1:
                return (
                  <AdditionalInfoStage basicInfo={basicInfo} additionalInfo={additionalInfo}
                    setAdditionalInfo={setAdditionalInfo} />
                );
              case 2:
                return <OfferSummary basicInfo={basicInfo} additionalInfo={additionalInfo} />;
              default:
                return <BasicInfoStage />;
            }
          })()}

          {activeStep ? (
            <Grid container mt={2}>
              <Grid item xs={4}>
                <Button
                  sx={{ fontSize: 17, textTransform: "none" }}
                  variant="contained"
                  onClick={() => {
                    setActiveStep(activeStep - 1);
                  }}
                >
                  Cofnij
                </Button>
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={4} display="flex" justifyContent={"end"}>
                <Button
                  sx={{ fontSize: 17, textTransform: "none" }}
                  variant="contained"
                  onClick={() => { validateStep(activeStep); }}
                >
                  Dalej
                </Button>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} display="flex" justifyContent={"center"} mt={2}>
              <Button
                sx={{ width: "80%", fontSize: 19, textTransform: "none" }}
                variant="contained"
                onClick={() => { validateStep(activeStep); }}
              >
                Dalej
              </Button>
            </Grid>
          )}
        </Box>
      )}
    </Box>
  );
}
