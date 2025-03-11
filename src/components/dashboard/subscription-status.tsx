// components/dashboard/subscription-status.tsx
import { Check, X, CreditCard } from "lucide-react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface Subscription {
  status: "active" | "inactive" | "trialing" | "canceled" | "past_due";
  plan: "free" | "pro" | "premium";
  renewalDate?: Date;
  features: {
    unlimited_quizzes: boolean;
    custom_branding: boolean;
    analytics: boolean;
    export_results: boolean;
    team_collaboration: boolean;
  };
}

interface SubscriptionStatusProps {
  subscription: Subscription;
}

export function SubscriptionStatus({ subscription }: SubscriptionStatusProps) {
  const isPaid = subscription.plan !== "free";
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>Subscription</CardTitle>
            <CardDescription>
              Your current plan and features
            </CardDescription>
          </div>
          <Badge variant={isPaid ? "default" : "outline"}>
            {getPlanName(subscription.plan)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <FeatureItem 
            feature="Unlimited Quizzes" 
            included={subscription.features.unlimited_quizzes} 
          />
          <FeatureItem 
            feature="Custom Branding" 
            included={subscription.features.custom_branding} 
          />
          <FeatureItem 
            feature="Advanced Analytics" 
            included={subscription.features.analytics} 
          />
          <FeatureItem 
            feature="Export Results" 
            included={subscription.features.export_results} 
          />
          <FeatureItem 
            feature="Team Collaboration" 
            included={subscription.features.team_collaboration} 
          />
        </div>
        
        {subscription.renewalDate && subscription.status === "active" && (
          <div className="mt-4 text-xs text-muted-foreground flex items-center">
            <CreditCard className="h-3 w-3 mr-1" />
            <span>Renews on {formatDate(subscription.renewalDate)}</span>
          </div>
        )}
      </CardContent>
      
      {!isPaid && (
        <CardFooter>
          <Button className="w-full" asChild>
            <a href="/pricing">Upgrade Now</a>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function FeatureItem({ feature, included }: { feature: string; included: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{feature}</span>
      {included ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <X className="h-4 w-4 text-muted-foreground" />
      )}
    </div>
  );
}

function getPlanName(plan: string): string {
  switch (plan) {
    case "free":
      return "Free";
    case "pro":
      return "Pro";
    case "premium":
      return "Premium";
    default:
      return "Unknown";
  }
}