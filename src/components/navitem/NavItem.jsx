import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import "./NavItem.css";
import { Link } from "react-router-dom";

export default function NavItem({ text, icon, linkTo }) {
  return (
    <Box component={Link} to={linkTo} className="nav_item">
      {icon}
      <Typography
        className="nav_item_text"
        sx={{
          fontSize: {
            md: "14px",
            lg: "17px",
          },
        }}
      >
        {text}
      </Typography>
    </Box>
  );
}
