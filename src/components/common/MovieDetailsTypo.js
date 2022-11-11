import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";

function MovieDetailsTypo({ icon, title, content }) {
  return (
    <Stack direction="row">
      {icon}
      <Typography variant="h7" sx={{ ml: 1 }}>
        <strong>{title}: </strong>
        {content}
      </Typography>
    </Stack>
  );
}

export default MovieDetailsTypo;
