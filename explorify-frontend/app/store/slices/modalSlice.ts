import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalContent {
  status: number;
  message: string;
  displayButtons?: boolean;
}

interface ModalState {
  type: string;
  modalContent: ModalContent;
  open: boolean;
}

const initialState: ModalState = {
  type: "",
  modalContent: {
    status: 0,
    message: "",
    displayButtons: false,
  },
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: string; modalContent: ModalContent }>
    ) => {
      state.type = action.payload.type;
      state.modalContent = action.payload.modalContent;
      state.open = true;
    },
    closeModal: (state) => {
      state.type = "";
      state.modalContent = { status: 0, message: "" };
      state.open = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
