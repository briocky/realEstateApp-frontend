import { Box } from "@mui/material";
import CircleIndicator from "./CircleIndicator";


export default function QuantityIndicator({ currentId, quantity }) {
  const indicators = [];
  for (let i = 0; i < quantity; i++) {
    indicators.push(<CircleIndicator filled={i === currentId ? true : false} />);
    indicators.push(<Box sx={{ width: 6 }} />)
  }

  return (
    <Box sx={{ display: "flex", justifyContent: "center", mx: "auto", width: "100%" }}>
      {indicators}
    </Box>

  )
}