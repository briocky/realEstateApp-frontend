import { Box, IconButton, Tooltip } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

export default function OfferImage({ file, handleDelete }) {

  return (
    <Box sx={{ mr: 2, position: "relative" }}>
      <Tooltip title={"Usuń zdjęcie"}>
        <IconButton onClick={(e) => handleDelete(file.name)} size="small" color="error" disableRipple={true} sx={{ position: "absolute", top: -10, right: -10, borderWidth: "1px", borderColor: "red", borderStyle: "solid", backgroundColor: "#F9F5F6" }}>
          <CloseIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={file.name}>
        <img alt="" height={160} width={160} src={file.content.url} />
      </Tooltip>
    </Box>

  )
}