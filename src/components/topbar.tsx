import { Bell, Moon, Sun, Search, LogOut, User as UserIcon } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { notifications } from "@/lib/mock-data";
import { toast } from "sonner";

export function Topbar() {
  const { theme, toggle } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  if (!user) return null;

  const initials = user.name.split(" ").map((n) => n[0]).slice(0, 2).join("");

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-2 border-b px-4 glass">
      <SidebarTrigger />
      <div className="relative ml-2 hidden md:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Search students, courses, staff…" className="h-9 w-[340px] pl-9" />
      </div>
      <div className="ml-auto flex items-center gap-1">
        <Button variant="ghost" size="icon" onClick={toggle} aria-label="Toggle theme">
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.map((n) => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2">
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-medium">{n.title}</span>
                  <span className="text-[10px] text-muted-foreground">{n.time}</span>
                </div>
                <span className="text-xs text-muted-foreground">{n.body}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="ml-1 h-9 gap-2 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className="text-xs" style={{ background: "var(--gradient-primary)", color: "white" }}>
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="hidden text-left md:block">
                <div className="text-xs font-medium leading-none">{user.name}</div>
                <div className="text-[10px] text-muted-foreground capitalize">{user.role}</div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span>{user.name}</span>
                <span className="text-xs font-normal text-muted-foreground">{user.email}</span>
                <Badge variant="secondary" className="mt-1 w-fit capitalize">{user.role}</Badge>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><UserIcon className="mr-2 h-4 w-4" />Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                logout();
                toast.success("Signed out");
                navigate({ to: "/login" });
              }}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}