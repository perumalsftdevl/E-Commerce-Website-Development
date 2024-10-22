import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    login: (state, action) => {
      state.userInfo = action.payload; // Set userInfo to the payload from login
    },
    logout: (state) => {
      state.userInfo = null; // Clear userInfo on logout
    },
  },
});

// Export actions
export const { login, logout } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
