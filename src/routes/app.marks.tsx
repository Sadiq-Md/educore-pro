import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Download, Trash2, Plus, Pencil } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { students, courses } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { useMarks, gradeFromScore, STUDENT_DEMO_ID, type MarkRecord } from "@/lib/store";
import { toast } from "sonner";

export const Route = createFileRoute("/app/marks")({
  head: () => ({ meta: [{ title: "Marks — EduCore Pro" }] }),
  component: MarksPage,
});

function MarksPage() {
  const { user } = useAuth();
  const { records, upsert, upsertMany, remove } = useMarks();
  const [course, setCourse] = useState(courses[0].code);
  const [assignment, setAssignment] = useState("Midterm");
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [editing, setEditing] = useState<MarkRecord | null>(null);
  const [editScore, setEditScore] = useState("");

  if (user?.role === "student") {
    const mine = records.filter((m) => m.studentId === STUDENT_DEMO_ID);
    return (
      <div>
        <PageHeader
          title="My marks"
          description="Live marksheet — updates whenever staff publish a grade."
          actions={<Button variant="outline" size="sm" onClick={() => toast.success("Marksheet PDF downloaded")}><Download className="mr-2 h-4 w-4" />Download marksheet</Button>}
        />
        <Card className="shadow-elegant">
          <CardContent className="p-0">
            {mine.length === 0 ? (
              <div className="p-10 text-center text-sm text-muted-foreground">No marks yet.</div>
            ) : (
              <table className="w-full text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr className="border-b"><th className="p-4">Course</th><th className="p-4">Assignment</th><th className="p-4">Score</th><th className="p-4 w-[30%]">Progress</th><th className="p-4">Grade</th></tr>
                </thead>
                <tbody>
                  {mine.map((m) => (
                    <tr key={m.id} className="border-b border-border/40 last:border-0">
                      <td className="p-4 font-medium">{m.course}</td>
                      <td className="p-4">{m.assignment}</td>
                      <td className="p-4 font-mono tabular-nums">{m.score}/{m.max}</td>
                      <td className="p-4"><Progress value={(m.score / m.max) * 100} /></td>
                      <td className="p-4"><Badge>{m.grade}</Badge></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  const existing = useMemo(() => {
    const map: Record<string, MarkRecord> = {};
    records.filter((r) => r.course === course && r.assignment === assignment).forEach((r) => (map[r.studentId] = r));
    return map;
  }, [records, course, assignment]);

  const publish = () => {
    const entries = students
      .map((s) => {
        const v = drafts[s.id];
        if (v === undefined || v === "") return null;
        const n = Math.max(0, Math.min(100, Number(v)));
        if (Number.isNaN(n)) return null;
        return { course, assignment, studentId: s.id, score: n, max: 100 };
      })
      .filter(Boolean) as Array<{ course: string; assignment: string; studentId: string; score: number; max: number }>;
    if (!entries.length) {
      toast.error("Enter at least one score");
      return;
    }
    upsertMany(entries);
    setDrafts({});
    toast.success(`Published ${entries.length} grade${entries.length === 1 ? "" : "s"}`);
  };

  const openEdit = (rec: MarkRecord) => {
    setEditing(rec);
    setEditScore(String(rec.score));
  };
  const saveEdit = () => {
    if (!editing) return;
    const n = Math.max(0, Math.min(editing.max, Number(editScore)));
    if (Number.isNaN(n)) return toast.error("Invalid score");
    upsert({ id: editing.id, course: editing.course, assignment: editing.assignment, studentId: editing.studentId, score: n, max: editing.max });
    setEditing(null);
    toast.success("Mark updated");
  };

  return (
    <div>
      <PageHeader
        title="Marks entry"
        description="Enter, edit, or delete grades. Students see updates instantly."
        actions={<Button className="shadow-glow" style={{ background: "var(--gradient-primary)" }} onClick={publish}><Plus className="mr-2 h-4 w-4" />Publish grades</Button>}
      />

      <Card className="mb-4 shadow-elegant">
        <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>New assessment</CardTitle>
            <CardDescription>Pick course and assignment, then enter scores below</CardDescription>
          </div>
          <div className="flex flex-wrap gap-2">
            <Select value={course} onValueChange={setCourse}>
              <SelectTrigger className="w-[240px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {courses.map((c) => <SelectItem key={c.code} value={c.code}>{c.code} — {c.title}</SelectItem>)}
              </SelectContent>
            </Select>
            <Input value={assignment} onChange={(e) => setAssignment(e.target.value)} placeholder="Assignment name" className="w-[200px]" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr className="border-b"><th className="p-4">Student</th><th className="p-4">ID</th><th className="p-4 w-[180px]">Score / 100</th><th className="p-4">Grade</th><th className="p-4">Status</th></tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const exist = existing[s.id];
                const v = drafts[s.id] ?? (exist ? String(exist.score) : "");
                const n = Number(v);
                const grade = !v ? "—" : gradeFromScore(n, 100);
                return (
                  <tr key={s.id} className="border-b border-border/40 last:border-0">
                    <td className="p-4 font-medium">{s.name}</td>
                    <td className="p-4 font-mono text-xs text-muted-foreground">{s.id}</td>
                    <td className="p-4">
                      <Input type="number" min={0} max={100} value={v} onChange={(e) => setDrafts((p) => ({ ...p, [s.id]: e.target.value }))} placeholder="—" />
                    </td>
                    <td className="p-4"><Badge variant={grade === "F" ? "destructive" : "secondary"}>{grade}</Badge></td>
                    <td className="p-4 text-xs text-muted-foreground">{exist ? "Published" : "Pending"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardContent>
      </Card>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>All published marks</CardTitle>
          <CardDescription>{records.length} record{records.length === 1 ? "" : "s"} — edit or delete inline</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          {records.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">No marks published yet.</div>
          ) : (
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b"><th className="p-4">Student</th><th className="p-4">Course</th><th className="p-4">Assignment</th><th className="p-4">Score</th><th className="p-4">Grade</th><th className="p-4 text-right">Actions</th></tr>
              </thead>
              <tbody>
                {records.slice().sort((a, b) => b.updatedAt - a.updatedAt).map((m) => {
                  const s = students.find((x) => x.id === m.studentId);
                  return (
                    <tr key={m.id} className="border-b border-border/40 last:border-0">
                      <td className="p-4 font-medium">{s?.name ?? m.studentId}</td>
                      <td className="p-4 text-xs">{m.course}</td>
                      <td className="p-4">{m.assignment}</td>
                      <td className="p-4 font-mono tabular-nums">{m.score}/{m.max}</td>
                      <td className="p-4"><Badge variant={m.grade === "F" ? "destructive" : "secondary"}>{m.grade}</Badge></td>
                      <td className="p-4 text-right">
                        <Button size="icon" variant="ghost" onClick={() => openEdit(m)}><Pencil className="h-4 w-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => { remove(m.id); toast.success("Mark deleted"); }}><Trash2 className="h-4 w-4" /></Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit mark</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">{students.find((s) => s.id === editing.studentId)?.name} · {editing.course} · {editing.assignment}</div>
              <Label>Score (out of {editing.max})</Label>
              <Input type="number" value={editScore} onChange={(e) => setEditScore(e.target.value)} min={0} max={editing.max} />
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={saveEdit}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
