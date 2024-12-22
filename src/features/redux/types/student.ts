export interface Student {
  id: string;
  name: string;
  email: string;
  cohort: string;
  courses: string[]; // Change to string[]
  dateJoined: Date;
  lastLogin: Date;
  status: 'active' | 'inactive';
}

export interface Course {
  id: string;
  name: string;
  description?: string;
}

export interface StudentsState {
  items: Student[];
  selectedStudent: Student | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}