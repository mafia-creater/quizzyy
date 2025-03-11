import { prisma } from '@/lib/prisma';

export async function getCurrentSubscription(userId: string) {
  const subscription = await prisma.subscription.findFirst({
    where: {
      userId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  // Default free plan features
  const features = {
    unlimited_quizzes: false,
    custom_branding: false,
    analytics: false,
    export_results: false,
    team_collaboration: false,
  };

  // If no subscription found, return free plan
  if (!subscription) {
    return {
      status: "inactive",
      plan: "free",
      features,
    };
  }

  // Set features based on plan
  if (subscription.plan === "pro") {
    features.unlimited_quizzes = true;
    features.custom_branding = true;
    features.analytics = true;
    features.export_results = true;
  } else if (subscription.plan === "premium") {
    features.unlimited_quizzes = true;
    features.custom_branding = true;
    features.analytics = true;
    features.export_results = true;
    features.team_collaboration = true;
  }

  return {
    status: subscription.status,
    plan: subscription.plan,
    renewalDate: subscription.currentPeriodEnd,
    features,
  };
}
