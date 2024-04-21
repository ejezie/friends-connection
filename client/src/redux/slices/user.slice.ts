import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  user: null | { [key in string]: unknown };
  token: null | string;
}

const initialState: UserState = {
  token: null,
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action: PayloadAction<unknown>) {
      const userObj = action.payload;
      const newState = { ...state };
      Object.assign(newState, userObj);
      return newState;
    },
    logoutUser(state) {
      const newState = { ...state };
      newState.token = null;
      return newState;
    },
  },
});

export const { updateUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
