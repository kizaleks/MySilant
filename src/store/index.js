import { configureStore } from '@reduxjs/toolkit'
import appSlice from './app';
import profileSlice from './profile';


export default configureStore({
  reducer: {
    app:appSlice,
    profile:profileSlice,
  }
})
