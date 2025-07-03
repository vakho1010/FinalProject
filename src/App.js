import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Favorites from "./pages/Favorites";
import "./styles/global.css";

const App = () => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  return (
    <ThemeProvider>
      <Router>
        <Navbar onSearch={setSearchQuery} />
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

const Navbar = ({ onSearch }) => {
  const { theme, toggleTheme } = useTheme();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query); // Pass the search query to App.js
  };

  return (
    <nav className="navbar" >
      <Link to="/">Home</Link>
      <Link to="/favorites">Favorites</Link>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)} // Update query
        />
        <button type="submit">Search</button>
      </form>
      <button onClick={toggleTheme}>{theme === "light" ? "Dark" : "Light"} Mode</button>
    </nav>
  );
};

export default App;
