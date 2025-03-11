import { prisma } from '@/lib/prisma';

export async function getLeaderboard() {
  const topUsers = await prisma.quizAttempt.groupBy({
    by: ['userId'],
    _sum: {
      score: true,
    },
    _count: {
      id: true,
    },
    orderBy: {
      _sum: {
        score: 'desc',
      },
    },
    take: 5,
  });

  const userDetails = await Promise.all(
    topUsers.map(async (entry, index) => {
      const user = await prisma.user.findUnique({
        where: {
          id: entry.userId,
        },
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      });

      return {
        ...user,
        score: entry._sum.score || 0,
        position: index + 1,
      };
    })
  );

  return userDetails;
}