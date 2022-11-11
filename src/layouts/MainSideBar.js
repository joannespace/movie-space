import {
  Avatar,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import {
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import useAuth from "../hooks/useAuth";
import LogoutIcon from "@mui/icons-material/Logout";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/config";
import SideBarList from "../components/customized/SideBarList";

function MainSideBar() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const handleLogOut = () => {
    auth.logout();
    setIsOpenDrawer(false);
    navigate("/");
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const [discover, setDiscover] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const responseMovs = await apiService.get(
          `discover/movie?api_key=${API_KEY}`
        );
        const discover = responseMovs.data.results;
        setDiscover(discover);
      } catch (error) {
        console.log("Err MSB", error.message);
      }
    };
    fetchAPI();
  }, []);

  return (
    <>
      {!auth.isLoggedIn ? (
        <NavLink
          to="/login"
          state={{ from: location, to: location }}
          style={{
            textDecoration: "none",
            color: "#FF8243",
            border: "1px solid #FDA65D",
            borderRadius: "5px",
            padding: "7px",
          }}
        >
          LOGIN
        </NavLink>
      ) : (
        <>
          <IconButton
            onClick={() => setIsOpenDrawer(true)}
            size="large"
            edge="end"
          >
            <Avatar
              alt={auth.username}
              src="/static/images/avatar/2.jpg"
              sx={{
                border: "1px solid",
                color: "primary.main",
              }}
            />
          </IconButton>

          <Drawer
            anchor={"right"}
            open={isOpenDrawer}
            onClose={() => setIsOpenDrawer(false)}
            PaperProps={{
              sx: {
                opacity: 0.9,
                width: { xs: 1, md: 0.4 },
              },
            }}
          >
            <Box p={2} textAlign="center" role="presentation">
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Stack direction="row" alignItems="center">
                  <Avatar
                    alt={auth.username}
                    src="/static/images/avatar/2.jpg"
                    sx={{
                      mr: "1rem",
                      border: "1px solid",
                      color: "primary.main",
                    }}
                  />
                  <Typography fontWeight="bolder">{auth.username}</Typography>
                </Stack>
                <IconButton
                  sx={{ color: "primary.main" }}
                  onClick={handleLogOut}
                >
                  <LogoutIcon />
                </IconButton>
              </Stack>

              {/* SEARCH */}
              <Paper
                sx={{
                  display: "flex",
                  width: "30%",
                  justifyContent: "flex-end",
                  p: 0.3,
                  mt: 2,
                  mb: 2,
                  minWidth: "100%",
                }}
              >
                <InputBase
                  sx={{
                    ml: 1,
                    flex: 1,
                    fontSize: "14px",
                    color: "primary.light",
                  }}
                  placeholder="Search"
                  inputProps={{ "aria-label": "search movie" }}
                  value={searchParams.get("query") || ""}
                  onChange={(event) => {
                    let query = event.target.value;
                    if (query) {
                      setSearchParams({ query });
                    } else {
                      setSearchParams({});
                    }
                  }}
                />
              </Paper>

              <Divider />

              <SideBarList
                movieList={discover.filter((movie) => {
                  let query = searchParams.get("query");
                  let catId = searchParams.get("catId");

                  if (!query && !catId) return true;

                  if (query) {
                    let movieName = movie.title || movie.name;
                    return movieName
                      .toLowerCase()
                      .startsWith(query.toLowerCase());
                  }

                  if (catId) {
                    let movieId = movie["genre_ids"];
                    return movieId.includes(JSON.parse(catId));
                  } else {
                    return true;
                  }
                })}
                sx={{
                  width: "150px",
                  height: "120px",
                  boxShadow: "0.5px 0.5px 1px 1px lightgrey",
                }}
                title="Discover"
              />

              <Divider />

              {/* BOOKMARKS */}

              {auth.bookmarks.length === 0 ? (
                <Box>There's no bookmarks yet</Box>
              ) : (
                <SideBarList
                  movieList={auth.bookmarks.slice(0, 3)}
                  sx={{
                    width: "140",
                    height: "140",
                  }}
                  title="Bookmarks"
                  text="See all"
                  href="/bookmarks"
                  bookmarkType="marked"
                  setIsOpenDrawer={setIsOpenDrawer}
                />
              )}
            </Box>
          </Drawer>
        </>
      )}
    </>
  );
}

export default MainSideBar;
