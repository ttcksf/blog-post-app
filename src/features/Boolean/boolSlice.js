import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  starter: false,
};

const boolSlice = createSlice({
  name: "bool",
  initialState,
  reducers: {
    setStarter: (state, action) => {
      state.starter = action.payload.starter;
    },
  },
});

export const { setStarter } = boolSlice.actions;

export const selectStarter = (state) => state.bool.starter;

export default boolSlice.reducer;
