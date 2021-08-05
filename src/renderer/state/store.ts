import { configureStore } from '@reduxjs/toolkit';
import contextReducer from './contextSlice';

export const store = configureStore({
  reducer: {
      context: contextReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch