import { Container, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/config";
import HomeBanner from "../components/customized/HomeBanner";
import HomeGenres from "../components/customized/HomeGenres";
import HomeMovieList from "../components/customized/HomeMovieList";
import LoadingScreen from "../components/customized/LoadingScreen";

function HomePage() {
  const [isLoading, setIsLoading] = useState(true);
  const [movieLists, setMovieLists] = useState({
    trends: [],
    topMovies: [],
    upcomings: [],
    discover: [],
    genres: [],
  });

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

        setMovieLists({
          trends,
          topMovies,
          upcomings,
          discover,

          genres,
        });

        setIsLoading(false);
      } catch (error) {
        console.log("Err HP", error.message);
      }
    };
    fetchAPI();
  }, []);

  if (isLoading) {
    return (
      <Stack spacing={2}>
        <LoadingScreen />
      </Stack>
    );
  } else {
    return (
      <Stack spacing={2}>
        <HomeBanner upcomings={movieLists.upcomings} />
        <Container sx={{ minWidth: "100%" }}>
          <HomeMovieList
            movieList={movieLists.trends}
            sx={{
              width: "260px",
              height: "200px",
            }}
            noImgRender={3}
            title="MOVIES ON TRENDS"
            xs={6}
            md={4}
          />

          <HomeMovieList
            movieList={movieLists.topMovies}
            sx={{
              width: "180px",
              height: "150px",
            }}
            noImgRender={4}
            title="TOP MOVIES"
            xs={6}
            md={3}
          />

          <HomeGenres
            movieList={movieLists.discover}
            title="MOVIES BY GENRES"
            genres={movieLists.genres}
            sx={{
              width: "260px",
              height: "200px",
            }}
          />
        </Container>
      </Stack>
    );
  }
}

export default HomePage;
