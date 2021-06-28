import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice
} from "@reduxjs/toolkit";
import { getUser, mergeAnonymousToExistingUser as merge, updateUser } from "../../services/userService";

export const getUserAction = createAsyncThunk("users/get", async (args) => {
  const user = await getUser(args);
  return user;
});

export const updateUserAction = createAsyncThunk(
  "users/update",
  async (args) => {
    await updateUser(args);
    return args;
  }
);

export const mergeAnonymousToExistingUser = createAsyncThunk(
  "users/mergeAnonymousToExistingUser",
  async (jsonAuthCredential) => merge(jsonAuthCredential)
);

const adapter = createEntityAdapter({
  selectId: (user) => user.uid,
});

const slice = createSlice({
  name: "users",
  initialState: adapter.getInitialState(),
  extraReducers: {
    [updateUserAction.fulfilled]: (state, action) => {
      adapter.upsertOne(state, action.payload);
    },
    [updateUserAction.rejected]: (state, action) => {
      console.error("updateUserAction error!", action);
    },
  },
});

export default slice.reducer;
