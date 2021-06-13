import { configureStore } from "@reduxjs/toolkit";
import auth from "../features/auth/slice";
import { menusApi } from "../features/menus/api";
import { sectionsApi } from "../features/menus/sections/api";
import modals from "../features/modals/slice";
import { productsApi } from "../features/products/api";
import { venuesApi } from "../features/venues/api";

const store = configureStore({
  reducer: {
    auth,
    modals,
    [venuesApi.reducerPath]: venuesApi.reducer,
    [menusApi.reducerPath]: menusApi.reducer,
    [sectionsApi.reducerPath]: sectionsApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      venuesApi.middleware,
      menusApi.middleware,
      sectionsApi.middleware,
      productsApi.middleware
    ),

  devTools: process.env.NODE_ENV === "development",
});

export default store;
