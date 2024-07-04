import { useEffect, useState } from "react";

const KEY = "919fa1bb"; // API key for accessing the OMDB API

export function useMovies(query) {
  const [movies, setMovies] = useState([]); // State for storing fetched movies
  const [isLoading, setIsLoading] = useState(false); // State for loading status
  const [error, setError] = useState(""); // State for error messages
  // Side effect to fetch movies from the OMDB API based on the search query
  useEffect(
    function () {
      //callback?.();
      const controller = new AbortController();
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok)
            throw new Error("Something went wrong with data fetching");
          const data = await res.json();
          if (data.Response === "False") throw new Error("Movie Not Found");
          setMovies(data.Search);
        } catch (err) {
          if (err.name !== "AbortError") setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setError("");
        return;
      }

      fetchMovies();

      return () => {
        controller.abort();
      };
    },
    [query]
  );

  return { movies, isLoading, error };
}
