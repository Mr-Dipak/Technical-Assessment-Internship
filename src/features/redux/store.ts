// src/features/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentsSlice';
import coursesReducer from './slices/coursesSlice'; // Import courses reducer

export const store = configureStore({
  reducer: {
    students: studentsReducer,
    courses: coursesReducer, // Add courses reducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;