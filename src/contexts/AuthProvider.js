import React, { createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import useBookmark from "../hooks/useBookmark";

const initialState = {
  isLoggedIn: false,
  username: null,
  password: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "INITIALIZE":
      const { isLoggedIn, username, password } = action.payload;
      return { ...state, isLoggedIn, username, password };
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        username: action.payload.username,
        password: action.payload.password,
      };
    case "LOGOUT":
      return { ...state, isLoggedIn: false, username: null, password: null };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      const username = window.localStorage.getItem("username");
      const password = window.localStorage.getItem("password");

      try {
        if (username && password) {
          dispatch({
            type: "INITIALIZE",
            payload: { isLoggedIn: true, username, password },
          });
        } else {
          dispatch({
            type: "INITIALIZE",
            payload: { isLoggedIn: false, username: null, password: null },
          });
        }
      } catch (error) {
        console.log("Error intializing", error);
        dispatch({
          type: "INITIALIZE",
          payload: { isLoggedIn: false },
        });
      }
    };
    initialize();
  }, []);

  const [bookmarks, setBookmarks] = useBookmark("bookmarks");

  const addBookmark = (movie) => {
    const result = bookmarks.filter((mov) => mov.id !== movie.id);
    setBookmarks([...result, movie]);
  };
  const removeBookmark = (movie) => {
    const result = bookmarks.filter((mov) => mov.id !== movie.id);
    setBookmarks([...result]);
  };

  const login = async (username, password, callback) => {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);

    try {
      if (username && password) {
        dispatch({
          type: "LOGIN",
          payload: { username, password },
        });
      } else {
        dispatch({
          type: "LOGOUT",
        });
      }
    } catch (error) {
      dispatch({
        type: "LOGOUT",
      });
      navigate("/");
    }

    callback();
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        bookmarks,
        addBookmark,
        removeBookmark,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
