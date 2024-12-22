import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/features/redux/store';
import { Student } from '@/features/redux/types/student';

interface StudentsTableProps {
  students: Student[];
}

const StudentsTable: React.FC<StudentsTableProps> = ({ students }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Cohort</th>
          <th>Courses</th>
        </tr>
      </thead>
      <tbody>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.cohort}</td>
            <td>{student.courses.map((course: string | { id: string; name: string }) => typeof course === 'string' ? course : course.id).join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StudentsTable;
