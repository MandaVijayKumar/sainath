import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCdcLogin: false,
  isCollegeLogin: false,
  dumy:false,
  isCheck: false,
}
export const authSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {

      officialLogin: (state) => {       
        state.isCdcLogin = !state.isCdcLogin; 
      },

      collegeLogin: (state) => {
        state.isCollegeLogin = !state.isCollegeLogin;
      },
      collegeDumy: (state) => {
        state.dumy = !state.dumy;
      },
      checkEnable: (state) => {
        state.isCheck = !state.isCheck;
      }

    }
});
export const { officialLogin, collegeLogin, collegeDumy, checkEnable } = authSlice.actions

export default authSlice.reducer