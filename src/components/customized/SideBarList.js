import { Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import MovieCard from "../common/MovieCard";
import MovieCardMark from "../common/MovieCardMark";

function SideBarList({
  movieList,
  sx,
  title,
  xs,
  md,
  href,
  text,
  bookmarkType,
  setIsOpenDrawer,
}) {
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

        <Link
          href={href}
          variant="caption"
          style={{ color: "#FF8243", fontSize: "12px" }}
        >
          {text}
        </Link>
      </Stack>

      <Grid
        container
        spacing={2}
        flexWrap="wrap"
        display="flex"
        justifyContent={movieList.length % 2 === 0 ? "center" : "flex-start"}
      >
        {movieList.slice(0, 6).map((movie) => {
          if (bookmarkType === "marked") {
            return (
              <Grid item key={movie.id} xs={xs} md={md} display="flex">
                <MovieCardMark sx={sx} movie={movie} />
              </Grid>
            );
          } else {
            return (
              <Grid item key={movie.id} xs={xs} md={md} display="flex">
                <MovieCard sx={sx} movie={movie} />
              </Grid>
            );
          }
        })}
      </Grid>
    </Stack>
  );
}

export default SideBarList;
