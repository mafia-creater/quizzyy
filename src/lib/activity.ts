import { prisma } from '@/lib/prisma';

export async function getQuizActivity(userId: string) {
  const quizIds = await prisma.quiz.findMany({
    where: {
      creatorId: userId,
    },
    select: {
      id: true,
    },
  });

  const quizIdArray = quizIds.map(q => q.id);

  const attempts = await prisma.quizAttempt.findMany({
    where: {
      quizId: {
        in: quizIdArray,
      },
    },
    select: {
      id: true,
      score: true,
      completed: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
      quiz: {
        select: {
          id: true,
          title: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 10,
  });

  return attempts.map(attempt => ({
    id: attempt.id,
    type: attempt.completed ? 'completion' : 'attempt',
    quizId: attempt.quiz.id,
    quizTitle: attempt.quiz.title,
    score: attempt.score,
    user: attempt.user,
    createdAt: attempt.createdAt,
  }));
}