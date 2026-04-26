import Link from "next/link";
import { GraduationCap } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/students", label: "Students" },
  { href: "/teachers", label: "Teachers" },
  { href: "/classes", label: "Classes" },
  { href: "/subjects", label: "Subjects" },
  { href: "/attendance", label: "Attendance" },
  { href: "/fees", label: "Fees" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4">
          <GraduationCap className="size-5" />
          <p className="text-sm font-semibold">School Management</p>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[220px_1fr]">
        <aside className="rounded-lg border bg-background p-3">
          <nav className="grid gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-sm hover:bg-muted"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="rounded-lg border bg-background p-6">{children}</main>
      </div>
    </div>
  );
}
