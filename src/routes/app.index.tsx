import { createFileRoute } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { AdminDashboard } from "@/components/dashboards/admin-dashboard";
import { StaffDashboard } from "@/components/dashboards/staff-dashboard";
import { StudentDashboard } from "@/components/dashboards/student-dashboard";

export const Route = createFileRoute("/app/")({
  head: () => ({ meta: [{ title: "Dashboard — EduCore Pro" }] }),
  component: DashboardRouter,
});

function DashboardRouter() {
  const { user } = useAuth();
  if (!user) return null;
  if (user.role === "admin") return <AdminDashboard />;
  if (user.role === "staff") return <StaffDashboard />;
  return <StudentDashboard />;
}