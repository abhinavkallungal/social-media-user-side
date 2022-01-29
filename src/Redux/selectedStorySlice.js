import { createSlice } from '@reduxjs/toolkit'

const selectedStorySlice = createSlice({
  name: 'selectedStorySlice',
  initialState: {
    selectedStorySlice:null
  },
  reducers: {
    setselectedStorySlice: (state,action) => {

      state.selectedStorySlice=action.payload

    },
    removeselectedStorySlice: state => {

      state.selectedStorySlice=null
    }
  }
})

export const { setselectedStorySlice, removeselectedStorySlice } = selectedStorySlice.actions

export default selectedStorySlice.reducer
