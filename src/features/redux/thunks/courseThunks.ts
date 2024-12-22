import { createAsyncThunk } from '@reduxjs/toolkit';
import { Course } from '../types/student';

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/courses');
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data: Course[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching courses:', error);
      if (error instanceof TypeError) {
        return rejectWithValue('Network error: Failed to fetch courses');
      }
      return rejectWithValue((error as Error).message);
    }
  }
);
