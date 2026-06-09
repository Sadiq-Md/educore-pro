import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { timetable } from "@/lib/mock-data";

export const Route = createFileRoute("/app/timetable")({
  head: () => ({ meta: [{ title: "Timetable — EduCore Pro" }] }),
  component: () => (
    <div>
      <PageHeader title="Timetable" description="Your weekly class schedule." />
      <div className="grid gap-3 md:grid-cols-5">
        {timetable.map((d) => (
          <Card key={d.day} className="shadow-elegant">
            <CardContent className="p-4">
              <div className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{d.day}</div>
              <div className="space-y-2">
                {d.slots.map((s, i) => (
                  <div key={i} className="rounded-lg border border-border/60 p-3 transition hover:border-primary/60">
                    <div className="text-xs font-mono text-primary">{s.time}</div>
                    <div className="mt-1 text-sm font-medium">{s.course}</div>
                    <div className="text-xs text-muted-foreground">{s.room}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  ),
});