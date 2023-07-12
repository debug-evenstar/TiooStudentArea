import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { UserProfile } from "../../utils/dataTypes/auth";

const initialState = {
  user: {
    name: "",
    id: "",
    schoolId: "",
    status: "",
    email: "",
    account_type: "",
    phone: "",
    token: "",
  } as UserProfile,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action: PayloadAction<UserProfile>) => {
      state.user = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
  },
});

export const { saveUser, resetUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;