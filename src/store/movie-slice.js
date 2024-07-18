import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk("fetchMovies", async () => {
  const response = await axios.get(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=927e8cf0cb27247c262224dc9356de90"
  );
  return response.data;
});

const initialState = {
  loading: false,
  movies: null,
  error: false,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchMovies.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchMovies.rejected, (state, action) => {
      state.error = true;
    });
  },
});

export default moviesSlice.reducer;
