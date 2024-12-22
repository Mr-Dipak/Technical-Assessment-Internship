import { createAsyncThunk } from '@reduxjs/toolkit';
import { Student } from '../types/student';
import { 
  fetchStudentsApi, 
  createStudentApi, 
  updateStudentApi, 
  deleteStudentApi 
} from '../api/studentApi';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async () => {
    return await fetchStudentsApi();
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (student: Omit<Student, 'id' | 'dateJoined' | 'lastLogin'>, { rejectWithValue }) => {
    try {
      console.log('Creating student with payload:', student);
      return await createStudentApi(student);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, student }: { id: string; student: Partial<Student> }, { rejectWithValue }) => {
    try {
      return await updateStudentApi(id, student);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id: string, { rejectWithValue }) => {
    try {
      return await deleteStudentApi(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);