import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AuthRequire from "../contexts/AuthRequire";
import MainLayout from "../layouts/MainLayout";
import BookmarkPage from "../pages/BookmarkPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import MovieDetails from "../pages/MovieDetails";

function Router() {
  const location = useLocation();
  const state = location.state;

  return (
    <>
      <Routes location={location.state?.from || location}>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/movies/:id"
            element={
              <AuthRequire>
                <MovieDetails />
              </AuthRequire>
            }
          />
          <Route path="/bookmarks" element={<BookmarkPage />} />
        </Route>
      </Routes>

      {state?.to && (
        <Routes>
          <Route
            path="/movies/:id"
            element={
              <AuthRequire>
                <MovieDetails />
              </AuthRequire>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
}

export default Router;
