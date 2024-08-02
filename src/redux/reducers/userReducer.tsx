import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { StudentProfile } from "../../utils/dataTypes/auth";

const initialState = {
  user: {
    AccountId: 0,
    name: "",
    email: "",
    phone: "",
    account_type: "",
    verification_status: 0,
    flag: "",
    schoolName: "",
    studentClass: "",
    subjectsCount: 0,
    term: "",
    status: "",
    school: false,
    independent: "",
  } as StudentProfile,
  shelf: [] as number[],

};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<StudentProfile>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },

    updateShelf: (state, action: PayloadAction<number[]>) => {
      state.shelf = action.payload;
    }
  },
});

export const { saveUser, resetUser, updateShelf } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectShelf = (state: RootState) => state.user.shelf;

export default userSlice.reducer;