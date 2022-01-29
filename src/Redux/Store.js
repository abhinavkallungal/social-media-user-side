import { Iterable } from 'immutable'
import { getDefaultMiddleware } from '@reduxjs/toolkit';

import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import newPostReducer from './newPostSlice'
import newSocketReducer from './socketSlice'
import newNotificationCountReducer from './notificationCountSlice'
import newSelectedStorySlice from './selectedStorySlice'

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value)

const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
  })

  const customizedMiddleware = getDefaultMiddleware({
    serializableCheck: false
  })
  
 

export default configureStore({
    reducer:{
        user:userReducer,
        newPost:newPostReducer,
        socket:newSocketReducer,
        notificationCount:newNotificationCountReducer,
        selectedStorySlice:newSelectedStorySlice
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})