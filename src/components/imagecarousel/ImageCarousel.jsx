import { Button, Card, CardContent, CardMedia } from "@mui/material";
import noHousePicture from '../../assets/no_house_picture.png';
import { useState } from "react";
import QuantityIndicator from "../quantityindicator/QuantityIndicator";

function convertToImageSrc(image) {
  return `data: ${image.type};base64, ${image.pictureBytes}`;
}

export default function ImageCarousel({ images }) {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);

  function handleRightClick() {
    if (currentImageIdx === images.length - 1) return;
    setCurrentImageIdx((curr) => curr + 1);
  }

  function handleLeftClick() {
    if (currentImageIdx === 0) return;
    setCurrentImageIdx((curr) => curr - 1);
  }

  return (
    <Card sx={{ width: { xs: "100%", md: "50%" }, position: "relative", height: "fit-content" }}>
      <Button sx={{ position: "absolute", left: 8, top: "40%" }}
        disabled={currentImageIdx === 0 ? true : false}
        variant="contained" onClick={handleLeftClick}>{"<"}</Button>
      <Button sx={{ position: "absolute", right: 8, top: "40%" }}
        disabled={currentImageIdx >= images.length - 1 ? true : false}
        variant="contained" onClick={handleRightClick}>{">"}</Button>
      <CardMedia
        component="img"
        height="fit-content"
        sx={{ aspectRatio: "1/1" }}
        image={images.length === 0 ?
          noHousePicture : convertToImageSrc(images[currentImageIdx])}
      />

      <CardContent>
        <QuantityIndicator currentId={currentImageIdx} quantity={images.length} />
      </CardContent>
    </Card>
  );
}