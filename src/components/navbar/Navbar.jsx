import { Button, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import React from "react";
import logo from "../../assets/logo_v8_no_bg_colors.png";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SearchIcon from "@mui/icons-material/Search";
import NavItem from "../navitem/NavItem";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ProfileMenu from "../profilemenu/ProfileMenu";
import { useAuthContext } from "../context/AuthContext";
import { getBasicUserInfo } from "../../services/userDataService";

const navItemWithIcon = [
  {
    text: "Ogłoszenia",
    icon: <MapsHomeWorkOutlinedIcon className="navbar_icon" />,
    linkTo: "/offers",
  },
  {
    text: "Obserwowane",
    icon: <FavoriteBorderIcon className="navbar_icon" />,
    linkTo: "/",
  },
  { text: "Szukaj", icon: <SearchIcon className="navbar_icon" />, linkTo: "/" },
];

const navItems = navItemWithIcon.map((val, idx) => {
  return [
    <NavItem
      text={val.text}
      icon={val.icon}
      linkTo={val.linkTo}
      key={2 * idx}
    />,
    idx !== navItemWithIcon.length - 1 ? (
      <Box
        key={2 * idx + 1}
        component="div"
        sx={{ mx: { md: "0.3rem", lg: "1rem" } }}
        className="navbar_small_bar"
      />
    ) : null,
  ];
});

export default function Navbar() {
  const { user, setUser } = useAuthContext();
  const theme = useTheme();

  if (document.body.classList.contains("mobile-menu-opened")) {
    document.body.classList.remove("mobile-menu-opened");
  }

  if (!user.isFetched && user.token) {
    getBasicUserInfo().then((response) =>
      setUser({
        ...user,
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        pictureUrl: response.data.pictureUrl,
        token: user.token,
        isFetched: true,
      })
    );
  }

  return (
    <Container
      maxWidth={false}
      component="div"
      className="navbar_container"
      sx={{ backgroundColor: theme.palette.secondary.main }}
    >
      {/** LOGO */}
      <Box component="img" className="navbar_logo" src={logo} />
      <Box component="div" className="navbar_big_bar" />

      {/** NAVITEMS */}
      <Box
        sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>{navItems}</Box>

        {/** Profile Data */}
        {user.isFetched ? (
          <Box sx={{ display: "flex" }}>
            <NavItem
              text={"Dodaj ofertę"}
              icon={<AddCircleOutlineIcon className="navbar_icon" />}
              linkTo={"/offer/add"}
            />
            <Box mr={2} />
            <ProfileMenu user={user} setUser={setUser} />
          </Box>
        ) : (
          <Box className="navbar_profile_container">
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="white"
              className="navbar_sign_in_btn"
            >
              <AdminPanelSettingsOutlinedIcon
                sx={{ fontSize: { md: "22px", lg: "25px" } }}
              />
              <Box
                ml="0.6rem"
                sx={{ fontSize: { md: "15px", lg: "20px" } }}
                component="span"
              >
                Zaloguj się
              </Box>
            </Button>
          </Box>
        )}
      </Box>
    </Container>
  );
}
