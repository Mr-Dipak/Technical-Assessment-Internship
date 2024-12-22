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
import { RootState } from '@/features/redux/store';
import { DialogAction, DialogContent } from "@/components/ui/dialog";
import { ViewUpdateDeleteDialog } from "@/components/action/view-update-delete";

export default function StudentsPage() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  // Access students and status from the Redux store
  const { items: students, status, error } = useSelector((state: RootState) => state.students);

  // Fetch students when the component is mounted
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchStudents() as any);
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
                        <Badge key={typeof course === 'string' ? course : course.id} variant="secondary">
                          {typeof course === 'string' ? course : course.name}
                        </Badge>
                      )) ?? null}
                    </div>
                  </TableCell>
                  <TableCell className="xs2">{new Date(student.dateJoined).toLocaleDateString()}</TableCell>
                  <TableCell className="xs2">{new Date(student.lastLogin).toLocaleDateString()}</TableCell>
                  <TableCell className="xs2">
                    <Badge variant={student.status === "active" ? "success" : "destructive"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="xs2">
                    <ViewUpdateDeleteDialog student={student} />
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