"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { updateStudent, deleteStudent } from "@/features/redux/thunks/studentThunks";
import { fetchCourses } from "@/features/redux/thunks/courseThunks";
import { AppDispatch, RootState } from "@/features/redux/store";

interface ViewUpdateDeleteDialogProps {
  student: any;
}

export function ViewUpdateDeleteDialog({ student }: ViewUpdateDeleteDialogProps) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(student.name);
  const [email, setEmail] = useState(student.email);
  const [cohort, setCohort] = useState(student.cohort);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses.items);

  const cohorts = ["AY 2024-2025", "AY 2025-2026", "AY 2026-2027"]; // Updated cohort options

  useEffect(() => {
    if (open) {
      dispatch(fetchCourses())
        .unwrap()
        .catch((err) => {
          console.error("Error fetching courses:", err);
        });
    }
  }, [open, dispatch]);

  useEffect(() => {
    if (student.courses) {
      setSelectedCourses(student.courses.map((course: any) => course.id));
    }
  }, [student.courses]);

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
    );
  };

  const handleUpdate = async () => {
    const updatedCourses = selectedCourses.map((courseId) => {
      const course = courses.find((course) => course.id === courseId);
      return course ? { id: course.id, name: course.name } : { id: courseId, name: '' };
    });
    await dispatch(updateStudent({ id: student.id, student: { name, email, cohort, courses: updatedCourses } }));
    setOpen(false);
  };

  const handleDelete = async () => {
    await dispatch(deleteStudent(student.id));
    setOpen(false);
  };

  return (
    <>
      <svg
        onClick={() => setOpen(true)}
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="cursor-pointer"
      >
        <path
          d="M8.625 2.5C8.625 3.12132 8.12132 3.625 7.5 3.625C6.87868 3.625 6.375 3.12132 6.375 2.5C6.375 1.87868 6.87868 1.375 7.5 1.375C8.12132 1.375 8.625 1.87868 8.625 2.5ZM8.625 7.5C8.625 8.12132 8.12132 8.625 7.5 8.625C6.87868 8.625 6.375 8.12132 6.375 7.5C6.375 6.87868 6.87868 6.375 7.5 6.375C8.12132 6.375 8.625 6.87868 8.625 7.5ZM7.5 13.625C8.12132 13.625 8.625 13.1213 8.625 12.5C8.625 11.8787 8.12132 11.375 7.5 11.375C6.87868 11.375 6.375 11.8787 6.375 12.5C6.375 13.1213 6.87868 13.625 7.5 13.625Z"
          fill="currentColor"
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>View / Update / Delete Student</DialogTitle>
            <DialogDescription>Manage student details</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter student name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter student email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cohort">Cohort</Label>
              <select
                id="cohort"
                name="cohort"
                value={cohort}
                onChange={(e) => setCohort(e.target.value)}
                required
                className="input"
              >
                <option value="">Select cohort</option>
                {cohorts.map((cohort) => (
                  <option key={cohort} value={cohort}>
                    {cohort}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label>Courses</Label>
              {courses.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {courses.map((course) => (
                    <div key={course.id} className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id={course.id}
                        checked={selectedCourses.includes(course.id)}
                        onChange={() => toggleCourseSelection(course.id)}
                        className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                      />
                      <Label htmlFor={course.id} className="cursor-pointer">
                        {course.name}
                      </Label>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500">Loading courses...</div>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" type="button" onClick={handleDelete}>
                Delete
              </Button>
              <Button type="button" onClick={handleUpdate}>
                Update
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
