import { Button, Typography, useTheme } from "@mui/material";
import { Box, Container } from "@mui/system";
import React, { useState } from "react";
import logo from "../../assets/logo_v8_no_bg_colors.png";
import MapsHomeWorkOutlinedIcon from "@mui/icons-material/MapsHomeWorkOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import SearchIcon from "@mui/icons-material/Search";
import NavItem from "../navitem/NavItem";
import "./Navbar.css";
import { Link } from "react-router-dom";
import ProfileMenu from "../profilemenu/ProfileMenu";
import { useAuthContext } from "../context/AuthContext";
import { getBasicUserInfo } from "../../services/userDataService";
import ClickAwayListener from '@mui/base/ClickAwayListener';

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
  {
    text: "Szukaj",
    icon: <SearchIcon className="navbar_icon" />,
    linkTo: "/",
  },
];

const navItems = navItemWithIcon.map((val, idx) => {
  return [
    <NavItem text={val.text} icon={val.icon} linkTo={val.linkTo} key={2 * idx} />,
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
  const { user, setUser } = useAuthContext();
  const theme = useTheme();

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
  function handleClickAway() {
    setMenuCollapsed(true);
  }

  function collapseMenu() {
    setMenuCollapsed(!isMenuCollapsed);
    document.body.classList.toggle("mobile-menu-opened");
  }

  if (isMenuCollapsed && document.body.classList.contains("mobile-menu-opened")) {
    document.body.classList.remove("mobile-menu-opened");
  }

  return (
    <ClickAwayListener onClickAway={() => handleClickAway()}>
      <Container maxWidth={false} disableGutters>
        <Box
          display={isMenuCollapsed ? "none" : "flex"}
          className="mobile_side_bar"
          sx={{ backgroundColor: theme.palette.secondary.main, overflow: "scroll" }}
        >
          <Box>
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
            {user.isFetched &&
              <Box component="div" sx={{ my: { xs: "0.3rem" } }} className="navbar_small_bar_horizontal" />}
            {user.isFetched &&
              <NavItem text={"Dodaj ofertę"} icon={<AddCircleOutlineIcon className="navbar_icon" />} linkTo={"/offer/add"} />}
          </Box>
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
          {user.isFetched ? (
            <ProfileMenu user={user} setUser={setUser} />
          ) : (
            <Button
              component={Link} to="/login"
              variant="contained" color="white"
              className="navbar_sign_in_btn"
              size="small"
            >
              <AdminPanelSettingsOutlinedIcon sx={{ fontSize: { xs: "14px", sm: "19px" } }} />
              <Box ml="0.6rem" component="span"
                sx={{
                  fontSize: { xs: "10px", sm: "14px" },
                  ml: { xs: "0.2rem", sm: "0.6rem" }
                }}>
                Zaloguj się
              </Box>
            </Button>
          )}
        </Container>
      </Container>
    </ClickAwayListener>
  );
}
