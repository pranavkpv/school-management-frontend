import Sidebar from "@/components/shared/sidebar";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-black">
      <Sidebar role="admin" userName="Admin User" userEmail="admin@school.com" />
      <main className="flex-1 overflow-y-auto m-5">
        {children}
      </main>
    </div>
  );
}