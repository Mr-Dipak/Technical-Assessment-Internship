import { Student } from '../types/student';

// Fetch all students, including courses and status
export async function fetchStudentsApi() {
  const response = await fetch('/api/students');
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
}

// Create a new student with courses
export async function createStudentApi(student: Omit<Student, 'id' | 'dateJoined' | 'lastLogin'> & { courses: string[] }) {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to create student:', errorText);
    throw new Error('Failed to create student');
  }
  return response.json();
}

// Update an existing student with new data
export async function updateStudentApi(id: string, student: Partial<Student>) {
  const response = await fetch('/api/students', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, ...student }),
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to update student:', errorText);
    throw new Error('Failed to update student');
  }
  return response.json();
}

// Delete a student by their ID
export async function deleteStudentApi(id: string) {
  const response = await fetch('/api/students', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }), // Ensure payload is an object
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error('Failed to delete student:', errorText);
    throw new Error('Failed to delete student');
  }
  return response.json();
}
