// components/dashboard/mobile-nav.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, LayoutDashboard, ListChecks, BarChart3, Settings, CreditCard, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden mb-6"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[240px] sm:w-[280px] pr-0">
        <div className="px-2 py-6">
          <div className="flex items-center justify-between mb-4">
            <Link href="/" className="font-bold text-xl">QuizApp</Link>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
          <nav className="grid gap-2 py-2">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link
                  key={index}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-x-2 text-sm font-medium rounded-lg px-3 py-2",
                    pathname === item.href
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}