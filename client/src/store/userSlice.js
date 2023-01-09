import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
const initialState = { id: "", nick:"", name: "", good_cnt: 0, bad_cnt: 0, user_no: 0 };
const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    increaseGoodCnt(state) {
      state.good_cnt += 1;
    },
    increaseBadCnt(state) {
      state.bad_cnt += 1;
    },
    saveUser(state, action) {
      return { ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => initialState);
  },
});

export const { increaseGoodCnt, increaseBadCnt, saveUser } = user.actions;

export default user;
