import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "a9aee0b45a9a984aa294a5532a9e4656";

const Home = ({ searchQuery }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const API_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=1`;
        const response = await axios.get(API_URL);
        setMovies(response.data.results || []);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    if (searchQuery) {
      fetchMovies();
    } else {
      // Optionally, fetch popular movies when no search query is entered
      const fetchPopularMovies = async () => {
        const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        const response = await axios.get(API_URL);
        setMovies(response.data.results || []);
        setLoading(false);
      };
      fetchPopularMovies();
    }
  }, [searchQuery]); // Fetch movies whenever the search query changes

  return (
    <div>
      <h1>Popular Movies</h1>
      {loading && <p>Loading...</p>}
      <div className="movie-list">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <div className="movie-card">
                <img
                  src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
            </Link>
          ))
        ) : (
          !loading && <p>No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
