import { createSlice } from "@reduxjs/toolkit";

// initial state
const initialState = {
  currentUser: undefined,
  status: {
    isSignedIn: false,
    isAnonymous: false,
  },
};

// slice
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserCredentials(state, action) {
      state.currentUser = action.payload;
      state.status.isSignedIn = true;
      state.status.isAnonymous = false;
    },
    setUserAnonymous(state) {
      state.currentUser = null;
      state.status.isSignedIn = false;
      state.status.isAnonymous = true;
    },
  },
});

const selectAuth = (state) => state.auth;
const { setUserCredentials, setUserAnonymous } = slice.actions;

export { selectAuth, setUserCredentials, setUserAnonymous };

export default slice.reducer;
