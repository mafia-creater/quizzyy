// components/dashboard/recent-activity.tsx
import { User, Clock } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { formatDate, getInitials } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "attempt" | "completion" | "feedback";
  quizId: string;
  quizTitle: string;
  score?: number;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
  createdAt: Date;
}

interface RecentActivityProps {
  activity: ActivityItem[];
}

export function RecentActivity({ activity }: RecentActivityProps) {
  if (activity.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            No recent activity for your quizzes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground text-sm mb-4">
              When users interact with your quizzes, you'll see their activity here.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>
          Recent interactions with your quizzes
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activity.map((item) => (
            <div key={item.id} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0">
              <Avatar className="h-9 w-9">
                {item.user.image ? (
                  <img 
                    src={item.user.image} 
                    alt={item.user.name || "User"} 
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <AvatarFallback>{getInitials(item.user.name || item.user.email)}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <p className="text-sm font-medium">
                      {item.user.name || item.user.email}
                    </p>
                    <ActivityBadge type={item.type} score={item.score} />
                  </div>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(item.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <Link href={`/dashboard/quizzes/${item.quizId}`} className="hover:underline">
                    {item.quizTitle}
                  </Link>
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

function ActivityBadge({ type, score }: { type: string; score?: number }) {
  if (type === "attempt") {
    return (
      <Badge variant="outline" className="ml-2 text-xs">
        Started Quiz
      </Badge>
    );
  }
  
  if (type === "completion") {
    const variant = score && score >= 70 ? "default" : score && score >= 40 ? "secondary" : "destructive";
    
    return (
      <Badge variant={variant} className="ml-2 text-xs">
        {score}% Score
      </Badge>
    );
  }
  
  if (type === "feedback") {
    return (
      <Badge variant="outline" className="ml-2 text-xs">
        Left Feedback
      </Badge>
    );
  }
  
  return null;
}