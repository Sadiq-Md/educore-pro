import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search, Download, Plus } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/app/students")({
  head: () => ({ meta: [{ title: "Students — EduCore Pro" }] }),
  component: StudentsPage,
});

function StudentsPage() {
  const [q, setQ] = useState("");
  const [dept, setDept] = useState("all");
  const departments = useMemo(() => Array.from(new Set(students.map((s) => s.department))), []);
  const filtered = students.filter(
    (s) =>
      (dept === "all" || s.department === dept) &&
      (s.name.toLowerCase().includes(q.toLowerCase()) || s.id.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div>
      <PageHeader
        title="Students"
        description="Search, filter and manage student records."
        actions={
          <>
            <Button variant="outline" size="sm" onClick={() => toast.success("Exported to CSV")}><Download className="mr-2 h-4 w-4" />Export</Button>
            <Button size="sm" className="shadow-glow" style={{ background: "var(--gradient-primary)" }} onClick={() => toast("New student form opened")}><Plus className="mr-2 h-4 w-4" />Add student</Button>
          </>
        }
      />
      <Card className="shadow-elegant">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[220px]">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search by name or ID…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select value={dept} onValueChange={setDept}>
              <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All departments</SelectItem>
                {departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b">
                  <th className="py-3 pr-4">Student</th>
                  <th className="py-3 pr-4">ID</th>
                  <th className="py-3 pr-4">Department</th>
                  <th className="py-3 pr-4">Year</th>
                  <th className="py-3 pr-4">GPA</th>
                  <th className="py-3 pr-4">Attendance</th>
                  <th className="py-3 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((s) => (
                  <tr key={s.id} className="border-b border-border/40 last:border-0 hover:bg-accent/30">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-[10px]" style={{ background: "var(--gradient-primary)", color: "white" }}>
                            {s.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{s.name}</div>
                          <div className="text-xs text-muted-foreground">{s.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{s.id}</td>
                    <td className="py-3 pr-4">{s.department}</td>
                    <td className="py-3 pr-4">{s.year}</td>
                    <td className="py-3 pr-4 font-medium">{s.gpa.toFixed(2)}</td>
                    <td className="py-3 pr-4">{s.attendance}%</td>
                    <td className="py-3 pr-4">
                      <Badge variant={s.status === "Active" ? "secondary" : "destructive"}>{s.status}</Badge>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="py-8 text-center text-sm text-muted-foreground">No students match your filters.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}