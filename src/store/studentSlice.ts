// filepath: /src/store/studentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface StudentState {
  students: Array<{ id: string; name: string; email: string; cohort: string; courses: string[] }>;
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    addStudent: (state, action: PayloadAction<{ id: string; name: string; email: string; cohort: string; courses: string[] }>) => {
      state.students.push(action.payload);
    },
  },
});

export const { addStudent } = studentSlice.actions;
export default studentSlice.reducer;