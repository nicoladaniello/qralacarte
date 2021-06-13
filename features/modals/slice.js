import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "modals",
  initialState: {},
  reducers: {
    openModal(state, action) {
      const { modal, props } = action.payload;
      state[modal] = {
        isOpen: true,
        props,
      };
    },
    closeModal(state, action) {
      const modal = action.payload;
      state[modal] = null;
    },
  },
});

export const { openModal, closeModal } = slice.actions;

export const selectModal = (state, modal) => state.modals[modal.name];

export default slice.reducer;
