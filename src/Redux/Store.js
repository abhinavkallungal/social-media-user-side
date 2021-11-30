import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import newPostReducer from './newPostSlice'

export default configureStore({
    reducer:{
        user:userReducer,
        newPost:newPostReducer
    }
})