import { Button } from "@mui/material";
import React, { memo } from "react";

function RenderMyButton({ children, handleClick }) {
  return (
    <Button onClick={handleClick} variant="outlined">
      {children}
    </Button>
  );
}

export default memo(RenderMyButton);