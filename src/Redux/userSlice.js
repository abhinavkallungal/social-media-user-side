import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user:{
      name:'Abhinav kallungal',
      email:null,
      token :null,
    }

  },
  reducers: {
    loginAction: (state,action) => {

      state.user=action.payload

    },
    logoutAction: state => {
      console.log("logout action");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      state.user = null

    }
  }
})

export const { loginAction, logoutAction } = userSlice.actions

export default userSlice.reducer
