import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/slice";
import { menusApi } from "../features/menus/api";
import modals from "../features/modals/slice";
import development from "../features/development/slice";

const store = configureStore({
  reducer: {
    auth,
    modals,
    development: process.env.NEXT_PUBLIC_DEVELOPMENT ? development : null,
    [menusApi.reducerPath]: menusApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menusApi.middleware),

  devTools: process.env.NEXT_PUBLIC_DEVELOPMENT,
});

export default store;
