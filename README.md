# Technical Assessment Internship Project

This project is a technical assessment for an internship, built using Next.js, Prisma, and Redux Toolkit. It includes functionalities for managing students and courses.

## Table of Contents

- [Getting Started](#getting-started)
- [Prisma](#prisma)
- [Redux](#redux)
- [API Routes](#api-routes)
- [Components](#components)
- [License](#license)

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/technical-assessment-internship.git
    cd technical-assessment-internship
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Set up the database:
    ```bash
    npx prisma migrate dev
    ```

4. Run the development server:
    ```bash
    npm run dev
    ```

## Prisma

Prisma is used as the ORM for this project. It provides a type-safe database client and a powerful migration system.

### Setup

Prisma is configured in the `prisma/schema.prisma` file. Ensure you have a `.env` file with the database connection string:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
```

### Migrations

To create a new migration, run:
```bash
npx prisma migrate dev --name migration_name
```

### Prisma Client

The Prisma Client is generated and used to interact with the database. Example usage:

```typescript
import prisma from '@/lib/db';

const students = await prisma.student.findMany({
  include: { courses: true },
});
```

### Models

The main models used in this project are `Student` and `Course`. They are defined in the `prisma/schema.prisma` file:

```prisma
model Student {
  id         String   @id @default(uuid())
  name       String
  email      String   @unique
  cohort     String
  status     String   @default("ACTIVE")
  dateJoined DateTime @default(now())
  lastLogin  DateTime @updatedAt
  courses    Course[]
}

model Course {
  id    String    @id @default(uuid())
  name  String
  students Student[]
}
```

## Redux

Redux Toolkit is used for state management in this project. It simplifies the setup and usage of Redux.

### Setup

Redux is configured in the `src/features/redux` directory. The main files are:

- `store.ts`: Configures the Redux store.
- `slices/`: Contains slice files for different features.
- `thunks/`: Contains thunk files for asynchronous actions.

### Store

The Redux store is configured in `src/features/redux/store.ts`:

```typescript
import { configureStore } from '@reduxjs/toolkit';
import studentsReducer from './slices/studentsSlice';
import coursesReducer from './slices/coursesSlice';

export const store = configureStore({
  reducer: {
     students: studentsReducer,
     courses: coursesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

### Slices

Slices are used to manage state for different features. Example: `studentsSlice.ts`:

```typescript
import { createSlice } from '@reduxjs/toolkit';
import { fetchStudents, createStudent, updateStudent, deleteStudent } from '../thunks/studentThunks';

const initialState = {
  items: [],
  selectedStudent: null,
  status: 'idle',
  error: null,
};

const studentsSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
     setSelectedStudent: (state, action) => {
        state.selectedStudent = action.payload;
     },
     clearError: (state) => {
        state.error = null;
     },
  },
  extraReducers: (builder) => {
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
     // ...other cases for createStudent, updateStudent, deleteStudent
  },
});

export const { setSelectedStudent, clearError } = studentsSlice.actions;
export default studentsSlice.reducer;
```

### Thunks

Thunks are used for asynchronous actions. Example: `studentThunks.ts`:

```typescript
import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchStudentsApi, createStudentApi, updateStudentApi, deleteStudentApi } from '../api/studentApi';

export const fetchStudents = createAsyncThunk('students/fetchStudents', async () => {
  const response = await fetchStudentsApi();
  return response;
});

export const createStudent = createAsyncThunk('students/createStudent', async (student) => {
  const response = await createStudentApi(student);
  return response;
});

// ...other thunks for updateStudent, deleteStudent
```

## API Routes

API routes are defined in the `src/app/api` directory. They handle requests to the backend.

### Students API

- `GET /api/students`: Fetch all students.
- `POST /api/students`: Create a new student.
- `PUT /api/students`: Update an existing student.
- `DELETE /api/students`: Delete a student.

### Courses API

- `GET /api/courses`: Fetch all courses.

## Components

Components are located in the `src/components` directory. Key components include:

- `StudentsTable`: Displays a table of students.
- `AddStudentDialog`: Dialog for adding a new student.
- `ViewUpdateDeleteDialog`: Dialog for viewing, updating, and deleting a student.

## License

This project is licensed under the MIT License.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/Mr-Dipak/Technical-Assessment-Internship)
