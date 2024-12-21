"use client";

import { useState } from "react";
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

const students = [
  {
    id: 1,
    name: "Anshuman Kashyap",
    cohort: "AY 2024-25",
    courses: ["CBSE 9 Science", "CBSE 9 Math"],
    dateJoined: "17. Nov. 2024",
    lastLogin: "17. Nov. 2024 4:16 PM",
    status: "active",
  },
  // Add more students as needed
];

export default function StudentsPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-full p-4 space-y-2 bg-white border rounded-lg shadow-md dark:bg-background">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <select className="p-2 border rounded-md bg-btn dark:bg-secondary">
              <option >AY 2024-25</option>
            </select>
            <select className="p-2 border rounded-md bg-btn dark:bg-secondary">
              <option className="bg-slate-500">CBSE 9</option>
            </select>
          </div>
          <Button className="bg-btn text-black hover:text-white dark:bg-secondary dark:text-white" onClick={() => setOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add new Student
          </Button>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student Name</TableHead>
                <TableHead>Cohort</TableHead>
                <TableHead>Courses</TableHead>
                <TableHead>Date Joined</TableHead>
                <TableHead>Last Login</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.cohort}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {student.courses.map((course) => (
                        <Badge key={course} variant="secondary">
                          {course}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>{student.dateJoined}</TableCell>
                  <TableCell>{student.lastLogin}</TableCell>
                  <TableCell>
                    <Badge
                      variant={student.status === "active" ? "success" : "destructive"}
                    >
                      {student.status}
                    </Badge>
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