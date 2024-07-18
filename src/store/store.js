import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie-slice";

export const store = configureStore({
  reducer: {
    counter: movieReducer,
  },
});
