import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isCdcLogin: false,
  isCollegeLogin: false
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
      }

    }
});
export const { officialLogin, collegeLogin } = authSlice.actions

export default authSlice.reducer