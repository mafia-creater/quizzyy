// components/dashboard/dashboard-shell.tsx
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ListChecks, 
  BarChart3, 
  Settings, 
  CreditCard,
  User
} from "lucide-react";

import { cn } from "@/lib/utils";
import { MobileNav } from "@/components/dashboard/mobile-nav";

interface DashboardShellProps {
  children: React.ReactNode;
}

export default function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <div className="py-6 pr-6 lg:py-8">
            <SideNav />
          </div>
        </aside>
        <main className="relative py-6 px-4 lg:px-8 lg:py-8 max-w-6xl w-full mx-auto">
          <MobileNav />
          {children}
        </main>
      </div>
    </div>
  );
}

function SideNav() {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Quizzes",
      href: "/dashboard/quizzes",
      icon: ListChecks
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: User
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings
    },
  ];

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
              pathname === item.href ? "bg-accent text-accent-foreground" : "transparent"
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}