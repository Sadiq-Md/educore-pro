import { GraduationCap, BookOpen, Wallet, TrendingUp, Activity, ClipboardCheck } from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/stat-card";
import {
  stats,
  enrollmentTrend,
  attendanceTrend,
  departmentDistribution,
  feeCollection,
  students,
} from "@/lib/mock-data";
import { useAttendance, useMarks, overallAttendanceRate, avgScoreFor } from "@/lib/store";
import campusHero from "@/assets/campus-hero.jpg";

const palette = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)", "var(--primary)"];

export function AdminDashboard() {
  const { records: att } = useAttendance();
  const { records: marks } = useMarks();
  const liveAtt = overallAttendanceRate(att);
  const liveAvg = avgScoreFor(marks);
  return (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-2xl border border-border/60 shadow-elegant">
        <img src={campusHero} alt="Campus at golden hour" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/30" />
        <div className="relative flex flex-wrap items-end justify-between gap-3 p-6 sm:p-8">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Admin · Fall 2026</p>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Institutional Overview</h1>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">Live snapshot of enrollment, performance and operations across campus.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Export report</Button>
            <Button size="sm" className="shadow-glow" style={{ background: "var(--gradient-primary)" }}>+ New term</Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Students" value={stats.totalStudents.toLocaleString()} delta="+8.4% MoM" icon={GraduationCap} />
        <StatCard label="Live Attendance" value={liveAtt !== null ? `${liveAtt}%` : `${stats.attendanceRate}%`} delta={`${att.length} records`} icon={ClipboardCheck} />
        <StatCard label="Avg. Grade" value={liveAvg !== null ? `${liveAvg}%` : "—"} delta={`${marks.length} marks`} icon={BookOpen} />
        <StatCard label="Fees Collected" value={`$${(stats.feesCollected / 1e6).toFixed(2)}M`} delta="+12.1%" icon={Wallet} />
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-elegant">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Enrollment trend</CardTitle>
              <CardDescription>Students vs. quarterly targets</CardDescription>
            </div>
            <Badge variant="secondary"><TrendingUp className="mr-1 h-3 w-3" />Above target</Badge>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentTrend}>
                <defs>
                  <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--chart-1)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--chart-1)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Area type="monotone" dataKey="students" stroke="var(--chart-1)" strokeWidth={2} fill="url(#g1)" />
                <Line type="monotone" dataKey="target" stroke="var(--chart-2)" strokeDasharray="4 4" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-elegant">
          <CardHeader>
            <CardTitle>Department mix</CardTitle>
            <CardDescription>Student distribution by department</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={departmentDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={95} paddingAngle={3}>
                  {departmentDistribution.map((_, i) => (
                    <Cell key={i} fill={palette[i % palette.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-7">
        <Card className="lg:col-span-3 shadow-elegant">
          <CardHeader>
            <CardTitle>Attendance rate</CardTitle>
            <CardDescription>Institution-wide, weekly</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="week" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} domain={[80, 100]} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Line type="monotone" dataKey="rate" stroke="var(--primary)" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-4 shadow-elegant">
          <CardHeader>
            <CardTitle>Fee collection</CardTitle>
            <CardDescription>Last 6 months (in $K)</CardDescription>
          </CardHeader>
          <CardContent className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={feeCollection}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis dataKey="month" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="collected" stackId="a" fill="var(--chart-1)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="pending" stackId="a" fill="var(--chart-5)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-elegant">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent enrollments</CardTitle>
            <CardDescription>Newest active students</CardDescription>
          </div>
          <Button variant="ghost" size="sm"><Activity className="mr-2 h-4 w-4" />View all</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b">
                  <th className="py-2 pr-4">ID</th>
                  <th className="py-2 pr-4">Name</th>
                  <th className="py-2 pr-4">Department</th>
                  <th className="py-2 pr-4">Year</th>
                  <th className="py-2 pr-4">GPA</th>
                  <th className="py-2 pr-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {students.slice(0, 6).map((s) => (
                  <tr key={s.id} className="border-b border-border/50 last:border-0">
                    <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{s.id}</td>
                    <td className="py-3 pr-4 font-medium">{s.name}</td>
                    <td className="py-3 pr-4">{s.department}</td>
                    <td className="py-3 pr-4">{s.year}</td>
                    <td className="py-3 pr-4">{s.gpa.toFixed(2)}</td>
                    <td className="py-3 pr-4">
                      <Badge variant={s.status === "Active" ? "secondary" : "destructive"}>{s.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}