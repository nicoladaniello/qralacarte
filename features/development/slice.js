import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Loading from "../../components/Loading";
import firebase from "../../firebase/firebaseClient";
import menusApi, { menuType } from "../menus/api";

export const restoreDeveloperAccount = createAsyncThunk(
  "development/restoreDeveloperAccount",
  async (arg, { requestId, dispatch }) => {
    try {
      toast(
        <div>
          <p>Wait, restoring account...</p>
          <Loading className="text-center" />
        </div>,
        {
          toastId: requestId,
          autoClose: false,
          position: "bottom-right",
        }
      );

      const restoreDeveloperAccount = firebase
        .functions()
        .httpsCallable("restoreDeveloperAccount");

      // Restore account
      const result = await restoreDeveloperAccount();
      console.log(result);

      // Invalidate menu cache
      dispatch(
        menusApi.util.invalidateTags([
          { type: menuType, id: result.data.menuId },
        ])
      );

      toast.update(requestId, {
        render: "Account restored succesfully!",
        autoClose: true,
        delay: 5000,
      });
    } catch (error) {
      console.error(error);
      toast.update(requestId, {
        render:
          "An error occurred while restoring the account. Check the console for more infos.",
        autoClose: true,
        delay: 5000,
      });
      throw error;
    }
  }
);

const initialState = {
  restoreAccount: {
    isRestoring: false,
    lastRestored: null,
  },
};

const slice = createSlice({
  name: "development",
  initialState,
  extraReducers: {
    [restoreDeveloperAccount.pending]: (state) => {
      state.restoreAccount.isRestoring = true;
    },
    [restoreDeveloperAccount.fulfilled]: (state) => {
      state.restoreAccount.isRestoring = false;
      state.restoreAccount.lastRestored = Date.now();
    },
    [restoreDeveloperAccount.rejected]: (state, action) => {
      state.isRestoring = false;
      state.restoreAccount.error = action.error;
    },
  },
});

export default slice.reducer;
