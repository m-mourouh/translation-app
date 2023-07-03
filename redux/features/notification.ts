import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NotificationType = {
  text: "",
  isVisible: false,
};

const translationReducer = createSlice({
  name: "translationReducer",
  initialState,
  reducers: {
    showNotification: (state: NotificationType, action: PayloadAction<string>) => {
      state.text = action.payload;
      state.isVisible = true
    },
    hideNotification: (state: NotificationType) => {
      state.isVisible = false
    },
  },
});

export default translationReducer.reducer;
export const { showNotification, hideNotification } = translationReducer.actions;
