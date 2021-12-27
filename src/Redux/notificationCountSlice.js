import { createSlice } from '@reduxjs/toolkit'

const notificationCountSlice = createSlice({
  name: 'notificationCount',
  initialState: {
    notificationCount:0
  },
  reducers: {
    setNotificationCountAction: (state,action) => {
        console.log(action.payload);
        state.notificationCount=(action.payload)

    }
  }
})

export const { setNotificationCountAction } = notificationCountSlice.actions

export default notificationCountSlice.reducer
