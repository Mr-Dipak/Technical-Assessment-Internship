import { useSelector } from 'react-redux';
import { RootState } from '@/features/redux/store';

export function StudentsTable() {
  const students = useSelector((state: RootState) => state.students.items);

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
            <td>{student.courses.map(course => course.id).join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
