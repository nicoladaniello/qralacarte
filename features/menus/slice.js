import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import {
  createMenu,
  getMenu,
  updateMenu,
  updateMenuProducts,
  updateMenuSections,
} from "../../../services/menuService";

export const getMenuAction = createAsyncThunk("menus/get", (data) =>
  getMenu(data)
);

export const createMenuAction = createAsyncThunk("menus/create", (data) =>
  createMenu(data)
);

export const updateMenuAction = createAsyncThunk("menus/update", (data) =>
  updateMenu(data)
);

export const updateMenuSectionsAction = createAsyncThunk(
  "menus/updateSections",
  ({ slug, sections }) => updateMenuSections(slug, sections)
);

export const updateMenuProductsAction = createAsyncThunk(
  "menus/updateProducts",
  ({ slug, products }) => updateMenuProducts(slug, products)
);

const adapter = createEntityAdapter({
  selectId: (menu) => menu.slug,
  //sortComparer: (a, b) => a.title.localeCompare(b.title),
});

const initialState = {
  ...adapter.getInitialState(),
  _meta: { entities: {} },
};

// slice
const slice = createSlice({
  name: "menus",
  initialState,
  extraReducers: {
    [getMenuAction.pending]: (state, action) => {
      state._meta.entities = {
        ...state._meta.entities,
        [action.meta.arg]: { status: "pending" },
      };
    },
    [getMenuAction.fulfilled]: (state, action) => {
      state._meta.entities = {
        ...state._meta.entities,
        [action.payload.slug]: { status: "fulfilled" },
      };
      adapter.upsertOne(state, action.payload);
    },
    [getMenuAction.rejected]: (state, action) => {
      state._meta.entities = {
        ...state._meta.entities,
        [action.meta.arg]: { status: "rejected", error: action.error },
      };
    },
    [createMenuAction.pending]: (state, action) => {
      state._meta.entities = {
        ...state._meta.entities,
        [action.meta.arg]: { status: "pending" },
      };
    },
    [createMenuAction.fulfilled]: (state, action) => {
      adapter.addOne(state, action.payload);
    },
    [createMenuAction.rejected]: (state, action) => {
      state._meta.entities = {
        ...state._meta.entities,
        [action.meta.arg]: { status: "rejected", error: action.error },
      };
    },
    [updateMenuAction.pending]: (state, action) => {
      state._meta.entities = {
        ...state._meta.entities,
        [action.meta.arg]: { status: "pending" },
      };
    },
    [updateMenuAction.fulfilled]: (state, action) => {
      adapter.updateOne(state, action.payload);
    },
    [updateMenuAction.rejected]: (state, action) => {
      state._meta.entities = {
        ...state._meta.entities,
        [action.meta.arg]: { status: "rejected", error: action.error },
      };
    },
    [updateMenuSectionsAction.fulfilled]: (state, action) => {
      adapter.updateOne(state, action.payload);
    },
    [updateMenuSectionsAction.rejected]: (state, action) => {
      console.log("rejected", action);
    },
    [updateMenuProductsAction.fulfilled]: (state, action) => {
      adapter.updateOne(state, action.payload);
    },
  },
});

export default slice.reducer;
