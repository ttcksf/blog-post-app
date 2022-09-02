import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/User/userSlice";
import boolReducer from "../features/Boolean/boolSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    bool: boolReducer,
  },
});
