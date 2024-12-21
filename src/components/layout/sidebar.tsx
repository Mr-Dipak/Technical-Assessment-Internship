"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  HelpCircle,
  PieChart,
  Settings,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Students",
    icon: Users,
    href: "/students",
    color: "text-violet-500",
  },
  {
    label: "Chapter",
    icon: BookOpen,
    href: "/chapter",
    color: "text-pink-700",
  },
  {
    label: "Help",
    icon: HelpCircle,
    href: "/help",
    color: "text-orange-700",
  },
  {
    label: "Reports",
    icon: PieChart,
    href: "/reports",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-700",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-white dark:bg-gray-900">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
            <img src="/logo/logo.svg"  className="w-28 mr-2" />
            {/* <h1 className="text-2xl font-bold">Quyl.</h1> */}
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-primary hover:bg-primary/10 rounded-lg transition",
                pathname === route.href ? "text-primary bg-primary/10" : "text-muted-foreground"
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <ThemeToggle />
      </div>
    </div>
  );
}