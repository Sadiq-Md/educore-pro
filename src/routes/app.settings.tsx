import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { useTheme } from "@/lib/theme";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({ meta: [{ title: "Settings — EduCore Pro" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const { theme, toggle } = useTheme();
  return (
    <div>
      <PageHeader title="Settings" description="Manage your profile, preferences and notifications." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="shadow-elegant">
          <CardHeader><CardTitle>Profile</CardTitle><CardDescription>Update your personal info</CardDescription></CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2"><Label>Name</Label><Input defaultValue={user?.name}/></div>
            <div className="space-y-2"><Label>Email</Label><Input defaultValue={user?.email}/></div>
            <div className="space-y-2"><Label>Department</Label><Input defaultValue={user?.department}/></div>
            <Button className="shadow-glow" style={{ background: "var(--gradient-primary)" }} onClick={() => toast.success("Profile saved")}>Save changes</Button>
          </CardContent>
        </Card>
        <Card className="shadow-elegant">
          <CardHeader><CardTitle>Preferences</CardTitle><CardDescription>Customize your experience</CardDescription></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between"><div><div className="text-sm font-medium">Dark mode</div><div className="text-xs text-muted-foreground">Use a darker UI theme</div></div><Switch checked={theme === "dark"} onCheckedChange={toggle}/></div>
            <div className="flex items-center justify-between"><div><div className="text-sm font-medium">Email notifications</div><div className="text-xs text-muted-foreground">Get updates by email</div></div><Switch defaultChecked/></div>
            <div className="flex items-center justify-between"><div><div className="text-sm font-medium">Real-time alerts</div><div className="text-xs text-muted-foreground">Push & in-app alerts</div></div><Switch defaultChecked/></div>
            <div className="flex items-center justify-between"><div><div className="text-sm font-medium">AI insights</div><div className="text-xs text-muted-foreground">Performance suggestions</div></div><Switch/></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}