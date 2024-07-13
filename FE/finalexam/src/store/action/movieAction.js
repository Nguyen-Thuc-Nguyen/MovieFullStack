import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
    'movies/fetchMovies',
    async () => {
      const response = await fetch('http://localhost:5000/api/movie/allMovie');
      if (!response.ok) {
        throw new Error('Failed to fetch movies');
      }
      const data = await response.json();
      return data;
    }
  );