import { createAsyncThunk } from '@reduxjs/toolkit';
import { Student, Course } from '../types/student';
import { 
  fetchStudentsApi, 
  createStudentApi, 
  updateStudentApi, 
  deleteStudentApi 
} from '../api/studentApi';

export const fetchStudents = createAsyncThunk(
  'students/fetchStudents',
  async (_, { rejectWithValue }) => {
    try {
      const students = await fetchStudentsApi();
      return students;
    } catch (error) {
      console.error('Error fetching students:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const createStudent = createAsyncThunk(
  'students/createStudent',
  async (student: Omit<Student, 'id' | 'dateJoined' | 'lastLogin'> & { courses: string[] }, { rejectWithValue }) => {
    try {
      console.log('Creating student with payload:', student);
      // Convert course IDs to Course objects
      const courses: Course[] = student.courses.map(courseId => ({ id: courseId } as Course));
      const response = await createStudentApi({ ...student, courses });
      console.log('API response:', response);
      return response;
    } catch (error) {
      console.error('Error creating student:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateStudent = createAsyncThunk(
  'students/updateStudent',
  async ({ id, student }: { id: string; student: Partial<Student> }, { rejectWithValue }) => {
    try {
      const updatedStudent = await updateStudentApi(id, student);
      return updatedStudent;
    } catch (error) {
      console.error('Error updating student:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteStudent = createAsyncThunk(
  'students/deleteStudent',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await deleteStudentApi(id);
      return response;
    } catch (error) {
      console.error('Error deleting student:', error);
      return rejectWithValue((error as Error).message);
    }
  }
);
