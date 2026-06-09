import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, Clock } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students, courses } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

type Status = "present" | "absent" | "late";

export const Route = createFileRoute("/app/attendance")({
  head: () => ({ meta: [{ title: "Attendance — EduCore Pro" }] }),
  component: AttendancePage,
});

function AttendancePage() {
  const { user } = useAuth();
  const [course, setCourse] = useState(courses[0].code);
  const [state, setState] = useState<Record<string, Status>>(() =>
    Object.fromEntries(students.map((s) => [s.id, "present" as Status])),
  );

  if (user?.role === "student") {
    return (
      <div>
        <PageHeader title="My attendance" description="Course-by-course attendance summary." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.slice(0, 4).map((c, i) => {
            const rate = [94, 88, 97, 81][i] ?? 90;
            return (
              <Card key={c.code} className="shadow-elegant">
                <CardContent className="p-5">
                  <Badge variant="secondary" className="font-mono text-[10px]">{c.code}</Badge>
                  <h3 className="mt-2 font-semibold">{c.title}</h3>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-3xl font-semibold">{rate}%</span>
                    <Badge variant={rate >= 85 ? "secondary" : "destructive"}>{rate >= 85 ? "On track" : "At risk"}</Badge>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">42 of 45 sessions attended</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const setStatus = (id: string, s: Status) => setState((p) => ({ ...p, [id]: s }));

  return (
    <div>
      <PageHeader
        title="Mark attendance"
        description="Take attendance for today's session."
        actions={<Button className="shadow-glow" style={{ background: "var(--gradient-primary)" }} onClick={() => toast.success("Attendance saved")}>Save</Button>}
      />
      <Card className="shadow-elegant">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Session — Today</CardTitle>
            <CardDescription>Select a course and mark each student</CardDescription>
          </div>
          <Select value={course} onValueChange={setCourse}>
            <SelectTrigger className="w-[260px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {courses.map((c) => <SelectItem key={c.code} value={c.code}>{c.code} — {c.title}</SelectItem>)}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border/60">
            {students.map((s) => {
              const st = state[s.id];
              return (
                <li key={s.id} className="flex items-center gap-3 py-3">
                  <Avatar className="h-9 w-9">
                    <AvatarFallback className="text-[10px]" style={{ background: "var(--gradient-primary)", color: "white" }}>
                      {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium truncate">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.id} · {s.department}</div>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant={st === "present" ? "default" : "outline"} onClick={() => setStatus(s.id, "present")}><Check className="h-4 w-4" /></Button>
                    <Button size="sm" variant={st === "late" ? "default" : "outline"} onClick={() => setStatus(s.id, "late")}><Clock className="h-4 w-4" /></Button>
                    <Button size="sm" variant={st === "absent" ? "destructive" : "outline"} onClick={() => setStatus(s.id, "absent")}><X className="h-4 w-4" /></Button>
                  </div>
                </li>
              );
            })}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}