import { Button, Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import logo from "../../assets/logo_v8_no_bg_colors.png";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import NavItem from "../navitem/NavItem";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ProfileMenu from "../profilemenu/ProfileMenu";
import AuthContext from "../context/AuthContext";

const navItemWithIcon = [
  {
    text: "Ogłoszenia",
    icon: <MapsHomeWorkOutlinedIcon className="navbar_icon" />,
  },
  { text: "Obserwowane", icon: <FavoriteBorderIcon className="navbar_icon" /> },
  { text: "Szukaj", icon: <SearchIcon className="navbar_icon" /> },
];

const navItems = navItemWithIcon.map((val, idx) => {
  return [
    <NavItem text={val.text} icon={val.icon} key={2 * idx} />,
    idx !== navItemWithIcon.length - 1 ? (
      <Box
        key={2 * idx + 1}
        component="div"
        sx={{ my: { xs: "0.3rem" } }}
        className="navbar_small_bar_horizontal"
      />
    ) : null,
  ];
});

export default function NavbarMobile() {
  const [isMenuCollapsed, setMenuCollapsed] = useState(true);
  const { user, setUser } = useContext(AuthContext);
  const theme = useTheme();

  function collapseMenu() {
    setMenuCollapsed(!isMenuCollapsed);
    document.body.classList.toggle("mobile-menu-opened");
  }

  return (
    <Container maxWidth={false} disableGutters>
      <Box
        display={isMenuCollapsed ? "none" : "flex"}
        className="mobile_side_bar"
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "90%",
            justifyContent: "space-between",
            mb: "1rem",
          }}
        >
          <Typography
            fontFamily="Rubik Mono One"
            textAlign="center"
            fontSize="25px"
          >
            Menu
          </Typography>
          <Button
            sx={{ fontSize: "25px", border: "solid", borderWidth: "2px" }}
            size="small"
            color="black"
            onClick={() => (!isMenuCollapsed ? collapseMenu() : null)}
          >
            <CloseRoundedIcon />
          </Button>
        </Box>

        {navItems}
      </Box>
      <Container
        maxWidth={false}
        component="div"
        className="navbar_mobile_container"
        sx={{ backgroundColor: theme.palette.secondary.main }}
      >
        <Button color="black" onClick={collapseMenu}>
          <MenuRoundedIcon className="navbar_menu_icon" />
        </Button>

        <Box component="img" className="navbar_logo" src={logo} />

        {/** Profile Data */}
        {user ? (
          <ProfileMenu user={user} setUser={setUser} />
        ) : (
          <Button
            component={Link}
            to="/login"
            variant="contained"
            color="white"
            className="navbar_sign_in_btn"
          >
            <AdminPanelSettingsOutlinedIcon />
            <Box ml="0.6rem" component="span">
              Zaloguj się
            </Box>
          </Button>
        )}
      </Container>
    </Container>
  );
}
