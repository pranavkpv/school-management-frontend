"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
   GraduationCap,
   LayoutDashboard,
   Users,
   BookOpen,
   ClipboardList,
   BarChart3,
   Settings,
   LogOut,
   Menu,
   X,
   Bell,
   ChevronRight,
} from "lucide-react";

interface NavItem {
   label: string;
   href: string;
   icon: React.ElementType;
}

interface SidebarProps {
   role: "admin" | "teacher" | "student";
   userName?: string;
   userEmail?: string;
}

const NAV_ITEMS: Record<string, NavItem[]> = {
   admin: [
      {
         label: "Dashboard",
         href: "/dashboard",
         icon: LayoutDashboard
      },

      {
         label: "Classes",
         href: "/dashboard/classes",
         icon: BookOpen
      },

      {
         label: "Subjects",
         href: "/dashboard/subjects",
         icon: BookOpen
      },

      {
         label: "Students",
         href: "/dashboard/students",
         icon: Users
      },

      {
         label: "Teachers",
         href: "/dashboard/teachers",
         icon: GraduationCap
      },

      {
         label: "Assignments",
         href: "/dashboard/assignments",
         icon: GraduationCap
      },

      {
         label: "Reports",
         href: "/dashboard/reports",
         icon: BarChart3
      },

      {
         label: "Settings",
         href: "/dashboard/settings",
         icon: Settings
      },
   ]
};

const ROLE_BADGE_COLORS = {
   admin: "bg-[#e0ff4f]/10 text-[#e0ff4f] border-[#e0ff4f]/20",
   teacher: "bg-blue-500/10 text-blue-400 border-blue-500/20",
   student: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default function Sidebar({ role, userName = "User", userEmail = "" }: SidebarProps) {
   const pathname = usePathname();
   const router = useRouter();
   const [open, setOpen] = useState(false);
   const navItems = NAV_ITEMS[role] || [];

   async function handleLogout() {
      await fetch("http://localhost:5000/api/auth/logout", {
         method: "POST",
         credentials: "include",
      }).catch(() => { });
      router.push("/login");
   }

   const SidebarContent = () => (
      <div className="flex h-full flex-col">
         {/* Logo */}
         <div className="flex items-center gap-3 border-b border-white/5 px-5 py-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#e0ff4f]/10 border border-[#e0ff4f]/20">
               <GraduationCap className="h-4 w-4 text-[#e0ff4f]" />
            </div>
            <div>
               <span className="text-sm font-semibold text-white">SchoolMS</span>
            </div>
            <button
               onClick={() => setOpen(false)}
               className="ml-auto rounded-md p-1 text-white/30 hover:text-white/60 lg:hidden"
            >
               <X className="h-4 w-4" />
            </button>
         </div>

         {/* Role badge */}
         <div className="px-4 py-3">
            <span className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium uppercase tracking-wider ${ ROLE_BADGE_COLORS[role] }`}>
               {role}
            </span>
         </div>

         {/* Nav */}
         <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-1">
            {navItems.map((item) => {
               const isActive = pathname === item.href;
               return (
                  <Link
                     key={item.href}
                     href={item.href}
                     onClick={() => setOpen(false)}
                     className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${ isActive
                           ? "bg-white/10 text-white"
                           : "text-white/40 hover:bg-white/5 hover:text-white/80"
                        }`}
                  >
                     <item.icon className={`h-4 w-4 ${ isActive ? "text-[#e0ff4f]" : "text-white/30 group-hover:text-white/60" }`} />
                     {item.label}
                     {isActive && <ChevronRight className="ml-auto h-3 w-3 text-white/20" />}
                  </Link>
               );
            })}
         </nav>

         {/* User */}
         <div className="border-t border-white/5 p-3">
            <div className="mb-2 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2">
               <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold text-white">
                  {userName.charAt(0).toUpperCase()}
               </div>
               <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{userName}</p>
                  <p className="truncate text-xs text-white/30">{userEmail}</p>
               </div>
            </div>
            <button
               onClick={handleLogout}
               className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400"
            >
               <LogOut className="h-4 w-4" />
               Sign out
            </button>
         </div>
      </div>
   );

   return (
      <>
         {/* Mobile toggle */}
         <button
            onClick={() => setOpen(true)}
            className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-black text-white/60 hover:text-white lg:hidden"
         >
            <Menu className="h-4 w-4" />
         </button>

         {/* Mobile overlay */}
         {open && (
            <div
               className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
               onClick={() => setOpen(false)}
            />
         )}

         {/* Mobile drawer */}
         <aside
            className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-white/5 bg-[#050505] transition-transform duration-200 lg:hidden ${ open ? "translate-x-0" : "-translate-x-full"
               }`}
         >
            <SidebarContent />
         </aside>

         {/* Desktop sidebar */}
         <aside className="hidden w-64 flex-shrink-0 border-r border-white/5 bg-[#050505] lg:flex lg:flex-col">
            <SidebarContent />
         </aside>
      </>
   );
}