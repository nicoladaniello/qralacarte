import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/slice";
import { menusApi } from "../features/menus/api";
import modals from "../features/modals/slice";

const store = configureStore({
  reducer: {
    auth,
    modals,
    [menusApi.reducerPath]: menusApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(menusApi.middleware),

  devTools: process.env.NEXT_PUBLIC_DEVELOPMENT,
});

export default store;
