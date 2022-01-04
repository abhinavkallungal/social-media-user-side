import { createSlice } from '@reduxjs/toolkit'


const soketSlice = createSlice({
  name: 'socket',
  initialState: {
    socket:null

  },
  reducers: {
    setSoketAction: (state,action) => {

      state.socket=(action.payload)

    },
   
  }
})

export const { setSoketAction } = soketSlice.actions

export default soketSlice.reducer
