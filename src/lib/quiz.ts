import { prisma } from '@/lib/prisma';

export async function getUserQuizzes(userId: string) {
  const quizzes = await prisma.quiz.findMany({
    where: {
      creatorId: userId,
    },
    select: {
      id: true,
      title: true,
      description: true,
      published: true,
      coverImage: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          questions: true,
          attempts: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'desc',
    },
  });

  return quizzes.map(quiz => ({
    ...quiz,
    questionCount: quiz._count.questions,
    attemptCount: quiz._count.attempts,
    _count: undefined,
  }));
}