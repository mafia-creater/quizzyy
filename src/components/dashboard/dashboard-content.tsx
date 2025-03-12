// app/components/dashboard/dashboard-content.tsx
// Keep this as a server component

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QuizGrid } from "@/components/dashboard/quiz-grid";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { LeaderboardCard } from "@/components/dashboard/leaderboard-card";
import { SubscriptionStatus } from "@/components/dashboard/subscription-status";
import { getUserQuizzes } from "@/lib/quiz";
import { getQuizActivity } from "@/lib/activity";
import { getLeaderboard } from "@/lib/leaderboard";
import { getCurrentSubscription } from "@/lib/subscription";
import { ViewAllButton } from "./view-all-button";// Create this as a client component
import { CreateQuizButtonInline } from "./create-quiz-button";// Create this as a client component

export default async function DashboardContent({ userId }: { userId: string }) {
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
              {quizzes.length > 0 && <ViewAllButton href="/dashboard/quizzes" />}
            </div>
          </CardHeader>
          <CardContent>
            {quizzes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-4">
                <p className="text-muted-foreground text-center">
                  You haven't created any quizzes yet. Get started by creating your first quiz!
                </p>
                <CreateQuizButtonInline />
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

// Create the ViewAllButton and CreateQuizButtonInline as separate client components