import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { StudentProfile } from "../../utils/dataTypes/auth";

const initialState = {
  user: {
    shelf: []
  } ,
};

export const booksSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserShelf: (state, action: PayloadAction<any>) => {
      state.user.shelf = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { saveUserShelf, resetUser } = booksSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;