import { Grid } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import MovieBanner from "../common/MovieBanner";

function HomeBanner({ upcomings }) {
  return (
    <Stack>
      <Grid container spacing={2} flexGrow={1}>
        {upcomings.slice(2, 3).map((movie) => {
          return (
            <Grid item key={movie.id} flexGrow={1}>
              <MovieBanner
                props={{
                  movie: movie,
                }}
              />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default HomeBanner;
