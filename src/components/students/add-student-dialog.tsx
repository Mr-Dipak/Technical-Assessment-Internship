"use client";

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createStudent } from "@/features/redux/thunks/studentThunks";
import { AppDispatch, RootState } from "@/features/redux/store";
import { fetchCourses } from "@/features/redux/thunks/courseThunks";
import { Course } from "@/features/redux/types/student";

interface AddStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AddStudentDialog({ open, onOpenChange }: AddStudentDialogProps) {
  const [loading, setLoading] = useState(false);
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const courses = useSelector((state: RootState) => state.courses.items);

  const cohorts = ["AY 2024-2025", "AY 2025-2026", "AY 2026-2027"]; // Predefined cohort options

  // Fetch courses when the dialog opens
  useEffect(() => {
    if (open) {
      dispatch(fetchCourses())
        .unwrap()
        .catch((err) => {
          console.error("Error fetching courses:", err);
          setError("Failed to load courses.");
        });
    }
  }, [open, dispatch]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const cohort = formData.get("cohort")?.toString().trim();

    // Validation
    if (!name || !email || !cohort) {
      setError("All fields are required.");
      setLoading(false);
      return;
    }

    if (selectedCourses.length === 0) {
      setError("Please select at least one course.");
      setLoading(false);
      return;
    }

    try {
      const coursesToSubmit = selectedCourses.map((courseId) => {
        const course = courses.find((course) => course.id === courseId);
        return course ? { id: course.id, name: course.name } : { id: courseId, name: '' };
      });

      await dispatch(
        createStudent({
          name,
          email,
          cohort,
          courses: coursesToSubmit, // Send course objects with id and name
        })
      ).unwrap();
      onOpenChange(false);
    } catch (err) {
      console.error("Error creating student:", err);
      setError((err as Error).message || "Failed to add student.");
    } finally {
      setLoading(false);
    }
  };

  const toggleCourseSelection = (courseId: string) => {
    setSelectedCourses((prev) =>
      prev.includes(courseId) ? prev.filter((id) => id !== courseId) : [...prev, courseId]
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
            <select id="cohort" name="cohort" required className="input">
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
