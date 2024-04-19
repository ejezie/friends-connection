// src/redux/slices/themeSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { toggleClassname } from "@/utils";

const themeSlice = createSlice({
  name: "theme",
  initialState: { isDarkMode: false },
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      toggleClassname(state);
    },
    getDefaultTheme: (state) => {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
      if (prefersDark.matches) {
        state.isDarkMode = true;
        toggleClassname(state);
      }
    },
  },
});

export const { toggleTheme, getDefaultTheme } = themeSlice.actions;
export default themeSlice.reducer;
