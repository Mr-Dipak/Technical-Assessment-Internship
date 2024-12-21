import { Sidebar } from "@/components/layout/sidebar";
import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full relative flex dark:bg-background " >
      {/* Sidebar */}
      <div className="hidden md:flex md:w-60 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>

      
      {/* Main Content */}
      <main className="flex-1 md:pl-60 ml-4">
        <nav className=" border-none">
          <Navbar />
        </nav>
        {children}
      </main>
    </div>
  );
}
