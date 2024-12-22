export interface Course {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  name: string;
  email: string;
  cohort: string;
  status: 'active' | 'inactive';
  dateJoined: string;
  lastLogin: string;
  courses: (string | Course)[];
}

export interface StudentsState {
  items: Student[];
  selectedStudent: Student | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}