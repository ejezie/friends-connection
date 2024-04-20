// modal.slice.js
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialStateType {
  title: null | string;
  message: null | string;
  success: boolean;
  promptMessage: null | string;
  promptLink: null | string;
  isOpen: boolean;
  isOpenComponent: boolean;
  component: null | string;
  data: null | string;
}

const initialState: InitialStateType = {
  title: null,
  message: null,
  success: false,
  promptMessage: null,
  promptLink: null,
  isOpen: false,
  isOpenComponent: false,
  component: null,
  data: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state: InitialStateType,
      action: PayloadAction<InitialStateType>
    ) => {
      const modalObj = action.payload;

      // Check if it's a message modal
      if (modalObj.title || modalObj.message) {
        state.title = modalObj.title || null;
        state.message = modalObj.message || null;
        state.success = modalObj.success || false;
        state.promptMessage = modalObj.promptMessage || null;
        state.promptLink = modalObj.promptLink || null;
        state.isOpen = true;
      }

      // Check if it's a component modal
      if (modalObj.component) {
        state.isOpenComponent = true;
        state.component = modalObj.component;
        state.data = modalObj.data || null;
      }
    },

    closeModal: (state: InitialStateType) => {
      const newState = { ...state };
      newState.title = null;
      newState.message = null;
      newState.success = false;
      newState.promptMessage = null;
      newState.promptLink = null;
      newState.isOpen = false;
      return newState;
    },
    closeComponentModal: (state) => {
      const newState = { ...state };
      newState.isOpenComponent = false;
      newState.component = null;
      newState.data = null;
      return newState;
    },
  },
});

// Export the slice actions and reducer
export const { openModal, closeModal, closeComponentModal } =
  modalSlice.actions;
export default modalSlice.reducer;
