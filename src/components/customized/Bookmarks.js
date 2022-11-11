import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiService } from "../../app/apiService";
import { API_KEY } from "../../app/config";
import useAuth from "../../hooks/useAuth";
import MovieCardMark from "../common/MovieCardMark";
import HomeMovieList from "./HomeMovieList";

function Bookmarks() {
  const auth = useAuth();
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const responseTrends = await apiService.get(
        `trending/movie/day?api_key=${API_KEY}`
      );

      const trends = responseTrends.data.results;

      setTrends(trends);
    };

    fetchAPI();
  }, []);

  return (
    <Stack mt={2} mb={3}>
      <Typography variant="h6" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
        YOUR MOVIES BOOKMARKS
      </Typography>

      <Stack direction="column" sx={{ mt: 2 }} spacing={2}>
        <Typography variant="h6" fontWeight="bolder">
          Movies bookmarks
        </Typography>

        {auth.bookmarks.length !== 0 ? (
          <Grid
            container
            flexGrow={1}
            spacing={1}
            flexWrap={{ xs: "none", md: "wrap" }}
          >
            {auth.bookmarks.map((movie) => (
              <Grid item key={movie.id} xs={6} md={3}>
                <MovieCardMark
                  sx={{
                    width: "180px",
                    height: "140px",
                    boxShadow: "0.5px 0.5px 1px 1px lightgrey",
                  }}
                  movie={movie}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box>
            <Typography>There's no bookmarks yet.</Typography>
          </Box>
        )}

        <HomeMovieList
          movieList={trends}
          sx={{
            width: "260px",
            height: "160px",
            boxShadow: "0.5px 0.5px 1px 1px lightgrey",
          }}
          noImgRender={3}
          title="POPULAR NOW"
        />
      </Stack>
    </Stack>
  );
}

export default Bookmarks;
