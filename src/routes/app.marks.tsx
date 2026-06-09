import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Download } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { students, studentMarks } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/app/marks")({
  head: () => ({ meta: [{ title: "Marks — EduCore Pro" }] }),
  component: MarksPage,
});

function MarksPage() {
  const { user } = useAuth();
  const [marks, setMarks] = useState<Record<string, string>>({});

  if (user?.role === "student") {
    return (
      <div>
        <PageHeader
          title="My marks"
          description="All your graded assignments and exams."
          actions={<Button variant="outline" size="sm" onClick={() => toast.success("Marksheet PDF downloaded")}><Download className="mr-2 h-4 w-4"/>Download marksheet</Button>}
        />
        <Card className="shadow-elegant">
          <CardContent className="p-0">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b"><th className="p-4">Course</th><th className="p-4">Assignment</th><th className="p-4">Score</th><th className="p-4 w-[30%]">Progress</th><th className="p-4">Grade</th></tr>
              </thead>
              <tbody>
                {studentMarks.map((m) => (
                  <tr key={m.course + m.assignment} className="border-b border-border/40 last:border-0">
                    <td className="p-4 font-medium">{m.course}</td>
                    <td className="p-4">{m.assignment}</td>
                    <td className="p-4 font-mono tabular-nums">{m.score}/{m.max}</td>
                    <td className="p-4"><Progress value={(m.score/m.max)*100}/></td>
                    <td className="p-4"><Badge>{m.grade}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Marks entry"
        description="Enter midterm scores for CS-301 — Distributed Systems"
        actions={<Button className="shadow-glow" style={{ background: "var(--gradient-primary)" }} onClick={() => toast.success("Grades published")}>Publish grades</Button>}
      />
      <Card className="shadow-elegant">
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b"><th className="p-4">Student</th><th className="p-4">ID</th><th className="p-4 w-[180px]">Score / 100</th><th className="p-4">Grade</th></tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const v = marks[s.id] ?? "";
                const n = Number(v);
                const grade = !v ? "—" : n >= 90 ? "A+" : n >= 80 ? "A" : n >= 70 ? "B" : n >= 60 ? "C" : "F";
                return (
                  <tr key={s.id} className="border-b border-border/40 last:border-0">
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4 font-mono text-xs text-muted-foreground">{s.id}</td>
                    <td className="p-4">
                      <Input type="number" min={0} max={100} value={v} onChange={(e) => setMarks((p) => ({ ...p, [s.id]: e.target.value }))} placeholder="—"/>
                    </td>
                    <td className="p-4"><Badge variant={grade === "F" ? "destructive" : "secondary"}>{grade}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}