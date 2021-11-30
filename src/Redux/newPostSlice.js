import { createSlice } from '@reduxjs/toolkit'

const newPostSlice = createSlice({
  name: 'newPost',
  initialState: {
    post:null
  },
  reducers: {
    setNewPostAction: (state,action) => {

      state.post=action.payload

    },
    removeNewPostAction: state => {

      state.post=null
    }
  }
})

export const { setNewPostAction, removeNewPostAction } = newPostSlice.actions

export default newPostSlice.reducer
