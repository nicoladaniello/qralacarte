import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/slice";
import { menusApi } from "../features/menus/api";
import modals from "../features/modals/slice";
import development from "../features/development/slice";
import usersApi from "../features/users/api";

const store = configureStore({
  reducer: {
    auth,
    modals,
    development: process.env.NEXT_PUBLIC_DEVELOPMENT ? development : null,
    [usersApi.reducerPath]: usersApi.reducer,
    [menusApi.reducerPath]: menusApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(menusApi.middleware),

  devTools: process.env.NEXT_PUBLIC_DEVELOPMENT,
});

export default store;
