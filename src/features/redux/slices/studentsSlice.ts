import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { StudentsState, Student } from '../types/student';
import { 
  fetchStudents, 
  createStudent, 
  updateStudent, 
  deleteStudent 
} from '../thunks/studentThunks';

const initialState: StudentsState = {
  items: [],
  selectedStudent: null,
  status: 'idle',
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setSelectedStudent: (state, action: PayloadAction<Student | null>) => {
      state.selectedStudent = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch Students
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch students';
      });

    // Create Student
    builder
      .addCase(createStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(createStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create student';
      });

    // Update Student
    builder
      .addCase(updateStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to update student';
      });

    // Delete Student
    builder
      .addCase(deleteStudent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = state.items.filter(item => item.id !== action.payload.id);
      })
      .addCase(deleteStudent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to delete student';
      });
  },
});

export const { setSelectedStudent, clearError } = studentsSlice.actions;
export default studentsSlice.reducer;
