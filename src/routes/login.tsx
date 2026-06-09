import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, GraduationCap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — EduCore Pro" }] }),
  component: LoginPage,
});

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate({ to: "/app", replace: true });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const u = await login(email, password);
      toast.success(`Welcome back, ${u.name.split(" ")[0]}`);
      navigate({ to: "/app", replace: true });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const quickFill = (cred: (typeof DEMO_CREDENTIALS)[number]) => {
    setEmail(cred.email);
    setPassword(cred.password);
  };

  return (
    <div className="relative grid min-h-screen lg:grid-cols-2">
      <div className="absolute inset-0 mesh-bg pointer-events-none" />
      {/* Left: Brand panel */}
      <div className="relative hidden flex-col justify-between p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl shadow-glow" style={{ background: "var(--gradient-primary)" }}>
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <div className="text-base font-semibold tracking-tight">EduCore Pro</div>
            <div className="text-xs text-muted-foreground">Student Management Suite</div>
          </div>
        </div>
        <div className="space-y-6">
          <Badge variant="secondary" className="rounded-full">v2.4 · Enterprise</Badge>
          <h1 className="text-5xl font-semibold leading-tight tracking-tight">
            The modern <span className="gradient-text">academic OS</span> for ambitious institutions.
          </h1>
          <p className="max-w-md text-muted-foreground">
            Manage students, staff, attendance, performance, and finance — in one beautifully designed,
            secure platform trusted by universities worldwide.
          </p>
          <div className="grid max-w-md grid-cols-3 gap-3 pt-4">
            {[
              { icon: GraduationCap, k: "4,800+", v: "Students" },
              { icon: Users, k: "300+", v: "Staff" },
              { icon: ShieldCheck, k: "SOC 2", v: "Compliant" },
            ].map((s) => (
              <Card key={s.v} className="glass border-border/60">
                <CardContent className="p-3">
                  <s.icon className="h-4 w-4 text-primary" />
                  <div className="mt-2 text-lg font-semibold leading-none">{s.k}</div>
                  <div className="text-[11px] text-muted-foreground">{s.v}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <p className="text-xs text-muted-foreground">© 2026 EduCore Inc. — Built for FAANG-grade reliability.</p>
      </div>

      {/* Right: Form */}
      <div className="relative flex items-center justify-center p-6 sm:p-12">
        <Card className="w-full max-w-md border-border/60 shadow-elegant glass">
          <CardContent className="p-8">
            <div className="mb-6 flex items-center gap-3 lg:hidden">
              <div className="grid h-9 w-9 place-items-center rounded-lg shadow-glow" style={{ background: "var(--gradient-primary)" }}>
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <div className="text-sm font-semibold">EduCore Pro</div>
            </div>
            <h2 className="text-2xl font-semibold tracking-tight">Sign in to your workspace</h2>
            <p className="mt-1 text-sm text-muted-foreground">Use a demo account below or your own credentials.</p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@university.edu" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required />
              </div>
              <Button type="submit" className="w-full shadow-glow" disabled={submitting} style={{ background: "var(--gradient-primary)" }}>
                {submitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" />
              Demo accounts
              <div className="h-px flex-1 bg-border" />
            </div>
            <div className="grid gap-2">
              {DEMO_CREDENTIALS.map((c) => (
                <button
                  key={c.email}
                  type="button"
                  onClick={() => quickFill(c)}
                  className="flex items-center justify-between rounded-lg border border-border/60 px-3 py-2 text-left text-xs transition hover:border-primary/60 hover:bg-accent/40"
                >
                  <div>
                    <div className="font-medium text-foreground">{c.role}</div>
                    <div className="text-muted-foreground">{c.email}</div>
                  </div>
                  <Badge variant="outline">Use</Badge>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}