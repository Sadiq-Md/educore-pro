import { createFileRoute } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { staffList } from "@/lib/mock-data";

export const Route = createFileRoute("/app/staff")({
  head: () => ({ meta: [{ title: "Staff — EduCore Pro" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Faculty & Staff"
        description="Manage instructors, assign courses, and review performance."
        actions={<Button size="sm" className="shadow-glow" style={{ background: "var(--gradient-primary)" }}><Plus className="mr-2 h-4 w-4" />Add staff</Button>}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {staffList.map((s) => (
          <Card key={s.id} className="shadow-elegant transition hover:shadow-glow">
            <CardContent className="p-5">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarFallback style={{ background: "var(--gradient-primary)", color: "white" }}>
                    {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0">
                  <div className="font-semibold truncate">{s.name}</div>
                  <div className="text-xs text-muted-foreground truncate">{s.email}</div>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs">
                <Badge variant="secondary">{s.department}</Badge>
                <span className="inline-flex items-center gap-1 font-medium"><Star className="h-3 w-3 fill-amber-400 text-amber-400" />{s.rating}</span>
              </div>
              <div className="mt-3 text-xs text-muted-foreground">{s.courses} active courses</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ),
});