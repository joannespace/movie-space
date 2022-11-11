import React, { createContext, useEffect, useState } from "react";
import { apiService } from "../app/apiService";
import { API_KEY } from "../app/config";

const DataContext = createContext();

function DataProvider({ children }) {
  const [discover, setDiscover] = useState([]);
  const [trends, setTrends] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [upcomings, setUpcomings] = useState([]);
  const [genres, setGenres] = useState([]);
  const [allMovies, setAllMovies] = useState({});

  useEffect(() => {
    const fetchAPI = async () => {
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

      const discover = responseMovs.data.results;
      const trends = responseTrends.data.results;
      const topMovies = responseTop.data.results;
      const upcomings = responseUpcomings.data.results;
      const genres = responseCat.data.genres;

      setDiscover(discover);
      setTrends(trends);
      setTopMovies(topMovies);
      setUpcomings(upcomings);
      setGenres(genres);
      setAllMovies([...discover, ...trends, ...topMovies, ...upcomings]);
    };

    fetchAPI();
  }, []);

  return (
    <DataContext.Provider
      value={{ discover, trends, topMovies, upcomings, allMovies, genres }}
    >
      {children}
    </DataContext.Provider>
  );
}

export { DataProvider, DataContext };
