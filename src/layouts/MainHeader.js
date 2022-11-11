import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import MainSideBar from "./MainSideBar";

function MainHeader() {
  const navigate = useNavigate();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton onClick={() => navigate("/")}>
            <Logo />
          </IconButton>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexGrow: 1,
            }}
          >
            <NavLink
              to="/"
              style={
                (({ isActive }) => {
                  return {
                    color: isActive ? "white" : "",
                    backgroundColor: isActive ? "#cc571f" : "",
                  };
                },
                {
                  color: "#E26A2C",
                  textDecoration: "none",
                  marginLeft: "1rem",
                  marginRight: "1rem",
                })
              }
            >
              Movies
            </NavLink>

            <NavLink
              to="#"
              style={{
                color: "#E26A2C",
                textDecoration: "none",
                marginRight: "1rem",
              }}
            >
              Series
            </NavLink>

            <NavLink
              to="#"
              style={{
                color: "#E26A2C",
                textDecoration: "none",
                marginRight: "1rem",
              }}
            >
              TV Shows
            </NavLink>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box>
              <MainSideBar />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default MainHeader;
