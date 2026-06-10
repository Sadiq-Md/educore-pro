import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Check, X, Clock, Trash2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students, courses } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { useAttendance, attendanceRateFor, STUDENT_DEMO_ID, type AttendanceStatus } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/attendance")({
  head: () => ({ meta: [{ title: "Attendance — EduCore Pro" }] }),
  component: AttendancePage,
});

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function AttendancePage() {
  const { user } = useAuth();
  const { records, upsertMany, remove } = useAttendance();
  const [course, setCourse] = useState(courses[0].code);
  const [date, setDate] = useState(todayISO());
  const [draft, setDraft] = useState<Record<string, AttendanceStatus>>({});

  const existing = useMemo(() => {
    const map: Record<string, AttendanceStatus> = {};
    records.filter((r) => r.course === course && r.date === date).forEach((r) => (map[r.studentId] = r.status));
    return map;
  }, [records, course, date]);

  const current: Record<string, AttendanceStatus> = { ...Object.fromEntries(students.map((s) => [s.id, "present" as AttendanceStatus])), ...existing, ...draft };

  if (user?.role === "student") {
    const sid = STUDENT_DEMO_ID;
    return (
      <div>
        <PageHeader title="My attendance" description="Your live attendance from every marked session." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => {
            const rate = attendanceRateFor(records, sid, c.code);
            const mine = records.filter((r) => r.course === c.code && r.studentId === sid);
            const ok = mine.filter((r) => r.status !== "absent").length;
            return (
              <Card key={c.code} className="shadow-elegant">
                <CardContent className="p-5">
                  <Badge variant="secondary" className="font-mono text-[10px]">{c.code}</Badge>
                  <h3 className="mt-2 font-semibold">{c.title}</h3>
                  <div className="mt-4 flex items-end justify-between">
                    <span className="text-3xl font-semibold">{rate ?? "—"}{rate !== null ? "%" : ""}</span>
                    {rate !== null && <Badge variant={rate >= 85 ? "secondary" : "destructive"}>{rate >= 85 ? "On track" : "At risk"}</Badge>}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">{ok} of {mine.length} sessions attended</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    );
  }

  const setStatus = (id: string, s: AttendanceStatus) => setDraft((p) => ({ ...p, [id]: s }));

  const save = () => {
    upsertMany(students.map((s) => ({ course, date, studentId: s.id, status: current[s.id] })));
    setDraft({});
    toast.success(`Attendance saved for ${course} · ${date}`);
  };

  const clearSession = () => {
    records.filter((r) => r.course === course && r.date === date).forEach((r) => remove(r.id));
    setDraft({});
    toast.success("Session cleared");
  };

  const sessionCount = records.filter((r) => r.course === course && r.date === date).length;

  return (
    <div>
      <PageHeader
        title="Mark attendance"
        description="Take or edit attendance. Records persist and update dashboards live."
        actions={
          <div className="flex gap-2">
            {sessionCount > 0 && (
              <Button variant="outline" onClick={clearSession}><Trash2 className="mr-2 h-4 w-4" />Clear</Button>
            )}
            <Button className="shadow-glow" style={{ background: "var(--gradient-primary)" }} onClick={save}>Save</Button>
          </div>
        }
      />
      <Card className="shadow-elegant">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Session — {date}</CardTitle>
            <CardDescription>{sessionCount > 0 ? `${sessionCount} students already recorded` : "No records yet — defaults to Present"}</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-[170px]" />
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger className="w-[260px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {courses.map((c) => <SelectItem key={c.code} value={c.code}>{c.code} — {c.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <ul className="divide-y divide-border/60">
            {students.map((s) => {
              const st = current[s.id];
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
