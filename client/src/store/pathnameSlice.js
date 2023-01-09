import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";

const initialState = { pathname: "" };

const path = createSlice({
  name: "path",
  initialState,
  reducers: {
    savePathname(state, action) {
      console.log(state, action);
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { savePathname } = path.actions;

export default path;
