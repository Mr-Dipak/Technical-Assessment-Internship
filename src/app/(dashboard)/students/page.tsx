"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AddStudentDialog } from "@/components/students/add-student-dialog";
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudents } from '@/features/redux/thunks/studentThunks';
import { RootState } from '@/features/redux/store'; // Adjust the path

export default function StudentsPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Access students and status from the Redux store
  const { items: students, status, error } = useSelector((state: RootState) => state.students);

  // Fetch students when the component is mounted
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents());
    }
  }, [dispatch, status]);

  return (
    <>
      <div className="h-full p-4 space-y-2 bg-white border rounded-lg shadow-md dark:bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="p-2 border rounded-md bg-btn dark:bg-secondary">
              <option>AY 2024-25</option>
            </select>
            <select className="p-2 border rounded-md bg-btn dark:bg-secondary">
              <option className="bg-slate-500">CBSE 9</option>
            </select>
          </div>
          <Button
            className="bg-btn text-black hover:text-white dark:bg-secondary dark:text-white"
            onClick={() => setOpen(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add new Student
          </Button>
        </div>
        <div className="border-y">
          {status === 'loading' && <div>Loading...</div>}
          {status === 'failed' && <div>Error: {error}</div>}

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="xs">Student Name</TableHead>
                <TableHead className="xs">Cohort</TableHead>
                <TableHead className="xs">Courses</TableHead>
                <TableHead className="xs">Date Joined</TableHead>
                <TableHead className="xs">Last Login</TableHead>
                <TableHead className="xs">Status</TableHead>
                <TableHead className="xs">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="xs2">{student.name}</TableCell>
                  <TableCell className="xs2">{student.cohort}</TableCell>
                  <TableCell className="xs2">
                    <div className="flex gap-1">
                      {student.courses?.map((course) => (
                        <Badge key={course.id} variant="secondary">
                          {course.name}
                        </Badge>
                      )) ?? null}
                    </div>
                  </TableCell>
                  <TableCell className="xs2">{new Date(student.dateJoined).toLocaleDateString()}</TableCell>
                  <TableCell className="xs2">{new Date(student.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell className="xs2">
                    <Badge variant={student.status === "ACTIVE" ? "success" : "destructive"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="xs2">
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddStudentDialog open={open} onOpenChange={setOpen} />
    </>
  );
}