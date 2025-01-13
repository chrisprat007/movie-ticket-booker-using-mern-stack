import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllMovies } from "../../helpers/api-helpers";
import CradLayout from "./CradLayout";

const HomeLayout = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data))
      .catch((err) => console.log(err));
  }, []);

  console.log(movies);

  return (
    <Box
      width="100%"
      height="100%"
      minHeight="100vh"
      bgcolor="#121212"
      color="#f5f5f5"
    >
      {/* Header Section */}
      <Box
        margin="auto"
        width="100%"
        height="60vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          backgroundImage:
            'url("https://i.ytimg.com/vi/yEinBUJG2RI/maxresdefault.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.8)",
        }}
      >
        <Typography
          variant="h2"
          textAlign="center"
          color="#ffffff"
          fontWeight="bold"
          sx={{
            textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
          }}
        >
          Welcome to MovieLand
        </Typography>
      </Box>

      {/* Latest Releases Section */}
      <Box padding={5} margin="auto" textAlign="center">
        <Typography
          variant="h4"
          color="#ff5722"
          fontWeight="bold"
          sx={{
            borderBottom: "3px solid #ff5722",
            display: "inline-block",
            marginBottom: "20px",
          }}
        >
          Latest Releases
        </Typography>
      </Box>

      {/* Movies Grid */}
      <Box
        gap={4}
        margin="auto"
        width="85%"
        display="grid"
        gridTemplateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        justifyContent="center"
      >
        {movies &&
          movies.slice(0, 4).map((movie, index) => (
            <Card
              key={index}
              sx={{
                bgcolor: "#1e1e1e",
                color: "#f5f5f5",
                borderRadius: "15px",
                overflow: "hidden",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.3)",
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardContent>
                <Box
                  component="img"
                  src={movie.posterUrl}
                  alt={movie.title}
                  width="100%"
                  height="200px"
                  sx={{
                    objectFit: "cover",
                    borderBottom: "2px solid #ff5722",
                  }}
                />
                <Typography variant="h6" mt={2} fontWeight="bold">
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="#bdbdbd" mt={1}>
                  {movie.releaseDate}
                </Typography>
                <Typography
                  variant="body2"
                  mt={1}
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {movie.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
      </Box>

      {/* View All Movies Button */}
      <Box display="flex" padding={5} justifyContent="center" marginTop={4}>
        <Button
          variant="contained"
          LinkComponent={Link}
          to="/movies"
          sx={{
            bgcolor: "#ff5722",
            color: "#ffffff",
            fontWeight: "bold",
            "&:hover": {
              bgcolor: "#e64a19",
            },
          }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLayout;
