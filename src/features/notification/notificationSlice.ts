import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NotificationState {
  message: string | null;
}

const initialState: NotificationState = {
  message: null,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;
export default notificationSlice.reducer;
