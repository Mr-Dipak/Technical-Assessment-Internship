"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStudent } from '@/features/redux/thunks/studentThunks';

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const cohort = formData.get("cohort") as string;

    // Dispatch the action to add a new student
    dispatch(createStudent({ name, email, cohort, courses: selectedCourses }))
      .then((result) => {
        if (createStudent.rejected.match(result)) {
          setError(result.payload || 'Error creating student');
        } else {
          onOpenChange(false);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Error creating student');
        setLoading(false);
      });
  };

  const toggleCourseSelection = (course: string) => {
    setSelectedCourses((prev) =>
      prev.includes(course) ? prev.filter((c) => c !== course) : [...prev, course]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Student</DialogTitle>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" placeholder="Enter student name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="Enter student email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cohort">Cohort</Label>
            <Input id="cohort" name="cohort" placeholder="Enter cohort" required />
          </div>
          <div className="space-y-2">
            <Label>Courses</Label>
            <div className="flex flex-col gap-2">
              {["CBSE 9 Science", "CBSE 9 Math"].map((course) => (
                <div key={course} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id={course}
                    checked={selectedCourses.includes(course)}
                    onChange={() => toggleCourseSelection(course)}
                    className="h-5 w-5 cursor-pointer rounded border-gray-300 text-primary focus:ring-2 focus:ring-primary"
                  />
                  <Label htmlFor={course} className="cursor-pointer">
                    {course}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <div className="flex justify-end gap-2">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Adding..." : "Add Student"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}