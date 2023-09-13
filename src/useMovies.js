import { useEffect, useState } from "react";

// const KEY = "a579345d";
//! Always remember to name the api key in .env file when app is created using create react app starting with "REACT_APP_yourApiKeyName"
const KEY = process.env.REACT_APP_OMDB_API_KEY;

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      // callback?.();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );

          if (!res.ok) {
            throw new Error("Something went wrong with fetching movies!");
          }

          const data = await res.json();
          if (data.Response === "False") {
            throw new Error("Movie not found");
          }
          setMovies(data.Search);
          setError("");
        } catch (err) {
          if (err.message !== "AbortMessage") {
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      //* Will be replaced with a callback function passed as a parameter
      //   handleCloseMovie();
      fetchMovies();
    },
    [query]
  );

  return { movies, isLoading, error };
}
