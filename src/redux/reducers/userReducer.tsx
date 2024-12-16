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
    referral_code: "",
    schoolName: "",
    studentClass: "",
    subjectsCount: 0,
    term: "",
    status: "",
    school: false,
    independent: "",
    metadata: null,
    studyPlan: null,
    studyPlans: null
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
    }, 

    setUserMetaData: (state, action: PayloadAction<any>) => {
      state.user.metadata = action.payload;
    }, 

    setUserExamData: (state, action: PayloadAction<any>) => {
      state.user.metadata = { ...state.user.metadata, exam_data: action.payload}
    },
    setUserStudyPlan: (state, action: PayloadAction<any>) => {
      state.user.studyPlan = action.payload;
    },
    setUserStudyPlans: (state, action: PayloadAction<any>) => {
      state.user.studyPlans = action.payload;
    }
  },
});

export const { saveUser, resetUser, updateShelf ,setUserExamData,setUserStudyPlan, setUserStudyPlans,setUserMetaData} = userSlice.actions;

export const selectExamData = (state: RootState) => state.user.user.metadata.exam_data;
export const selectUser = (state: RootState) => state.user;
export const selectStudyPlan = (state: RootState) => state.user.user.studyPlan;
export const selectStudyPlans = (state: RootState) => state.user.user.studyPlans;
export const selectShelf = (state: RootState) => state.user.shelf;

export default userSlice.reducer;