import { Box, Container, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import CategoryIcon from "@mui/icons-material/Category";
import DescriptionIcon from "@mui/icons-material/Description";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useEffect, useState } from "react";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/config";
import MovieDetailsTypo from "../components/common/MovieDetailsTypo";
import HomeMovieList from "../components/customized/HomeMovieList";
import DBreadcrumps from "../components/common/DBreadcrumps";
import LoadingScreen from "../components/customized/LoadingScreen";

function MovieDetails() {
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const movieId = params.id;

  const [trends, setTrends] = useState([]);
  const [movie, setMovie] = useState({});
  const [movieGenres, setMoviesGenres] = useState("");

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setIsLoading(true);
        const responseTrends = await apiService.get(
          `trending/movie/day?api_key=${API_KEY}`
        );
        const responseTop = await apiService.get(
          `movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
        );
        const responseUpcomings = await apiService.get(
          `movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        const responseMovs = await apiService.get(
          `discover/movie?api_key=${API_KEY}`
        );
        const responseCat = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}`
        );

        const genres = responseCat.data.genres;
        const discover = responseMovs.data.results;
        const trends = responseTrends.data.results;
        const topMovies = responseTop.data.results;
        const upcomings = responseUpcomings.data.results;
        const allMovies = [...discover, ...trends, ...topMovies, ...upcomings];
        const movie = allMovies.find(
          (movie) => movie.id.toString() === movieId
        );

        setTrends(trends);

        setMovie(movie);
        setMoviesGenres(
          movie["genre_ids"]
            .map((genreId) => {
              return genres.find((genre) => {
                return genre.id === genreId;
              }).name;
            })
            .join(", ")
        );

        setIsLoading(false);
      } catch (error) {
        console.log("Err MD", error.message);
      }
    };
    fetchAPI();
  }, [movieId]);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <Container
        sx={{ display: "flex", flexDirection: "column", mt: 2, mb: 2 }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "center", md: "flex-start" }}
          mt={2}
          spacing={1}
          flexGrow={1}
        >
          <Box
            component="img"
            src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            sx={{
              width: { xs: "200px", md: "250px" },
              height: "100%",
              borderRadius: "5px",
              boxShadow: "0.5px 0.8px 1px 1px lightgrey",
            }}
          />

          <Stack flexGrow={1} pr={2} pl={2}>
            <DBreadcrumps prevPage="Home" currentPage="Movie" />

            <Stack spacing={1} mt={2}>
              <Typography variant="h4" fontWeight="bold">
                {movie.name || movie.title}
              </Typography>

              <MovieDetailsTypo
                icon={<PublishedWithChangesIcon />}
                title="Released year"
                content={movie["release_date"].slice(0, 4)}
              />

              <MovieDetailsTypo
                icon={<CategoryIcon />}
                title="Genres"
                content={movieGenres}
              />

              <MovieDetailsTypo
                icon={<DescriptionIcon />}
                title="Description"
                content={movie.overview}
              />

              <MovieDetailsTypo
                icon={<ThumbUpIcon />}
                title="Voting points"
                content={Math.round(movie["vote_average"] * 10) / 10}
              />
            </Stack>
          </Stack>
        </Stack>

        <HomeMovieList
          movieList={trends}
          sx={{
            width: "260px",
            height: "160px",
            boxShadow: "0.5px 0.5px 1px 1px lightgrey",
          }}
          noImgRender={3}
          title="RECOMMENDATION"
        />
      </Container>
    );
  }
}

export default MovieDetails;
