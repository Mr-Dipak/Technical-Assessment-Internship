import { NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { z } from 'zod'; // Using Zod for validation

// Validation Schemas
const studentSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  cohort: z.string(),
  courses: z.array(z.string()),
});

const updateStudentSchema = z.object({
  id: z.string().min(1, "Student ID is required"),
  name: z.string().optional(),
  email: z.string().email("Invalid email format").optional(),
  cohort: z.string().optional(),
  status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  lastLogin: z.string().datetime().optional(),
  courses: z.array(z.string()).default([]), // Ensure courses is always an array
});

const deleteStudentSchema = z.object({
  id: z.string().min(1, "Student ID is required"),
});

// Handlers
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: { courses: true },
    });
    return NextResponse.json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json({ error: "Error fetching students" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsedBody = studentSchema.parse(body);

    const student = await prisma.student.create({
      data: {
        name: parsedBody.name,
        email: parsedBody.email,
        cohort: parsedBody.cohort,
        courses: {
          connect: parsedBody.courses.map((courseId) => ({ id: courseId })),
        },
      },
    });

    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Error creating student:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Error creating student: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const parsedData = updateStudentSchema.parse(body);

    const { id, ...data } = parsedData;

    const student = await prisma.student.update({
      where: { id },
      data: {
        ...data,
        courses: data.courses
          ? { connect: data.courses.map((id) => ({ id })) }
          : undefined,
      },
      include: { courses: true },
    });

    return NextResponse.json(student);
  } catch (error: any) {
    console.error("Error updating student:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Error updating student: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const parsedData = deleteStudentSchema.parse(body);

    const { id } = parsedData;

    await prisma.student.delete({
      where: { id },
    });

    return NextResponse.json({ id });
  } catch (error: any) {
    console.error("Error deleting student:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: `Error deleting student: ${error.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
