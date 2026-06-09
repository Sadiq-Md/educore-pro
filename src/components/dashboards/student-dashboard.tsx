import { GraduationCap, ClipboardCheck, Trophy, Bell } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { StatCard } from "@/components/stat-card";
import { attendanceTrend, notifications, studentMarks, studentPerformance } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";

export function StudentDashboard() {
  const { user } = useAuth();
  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Student portal</p>
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Welcome back, {user?.name.split(" ")[0]} 👋</h1>
        <p className="mt-1 text-sm text-muted-foreground">Here's how your semester is going.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Current GPA" value="3.86" delta="+0.12" icon={GraduationCap} />
        <StatCard label="Attendance" value="94%" delta="+1.2%" icon={ClipboardCheck} />
        <StatCard label="Class Rank" value="#12 / 248" delta="↑ 4" icon={Trophy} />
        <StatCard label="Pending Tasks" value="3" delta="2 due this week" trend="down" icon={Bell} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elegant">
          <CardHeader>
            <CardTitle>Attendance trend</CardTitle>
            <CardDescription>Last 8 weeks</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceTrend}>
                <defs>
                  <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--primary)" stopOpacity={0.55} />
                    <stop offset="100%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[70, 100]} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="rate" stroke="var(--primary)" strokeWidth={2} fill="url(#sg)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Skills overview</CardTitle>
            <CardDescription>You vs. average</CardDescription>
          </CardHeader>
          <CardContent className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={studentPerformance}>
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fontSize: 10 }} />
                <Radar name="You" dataKey="score" stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.4} />
                <Radar name="Avg" dataKey="average" stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.2} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2 shadow-elegant">
          <CardHeader>
            <CardTitle>Recent marks</CardTitle>
            <CardDescription>Latest assignments & exams</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {studentMarks.map((m) => (
              <div key={m.course + m.assignment} className="rounded-lg border border-border/60 p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{m.assignment}</div>
                    <div className="text-xs text-muted-foreground">{m.course}</div>
                  </div>
                  <Badge>{m.grade}</Badge>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <Progress value={(m.score / m.max) * 100} className="flex-1" />
                  <span className="text-xs font-mono tabular-nums text-muted-foreground">{m.score}/{m.max}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Stay up to date</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex gap-3 rounded-lg border border-border/60 p-3">
                <div className={`mt-1 h-2 w-2 rounded-full ${n.type === "success" ? "bg-emerald-500" : n.type === "warning" ? "bg-amber-500" : "bg-primary"}`} />
                <div className="min-w-0 flex-1">
                  <div className="flex justify-between gap-2">
                    <span className="text-sm font-medium truncate">{n.title}</span>
                    <span className="text-[10px] text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{n.body}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}