
// Create a separate client component for the button
'use client';
// This needs to be in a separate file: app/dashboard/create-quiz-button.tsx

import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CreateQuizButton() {
  return (
    <Button size="sm" className="flex items-center gap-1" asChild>
      <a href="/dashboard/quizzes/create">
        <PlusCircle className="h-4 w-4" />
        <span>Create Quiz</span>
      </a>
    </Button>
  );
}