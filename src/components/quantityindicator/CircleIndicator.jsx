import { useState } from "react"


export default function CircleIndicator({ filled }) {
  const defaultColor = "#8C8C89";
  const defaultContrastColor = "white";

  return (
    <div style={{ borderRadius: 100, backgroundColor: defaultColor, height: 20, width: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ borderRadius: 100, backgroundColor: filled ? defaultColor : defaultContrastColor, height: 15, width: 15 }}></div>
    </div>
  )
}