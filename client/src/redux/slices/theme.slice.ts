// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: { isDarkMode: false },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    getDefaultTheme: (state) => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDark.matches) {
        state.isDarkMode = true;
      } else {
        state.isDarkMode = false;
      }
    },
  },
});

export const { toggleTheme, getDefaultTheme } = themeSlice.actions;
export default themeSlice.reducer;
