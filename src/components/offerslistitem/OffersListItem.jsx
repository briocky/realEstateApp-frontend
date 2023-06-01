import { Box, Button, Grid, IconButton, List, ListItem, ListItemText, Paper, Tooltip, Typography } from "@mui/material";
import StraightenIcon from '@mui/icons-material/Straighten';
import NumbersIcon from '@mui/icons-material/Numbers';
import PlaceIcon from '@mui/icons-material/Place';
import GiteIcon from '@mui/icons-material/Gite';
import PaidIcon from '@mui/icons-material/Paid';
import { Link } from "react-router-dom";
import noHouseImage from '../../assets/no_house_picture.png';
import CloseIcon from '@mui/icons-material/Close';
import { deleteOffer } from "../../services/offerService";
import { APARTMENT, HOUSE, PLOT } from "../../constants/consts";

export default function OffersListItem({ elementData, myOffersList = false, deleteOfferFromList }) {
  function handleOfferDelete() {
    deleteOffer(elementData.id).then((response) => {
      deleteOfferFromList(elementData.id);
    });
  }

  function getTypeAsText(type) {
    switch (type) {
      case APARTMENT.variable:
        return APARTMENT.asText;
      case HOUSE.variable:
        return HOUSE.asText;
      default:
        return PLOT.asText;
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, position: "relative" }}>
      <Tooltip title="Usuń" sx={{ display: !myOffersList && "none", position: "absolute", top: 6, right: 6 }}>
        <IconButton onClick={handleOfferDelete} color="error">
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h6" fontFamily={"poppins"}>{elementData.title}</Typography>
        </Grid>
        <Grid item xs={12} sm={4} display={"flex"} alignItems={"center"} justifyContent={"center"}>
          {!elementData.image ?
            <img style={{ width: "100%", maxWidth: "150px" }} alt="Real Estate"
              src={noHouseImage} /> :
            <img style={{ width: "100%", maxWidth: "150px" }} alt="Real Estate"
              src={"data:" + elementData.image.type + ";base64, " + elementData.image.pictureBytes} />
          }
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Box>
            <List dense={true}>
              <ListItem sx={{ py: 0 }}>
                <StraightenIcon sx={{ mr: 1 }} />
                <ListItemText primary={elementData.area + " ㎡"} />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <NumbersIcon sx={{ mr: 1 }} />
                <ListItemText primary={elementData.roomCount + " pokoi"} />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <PlaceIcon sx={{ mr: 1 }} />
                <ListItemText primary={elementData.place} />
              </ListItem>
              <ListItem sx={{ py: 0 }}>
                <GiteIcon sx={{ mr: 1 }} />
                <ListItemText primary={getTypeAsText(elementData.realEstateType)} />
              </ListItem>
            </List>
          </Box>
        </Grid>
        <Grid item xs={12} md={4} display={"flex"} justifyContent={"center"}
          alignItems={"center"} sx={{ flexDirection: { xs: "column", sm: "row", md: "column" } }}>
          <Box display={"flex"} alignItems={"center"} justifyContent={"center"}
            mb={{ xs: 1, sm: 0, md: 2 }} mr={{ sm: 2, md: 0 }}>
            <PaidIcon sx={{ mr: 1 }} />
            <Typography variant="h5" fontFamily={"poppins"}>{elementData.price} zł</Typography>
          </Box>
          <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row", md: "column" } }}>
            <Button component={Link} to={"/offer/details/" + elementData.id}
              variant="contained" color="info" sx={{ width: "fit-content" }}>
              Pokaż szczegóły
            </Button>
            {myOffersList &&
              <Button component={Link} to={"/offer/edit/" + elementData.id} variant="contained"
                color="success" sx={{ mt: { xs: 1, sm: 0, md: 1 }, ml: { sm: 2, md: 0 } }}>
                Edytuj
              </Button>
            }
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}