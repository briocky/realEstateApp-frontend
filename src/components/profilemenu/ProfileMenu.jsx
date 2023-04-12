import { Logout } from "@mui/icons-material";
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered";
import {
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function ProfileMenu({ user }) {
  const [profileMenuAnchorEl, setProfileMenuAnchorEl] = useState(null);
  const open = Boolean(profileMenuAnchorEl);

  function handleProfileClick(e) {
    setProfileMenuAnchorEl(e.currentTarget);
  }

  function handleProfileClose(e) {
    setProfileMenuAnchorEl(null);
  }

  return (
    <Box>
      <Tooltip title="Ustawienia">
        <IconButton onClick={(e) => handleProfileClick(e)} color="grey">
          <Avatar
            alt={user.firstName + " " + user.lastName}
            src={user.pictureUrl}
          />
        </IconButton>
      </Tooltip>
      <Menu
        onClose={() => handleProfileClose()}
        anchorEl={profileMenuAnchorEl}
        open={open}
      >
        <MenuItem
          component={Link}
          to="/profile"
          onClick={() => handleProfileClose()}
        >
          <Avatar alt="Mój profil" src={user.pictureUrl} sx={{ mr: 2 }} />
          Mój profil
        </MenuItem>
        <MenuItem
          component={Link}
          to="/offers/my"
          onClick={() => handleProfileClose()}
        >
          <ListItemIcon>
            <FormatListNumberedIcon fontSize="large" sx={{ mr: 2 }} />
          </ListItemIcon>
          Moje oferty
        </MenuItem>
        <MenuItem onClick={() => handleProfileClose()}>
          <ListItemIcon>
            <Logout fontSize="large" sx={{ mr: 2 }} />
          </ListItemIcon>
          Wyloguj
        </MenuItem>
      </Menu>
    </Box>
  );
}
