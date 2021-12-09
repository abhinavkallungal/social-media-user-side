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
      console.log(action.payload);
      state.user=({...action.payload})

    },
    logoutAction: state => {
      state.user = null
      console.log("logout action");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload()

    }
  }
})

export const { loginAction, logoutAction } = userSlice.actions

export default userSlice.reducer
