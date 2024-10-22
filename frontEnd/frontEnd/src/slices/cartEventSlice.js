import { createSlice } from "@reduxjs/toolkit";

const cartEventSlice = createSlice({
  name: "cartEvent",
  initialState: {
    eventTriggered: false,
  },
  reducers: {
    triggerCartEvent: (state) => {
      state.eventTriggered = true;
    },
    resetCartEvent: (state) => {
      state.eventTriggered = false;
    },
  },
});

export const { triggerCartEvent, resetCartEvent } = cartEventSlice.actions;
export default cartEventSlice.reducer;
