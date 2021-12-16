import { Iterable } from 'immutable'
import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  isPlain,
} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import newPostReducer from './newPostSlice'
import newSocketReducer from './socketSlice'

// Augment middleware to consider Immutable.JS iterables serializable
const isSerializable = (value) => Iterable.isIterable(value) || isPlain(value)

const getEntries = (value) =>
  Iterable.isIterable(value) ? value.entries() : Object.entries(value)

const serializableMiddleware = createSerializableStateInvariantMiddleware({
    isSerializable,
    getEntries,
  })
  
 

export default configureStore({
    reducer:{
        user:userReducer,
        newPost:newPostReducer,
        socket:newSocketReducer
    },
    middleware: [serializableMiddleware],
})