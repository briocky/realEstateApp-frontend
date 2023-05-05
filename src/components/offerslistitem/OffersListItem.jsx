import { Box, Button, Grid, List, ListItem, ListItemText, Paper, Typography } from "@mui/material";
import StraightenIcon from '@mui/icons-material/Straighten';
import NumbersIcon from '@mui/icons-material/Numbers';
import PlaceIcon from '@mui/icons-material/Place';
import GiteIcon from '@mui/icons-material/Gite';
import PaidIcon from '@mui/icons-material/Paid';
import { Link } from "react-router-dom";
import noHouseImage from '../../assets/no_house_picture.png';

export default function OffersListItem({ elementData }) {
  return (
    <Paper elevation={3} sx={{ p: 3 }}>
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
                <ListItemText primary={elementData.realEstateType} />
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
          <Button component={Link} to={"/offer/details/" + elementData.id}
            variant="contained" color="info" sx={{ width: "fit-content" }}>
            Pokaż szczegóły
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}