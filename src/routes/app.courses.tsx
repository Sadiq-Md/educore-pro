import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses } from "@/lib/mock-data";

export const Route = createFileRoute("/app/courses")({
  head: () => ({ meta: [{ title: "Courses — EduCore Pro" }] }),
  component: () => (
    <div>
      <PageHeader
        title="Courses"
        description="All active course sections across the institution."
        actions={<Button size="sm" className="shadow-glow" style={{ background: "var(--gradient-primary)" }}><Plus className="mr-2 h-4 w-4" />New course</Button>}
      />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <Card key={c.code} className="overflow-hidden shadow-elegant transition hover:shadow-glow">
            <div className="h-1.5" style={{ background: "var(--gradient-primary)" }} />
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <Badge variant="secondary" className="font-mono text-[10px]">{c.code}</Badge>
                <Badge variant="outline">{c.credits} cr</Badge>
              </div>
              <h3 className="mt-3 text-base font-semibold">{c.title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">{c.instructor}</p>
              <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" />{c.students}</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" />{c.schedule}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ),
});