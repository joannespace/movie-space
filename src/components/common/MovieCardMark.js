import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function MovieCardMark({ sx, movie }) {
  const auth = useAuth();

  const location = useLocation();

  return (
    <Card
      sx={{
        ...sx,
        position: "relative",
        flexGrow: 1,
        boxShadow: "0.5px 0.5px 1px 1px lightgrey",
      }}
    >
      <Link
        to={`/movies/${movie.id}`}
        replace
        state={auth.isLoggedIn ? null : { to: location }}
      >
        <CardMedia
          component="img"
          height={sx.height}
          image={`https://image.tmdb.org/t/p/w500/${movie["backdrop_path"]}`}
          alt="green iguana"
          sx={{ objectFit: "fill", objectPosition: "center" }}
        />

        <CardContent
          sx={{
            position: "absolute",
            bottom: "-5px",
          }}
        >
          <Typography
            gutterBottom
            fontSize="11px"
            fontWeight="bolder"
            sx={{
              color: "secondary.contrastText",
              borderRadius: "3px",
              textShadow: "0px 0px 2px rgba(9,26,122,0.7);",
              margin: 0,
            }}
          >
            {movie.title || movie.name}
          </Typography>

          <Typography
            fontSize="12px"
            fontWeight="bold"
            width="60px"
            sx={{
              color: "primary.main",
              textShadow: "0px 1px 2px 2px black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid",
              borderRadius: "10px",
              backgroundColor: "lightgrey",
              pr: 0.2,
              pl: 0.2,
              mt: 0.5,
            }}
          >
            <ThumbUpIcon fontSize="12px" sx={{ mr: 1 }} />
            {Math.round(movie.popularity)}
          </Typography>
        </CardContent>
      </Link>

      <CardActions
        sx={{
          position: "absolute",
          bottom: "0",
          right: "0",
        }}
      >
        <IconButton
          sx={{ color: "secondary.lighter" }}
          onClick={() => auth.removeBookmark(movie)}
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default MovieCardMark;
