import { Student } from '../types/student';

export async function fetchStudentsApi() {
  const response = await fetch('/api/students');
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  return response.json();
}

export async function createStudentApi(student: Omit<Student, 'id' | 'dateJoined' | 'lastLogin'>) {
  const response = await fetch('/api/students', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to create student');
  }
  return response.json();
}

export async function updateStudentApi(id: string, student: Partial<Student>) {
  const response = await fetch(`/api/students/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(student),
  });
  if (!response.ok) {
    throw new Error('Failed to update student');
  }
  return response.json();
}

export async function deleteStudentApi(id: string) {
  const response = await fetch(`/api/students/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Failed to delete student');
  }
  return response.json();
}