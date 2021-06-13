import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signOut } from "../../services/authService";

export const signOutAction = createAsyncThunk("auth/signOut", async () => {
  console.log("sign out");
  return signOut();
});

// initial state
const initialState = {
  isInitialized: false,
  isLoggedIn: false,
  currentUser: undefined,
};

// slice
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials(state, action) {
      const { uid, email, displayName } = action.payload;

      state.isInitialized = true;

      if (uid && email && displayName) {
        state.isLoggedIn = true;
        state.currentUser = { uid, email, displayName };
      }
    },
  },
  extraReducers: {
    [signOutAction.fulfilled]: (state) => {
      state.isInitialized = true;
      state.isLoggedIn = false;
      state.currentUser = undefined;
    },
  },
});

export const { setUserCredentials } = slice.actions;

export default slice.reducer;
