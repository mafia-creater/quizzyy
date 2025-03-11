'use client';
// app/dashboard/page.tsx


import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { QuizGrid } from "@/components/dashboard/quiz-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card";
import { SubscriptionStatus } from "@/components/dashboard/subscription-status";
import { DashboardSkeleton } from "@/components/dashboard/dashboard-skeleton";
import { getUserQuizzes } from "@/lib/quiz";
import { getQuizActivity } from "@/lib/activity";
import { getLeaderboard } from "@/lib/leaderboard";
import { getCurrentSubscription } from "@/lib/subscription";

export default async function DashboardPage() {
  const session = await getServerSession();
  
  if (!session?.user) {
    redirect("/auth/signin");
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
          <Button size="sm" className="flex items-center gap-1" asChild>
            <a href="/dashboard/quizzes/create">
              <PlusCircle className="h-4 w-4" />
              <span>Create Quiz</span>
            </a>
          </Button>
        </div>
        
        <Suspense fallback={<DashboardSkeleton />}>
          <DashboardContent userId={session.user.id} />
        </Suspense>
      </div>
    </DashboardShell>
  );
}

async function DashboardContent({ userId }: { userId: string }) {
  const quizzes = await getUserQuizzes(userId);
  const recentActivity = await getQuizActivity(userId);
  const leaderboard = await getLeaderboard();
  const subscription = await getCurrentSubscription(userId);
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>My Quizzes</CardTitle>
                <CardDescription>
                  {quizzes.length === 0
                    ? "Create your first quiz to get started"
                    : `You have created ${quizzes.length} quiz${quizzes.length === 1 ? "" : "zes"}`}
                </CardDescription>
              </div>
              {quizzes.length > 0 && (
                <Button size="sm" variant="outline" asChild>
                  <a href="/dashboard/quizzes">View All</a>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {quizzes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <p className="text-muted-foreground text-center">
                  You haven't created any quizzes yet. Get started by creating your first quiz!
                </p>
                <Button asChild>
                  <a href="/dashboard/quizzes/create">Create Quiz</a>
                </Button>
              </div>
            ) : (
              <QuizGrid quizzes={quizzes.slice(0, 6)} />
            )}
          </CardContent>
        </Card>
        
        <RecentActivity activity={recentActivity} />
      </div>
      
      <div className="flex flex-col gap-6">
        <SubscriptionStatus subscription={subscription} />
        <LeaderboardCard leaderboard={leaderboard} />
      </div>
    </div>
  );
}