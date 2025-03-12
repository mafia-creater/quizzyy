'use client';

import { Button } from "@/components/ui/button";

export function CreateQuizButtonInline() {
  return (
    <Button asChild>
      <a href="/dashboard/quizzes/create">Create Quiz</a>
    </Button>
  );
}