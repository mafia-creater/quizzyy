// components/dashboard/leaderboard-card.tsx
import { Medal } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";

interface LeaderboardUser {
  id: string;
  name: string;
  email: string;
  image?: string;
  score: number;
  position: number;
}

interface LeaderboardCardProps {
  leaderboard: LeaderboardUser[];
}

export function LeaderboardCard({ leaderboard }: LeaderboardCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Performers</CardTitle>
        <CardDescription>
          Users with the highest scores
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leaderboard.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-4">
              No quiz attempts yet. Leaderboard will update as users complete quizzes.
            </p>
          ) : (
            leaderboard.map((user) => (
              <div key={user.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-7 text-center">
                    {user.position <= 3 ? (
                      <Medal className={`h-5 w-5 ${getMedalColor(user.position)}`} />
                    ) : (
                      <span className="text-sm font-medium text-muted-foreground">
                        {user.position}
                      </span>
                    )}
                  </div>
                  <Avatar className="h-8 w-8">
                    {user.image ? (
                      <img 
                        src={user.image} 
                        alt={user.name || "User"} 
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <AvatarFallback>{getInitials(user.name || user.email)}</AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium truncate max-w-[120px]">
                      {user.name || user.email}
                    </span>
                  </div>
                </div>
                <span className="font-medium text-sm">
                  {user.score} pts
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function getMedalColor(position: number): string {
  switch (position) {
    case 1:
      return "text-yellow-500";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-amber-600";
    default:
      return "text-muted-foreground";
  }
}