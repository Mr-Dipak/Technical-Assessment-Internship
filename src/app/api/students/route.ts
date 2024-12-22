// src/app/api/students/route.ts
import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

// Remove the dynamic export
// export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const students = await prisma.student.findMany({
      include: {
        courses: true, 
      },
    });
    return NextResponse.json(students);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching students' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const student = await prisma.student.create({
      data: {
        name: body.name,
        email: body.email,
        cohort: body.cohort,
        courses: {
          connect: body.courses.map((id: string) => ({ id })),
        },
      },
      include: {
        courses: true,
      },
    });
    return NextResponse.json(student);
  } catch (error) {
    return NextResponse.json({ error: 'Error creating student' }, { status: 500 });
  }
}