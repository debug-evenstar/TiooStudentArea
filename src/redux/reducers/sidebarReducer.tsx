import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { StudentProfile } from "../../utils/dataTypes/auth";

const initialState = {
    examFlag: false,
    reload: false,
};

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setExamFlag: (state, action: PayloadAction<any>) => {
      state.examFlag = action.payload;
    },
    toggleSidebarReload: (state) => {
      state.reload = !state.reload;
    }
  },
});

export const { setExamFlag,toggleSidebarReload } = sidebarSlice.actions;

export const selectSidebar = (state: RootState) => state.sidebar;

export default sidebarSlice.reducer;