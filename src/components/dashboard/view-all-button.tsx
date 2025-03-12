'use client';

import { Button } from "@/components/ui/button";

export function ViewAllButton({ href }: { href: string }) {
  return (
    <Button size="sm" variant="outline" asChild>
      <a href={href}>View All</a>
    </Button>
  );
}