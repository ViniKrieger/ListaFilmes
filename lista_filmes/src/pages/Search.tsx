import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apikey = import.meta.env.VITE_API_KEY;

import "./MovieGrid.css"

const Search = () => {
  const [searchParams] = useSearchParams();

  const [ movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url: RequestInfo | URL) => {
    const res = await fetch(url);
    const data = await res.json();

    setMovies(data.results)
  };

  useEffect(() => {
    const searchWithQueryUrl = `${searchURL}?${apikey}&query=${query}`;

    getSearchedMovies(searchWithQueryUrl);
  }, [query])


  return (
    <div className="container">
    <h2 className="title">
      Resulados para: <span className="query-text">{query}</span>
    </h2>
    <div className="movies-container">
      {movies.length === 0 && <p>Caregando...</p>}
      {movies.length > 0 && 
      movies.map((movie) => <MovieCard key={movie.id} movie={movie}/>)}
    </div>
  </div>
  )
}

export default Search