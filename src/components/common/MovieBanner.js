import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

function MovieBanner({ props }) {
  const { movie } = props;
  const location = useLocation();

  return (
    <Card
      sx={{
        minWidth: "100%",
        position: "relative",
        borderRadius: "0",
      }}
    >
      <Link to={`/movies/${movie.id}`} state={{ backgroundLocation: location }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500/${movie["backdrop_path"]}`}
          alt="green iguana"
          sx={{ objectFit: "fill", objectPosition: "center" }}
        />

        <CardContent
          sx={{
            position: "absolute",
            bottom: "0",
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            color="text.info"
            fontWeight="bolder"
            sx={{
              color: "white",
            }}
          >
            {movie.title || movie.name}
          </Typography>

          <Typography
            width="150px"
            fontWeight="bold"
            fontSize="15px"
            textAlign="center"
            color="primary.main"
            sx={{ border: "1px solid", borderRadius: "10px", p: 1 }}
          >
            JUST RELEASED
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default MovieBanner;
