// app/dashboard/page.tsx
// REMOVE the 'use client' directive from this file

import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import DashboardContent from "@/components/dashboard/dashboard-content"; // We'll create this component
import {CreateQuizButton} from "@/app/dashboard/create-quiz-button"; // We'll create this component
export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();
  
  // Get user session
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error || !session) {
    console.error("Dashboard page session error:", error);
    redirect("/auth");
  }
  
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {session.user.name || 'User'}
            </p>
          </div>
          <CreateQuizButton />
        </div>
        
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent userId={session.user.id} />
        </Suspense>
      </div>
    </DashboardShell>
  );
}
