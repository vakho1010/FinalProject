import React, { useState, useEffect } from "react";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites added</p>
      ) : (
        <ul>
          {favorites.map((movie, index) => (
            <li key={index}>
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100px" }} // Smaller image size for the list
              />
              <h3>{movie.title}</h3>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
