import { Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useForm } from "react-hook-form";
import MovieCard from "../common/MovieCard";
import SelectGenres from "../common/SelectGenres";
import { FormProvider } from "../forms";
import LoadingScreen from "./LoadingScreen";

function HomeGenres({ movieList, title, genres, sx }) {
  const defaultValue = [];
  const methods = useForm(defaultValue);

  const {
    watch,
    formState: { isSubmitting },
  } = methods;
  const filters = watch();
  const filterMovies = filterByGenres(movieList, filters);

  return (
    <Stack mb={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
          {title}
        </Typography>

        <FormProvider methods={methods}>
          <SelectGenres genres={genres} />
        </FormProvider>
      </Stack>

      {filterMovies === [] ? (
        <Box>No movies found</Box>
      ) : isSubmitting ? (
        <LoadingScreen />
      ) : (
        <Grid container spacing={5} flexWrap="wrap">
          {filterMovies.map((movie) => {
            return (
              <Grid item key={movie.id} xs={6} md={4} display="flex">
                <MovieCard sx={sx} movie={movie} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Stack>
  );
}

export default HomeGenres;

function filterByGenres(allMovies, filters) {
  const { genresFilters } = filters;

  let filteredMovies = allMovies.filter((movie) =>
    movie["genre_ids"].includes(Number(genresFilters))
  );

  return filteredMovies;
}
