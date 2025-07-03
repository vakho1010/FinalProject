import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_KEY = "a9aee0b45a9a984aa294a5532a9e4656";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddToFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    
    if (!storedFavorites.some(fav => fav.id === movie.id)) {
      storedFavorites.push(movie);
      localStorage.setItem("favorites", JSON.stringify(storedFavorites));
      alert("Added to Favorites!");
    } else {
      alert("This movie is already in your favorites.");
    }
  };

  if (loading) return <p>Loading movie details...</p>;
  if (!movie) return <p>Movie not found.</p>;

  return (
    <div>
      <h1>{movie.title}</h1>
      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <p>Release Date: {movie.release_date}</p>
      <p>Rating: {movie.vote_average}</p>

      <button onClick={handleAddToFavorites}>Add to Favorites</button>
    </div>
  );
};

export default MovieDetails;
