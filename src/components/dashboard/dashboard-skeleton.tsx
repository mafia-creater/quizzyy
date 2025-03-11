// components/dashboard/dashboard-skeleton.tsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function DashboardSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2 flex flex-col gap-6">
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array(6).fill(null).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="h-32 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-2/3" />
                  <div className="flex gap-2">
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </CardHeader>
          <CardContent>
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex gap-3 py-3">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                  <Skeleton className="h-3 w-48" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col gap-6">
        <Card>
          <CardHeader className="pb-2">
            <div className="flex justify-between">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>
            <Skeleton className="h-4 w-40 mt-1" />
          </CardHeader>
          <CardContent>
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </div>
            ))}
            <Skeleton className="h-3 w-48 mt-4" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-4 w-48 mt-1" />
          </CardHeader>
          <CardContent>
            {Array(5).fill(null).map((_, i) => (
              <div key={i} className="flex justify-between items-center py-1.5">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}