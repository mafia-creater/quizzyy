// components/dashboard/quiz-grid.tsx
import Link from "next/link";
import { Clock, FilePenLine, Users } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";

interface Quiz {
  id: string;
  title: string;
  description: string;
  published: boolean;
  questionCount: number;
  attemptCount: number;
  coverImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface QuizGridProps {
  quizzes: Quiz[];
}

export function QuizGrid({ quizzes }: QuizGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {quizzes.map((quiz) => (
        <Link key={quiz.id} href={`/dashboard/quizzes/${quiz.id}`}>
          <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
            <div 
              className={cn(
                "h-32 bg-gradient-to-r",
                quiz.published 
                  ? "from-blue-400 to-blue-600" 
                  : "from-gray-300 to-gray-400"
              )}
            >
              {quiz.coverImage && (
                <img 
                  src={quiz.coverImage} 
                  alt={quiz.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg line-clamp-1">{quiz.title}</h3>
                <Badge variant={quiz.published ? "default" : "outline"}>
                  {quiz.published ? "Published" : "Draft"}
                </Badge>
              </div>
              <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                {quiz.description || "No description provided"}
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <FilePenLine className="h-3 w-3" />
                  <span>{quiz.questionCount} questions</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{quiz.attemptCount} attempts</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0 border-t text-xs text-muted-foreground">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                <span>Updated {formatDate(quiz.updatedAt)}</span>
              </div>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
}