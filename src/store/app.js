import { createSlice } from '@reduxjs/toolkit'

export const app = createSlice({
  name: 'app',
  initialState: {
    width: window.innerWidth
  },
  reducers: {
    setScreenWidth: (state, action) => {
      state.width = action.payload
    }
  }
})

export const {setScreenWidth} = app.actions

export default app.reducer