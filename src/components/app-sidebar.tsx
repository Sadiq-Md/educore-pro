import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  ClipboardCheck,
  FileText,
  Calendar,
  FolderOpen,
  BarChart3,
  Settings,
  Sparkles,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth, type Role } from "@/lib/auth";

type NavItem = { title: string; url: string; icon: typeof LayoutDashboard };

const navByRole: Record<Role, { label: string; items: NavItem[] }[]> = {
  admin: [
    {
      label: "Overview",
      items: [
        { title: "Dashboard", url: "/app", icon: LayoutDashboard },
        { title: "Analytics", url: "/app/analytics", icon: BarChart3 },
      ],
    },
    {
      label: "Management",
      items: [
        { title: "Students", url: "/app/students", icon: GraduationCap },
        { title: "Staff", url: "/app/staff", icon: Users },
        { title: "Courses", url: "/app/courses", icon: BookOpen },
      ],
    },
    {
      label: "System",
      items: [{ title: "Settings", url: "/app/settings", icon: Settings }],
    },
  ],
  staff: [
    {
      label: "Teaching",
      items: [
        { title: "Dashboard", url: "/app", icon: LayoutDashboard },
        { title: "My Classes", url: "/app/courses", icon: BookOpen },
        { title: "Attendance", url: "/app/attendance", icon: ClipboardCheck },
        { title: "Marks Entry", url: "/app/marks", icon: FileText },
        { title: "Materials", url: "/app/materials", icon: FolderOpen },
      ],
    },
    {
      label: "System",
      items: [{ title: "Settings", url: "/app/settings", icon: Settings }],
    },
  ],
  student: [
    {
      label: "Academics",
      items: [
        { title: "Dashboard", url: "/app", icon: LayoutDashboard },
        { title: "My Marks", url: "/app/marks", icon: FileText },
        { title: "Attendance", url: "/app/attendance", icon: ClipboardCheck },
        { title: "Timetable", url: "/app/timetable", icon: Calendar },
        { title: "Materials", url: "/app/materials", icon: FolderOpen },
      ],
    },
    {
      label: "System",
      items: [{ title: "Settings", url: "/app/settings", icon: Settings }],
    },
  ],
};

export function AppSidebar() {
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  if (!user) return null;

  const groups = navByRole[user.role];

  return (
    <Sidebar collapsible="icon" className="border-r">
      <SidebarHeader className="border-b">
        <Link to="/app" className="flex items-center gap-2 px-2 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-lg shadow-glow" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">EduCore Pro</div>
              <div className="text-[10px] uppercase text-muted-foreground tracking-wider">Student Suite</div>
            </div>
          )}
        </Link>
      </SidebarHeader>
      <SidebarContent>
        {groups.map((g) => (
          <SidebarGroup key={g.label}>
            <SidebarGroupLabel>{g.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {g.items.map((item) => {
                  const active = item.url === "/app" ? pathname === "/app" : pathname.startsWith(item.url);
                  return (
                    <SidebarMenuItem key={item.url}>
                      <SidebarMenuButton asChild isActive={active} tooltip={item.title}>
                        <Link to={item.url}>
                          <item.icon className="h-4 w-4" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter className="border-t">
        {!collapsed && (
          <div className="rounded-lg p-3 text-xs text-muted-foreground glass">
            <div className="font-medium text-foreground">Need help?</div>
            <p className="mt-1">Visit the support center for guides & API docs.</p>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}