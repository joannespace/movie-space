import { Grid, Pagination, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import MovieCard from "../common/MovieCard";

// {
//     width: "260px",
//     height: "160px",
//     boxShadow: "0.5px 0.5px 1px 1px lightgrey",
//   }

function HomeMovieList({ movieList, sx, noImgRender, title, xs, md }) {
  const [pagination, setPagination] = useState({
    from: 0,
    to: noImgRender,
  });

  const handleTrendsPageChange = (event, page) => {
    setPagination({
      ...pagination,
      from: Math.floor(page * noImgRender - noImgRender),
      to: Math.floor(page * noImgRender),
    });
  };

  return (
    <Stack mt={2} mb={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
          {title}
        </Typography>

        <Pagination
          defaultPage={1}
          count={Math.ceil(movieList.length / noImgRender)}
          onChange={handleTrendsPageChange}
        />
      </Stack>

      <Grid
        container
        spacing={3}
        flexWrap="wrap"
        display="flex"
        justifyContent="center"
      >
        {movieList.slice(pagination.from, pagination.to).map((movie) => {
          return (
            <Grid item key={movie.id} xs={xs} md={md} display="flex">
              <MovieCard sx={sx} movie={movie} />
            </Grid>
          );
        })}
      </Grid>
    </Stack>
  );
}

export default HomeMovieList;
