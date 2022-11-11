import { Box, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function MainFooter() {
  return (
    <Box mt={1}>
      <Typography variant="body2" color="text.secondary" align="center" p={1}>
        {"Copyright © "}
        <Link
          color="inherit"
          href="/"
          style={{ textDecoration: "none", color: "grey" }}
        >
          Joannespace
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}

export default MainFooter;
