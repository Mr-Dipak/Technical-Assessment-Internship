"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Users, BookOpen, GraduationCap } from "lucide-react";

const stats = [
  {
    title: "Total Students",
    value: "2,350",
    icon: Users,
    description: "Active students across all courses",
    color: "text-blue-500",
  },
  {
    title: "Total Courses",
    value: "12",
    icon: BookOpen,
    description: "Available courses",
    color: "text-green-500",
  },
  {
    title: "Completion Rate",
    value: "85%",
    icon: GraduationCap,
    description: "Average course completion",
    color: "text-purple-500",
  },
  {
    title: "Monthly Progress",
    value: "+12.5%",
    icon: BarChart,
    description: "Compared to last month",
    color: "text-orange-500",
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}