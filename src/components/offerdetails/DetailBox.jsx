import { Box, Typography } from "@mui/material";

export default function DetailBox({ icon, data, title }) {
  return (
    <Box sx={{
      px: 3, py: 2, mb: 1, borderRadius: 6,
      boxShadow: "-1px 0px 19px -10px rgba(66, 68, 90, 1)",
      width: { xs: "fit-content", md: "unset" },
      minWidth: 250
    }}>
      <Box sx={{ display: "flex", justifyContent: "left", alignItems: "center", mb: 1 }}>
        {icon}
        <Typography sx={{ ml: 1 }} variant="p" color={"grey"}>{title}</Typography>
      </Box>
      <Box>
        {data.map((detail) =>
          <Box sx={{ display: "flex" }}>
            <Typography sx={{ mr: 1 }}><strong>{`${detail[0]}:`}</strong></Typography>
            <Typography>{detail[1]}</Typography>
          </Box>)}
      </Box>

    </Box>
  );
}