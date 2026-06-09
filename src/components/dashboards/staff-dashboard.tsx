import { BookOpen, Users, ClipboardCheck, Star } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/stat-card";
import { courses, studentPerformance } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { Link } from "@tanstack/react-router";

export function StaffDashboard() {
  const { user } = useAuth();
  const myCourses = courses.slice(0, 3);
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Staff portal</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Good to see you, {user?.name.split(" ").slice(-1)[0]}</h1>
        <p className="mt-1 text-sm text-muted-foreground">Your classes, attendance, and grading at a glance.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Active Classes" value="3" delta="Fall 2026" icon={BookOpen} />
        <StatCard label="Total Students" value="194" delta="+12 this week" icon={Users} />
        <StatCard label="Avg. Attendance" value="93%" delta="+2.1%" icon={ClipboardCheck} />
        <StatCard label="Avg. Rating" value="4.8" delta="↑ 0.2" icon={Star} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elegant">
          <CardHeader>
            <CardTitle>Class performance</CardTitle>
            <CardDescription>Your students vs. department average</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studentPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="subject" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Bar dataKey="score" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="average" fill="var(--chart-3)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start" variant="outline"><Link to="/app/attendance">Mark attendance</Link></Button>
            <Button asChild className="w-full justify-start" variant="outline"><Link to="/app/marks">Enter marks</Link></Button>
            <Button asChild className="w-full justify-start" variant="outline"><Link to="/app/materials">Upload material</Link></Button>
            <Button className="w-full shadow-glow" style={{ background: "var(--gradient-primary)" }}>+ New announcement</Button>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader>
          <CardTitle>My classes</CardTitle>
          <CardDescription>Sections you teach this term</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {myCourses.map((c) => (
            <div key={c.code} className="rounded-xl border border-border/60 p-4 transition hover:shadow-elegant">
              <div className="flex items-start justify-between">
                <div>
                  <Badge variant="secondary" className="font-mono text-[10px]">{c.code}</Badge>
                  <h3 className="mt-2 font-semibold">{c.title}</h3>
                  <p className="text-xs text-muted-foreground">{c.schedule}</p>
                </div>
                <Badge variant="outline">{c.credits} cr</Badge>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">Attendance</span><span>92%</span></div>
                <Progress value={92} />
                <div className="flex justify-between text-xs pt-2"><span className="text-muted-foreground">Avg. score</span><span>84/100</span></div>
                <Progress value={84} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.students} students</span>
                <Link to="/app/courses" className="font-medium text-primary hover:underline">Open →</Link>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}