import { Box, Breadcrumbs, Typography } from "@mui/material";
import React from "react";
import { Link, Link as RouterLink } from "react-router-dom";

function DBreadcrumps({ prevPage, currentPage }) {
  return (
    <Box
      role="presentation"
      onClick={(e) => {
        e.preventDefault();
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={RouterLink}
          to="/"
          style={{
            color: "#E26A2C",
            textDecoration: "none",
          }}
        >
          {prevPage}
        </Link>

        <Typography color="primary">{currentPage}</Typography>
      </Breadcrumbs>
    </Box>
  );
}

export default DBreadcrumps;
