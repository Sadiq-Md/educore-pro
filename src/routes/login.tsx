import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sparkles, ShieldCheck, GraduationCap, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";
import { toast } from "sonner";
import loginBg from "@/assets/login-bg.jpg";
import roleAdmin from "@/assets/role-admin.jpg";
import roleStaff from "@/assets/role-staff.jpg";
import roleStudent from "@/assets/role-student.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — EduCore Pro" }] }),
  component: LoginPage,
});

const ROLE_CARDS = [
  { role: "Admin", image: roleAdmin, tagline: "Run the institution", email: "admin@educore.io", password: "admin123", accent: "from-indigo-500/40 to-violet-600/40" },
  { role: "Staff", image: roleStaff, tagline: "Teach & inspire", email: "staff@educore.io", password: "staff123", accent: "from-sky-500/40 to-cyan-500/40" },
  { role: "Student", image: roleStudent, tagline: "Learn & grow", email: "student@educore.io", password: "student123", accent: "from-fuchsia-500/40 to-rose-500/40" },
] as const;

function LoginPage() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

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

  const pickRole = (c: (typeof ROLE_CARDS)[number]) => {
    setEmail(c.email);
    setPassword(c.password);
    setSelectedRole(c.role);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      {/* Background image + overlay */}
      <div className="absolute inset-0 -z-10">
        <img src={loginBg} alt="" className="h-full w-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/95" />
        <div className="absolute inset-0 mesh-bg opacity-60" />
      </div>

      <div className="mx-auto grid min-h-screen max-w-7xl gap-8 px-4 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-10 lg:py-12">
        {/* Left: Brand + role cards */}
        <div className="flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl shadow-glow" style={{ background: "var(--gradient-primary)" }}>
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-base font-semibold tracking-tight">EduCore Pro</div>
              <div className="text-xs text-muted-foreground">Student Management Suite</div>
            </div>
          </div>

          <div className="space-y-6 py-10">
            <Badge variant="secondary" className="rounded-full">v2.4 · Enterprise</Badge>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Welcome to the <span className="gradient-text">modern academic OS</span>.
            </h1>
            <p className="max-w-md text-muted-foreground">
              Choose how you'd like to sign in — every role gets a workspace built around what matters most to them.
            </p>

            <div className="grid gap-4 pt-2 sm:grid-cols-3">
              {ROLE_CARDS.map((c) => {
                const active = selectedRole === c.role;
                return (
                  <button
                    key={c.role}
                    type="button"
                    onClick={() => pickRole(c)}
                    className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-300 ${
                      active ? "border-primary shadow-glow scale-[1.02]" : "border-border/60 hover:border-primary/60 hover:-translate-y-1"
                    }`}
                  >
                    <div className="relative aspect-[3/4] w-full">
                      <img src={c.image} alt={`${c.role} portrait`} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                      <div className={`absolute inset-0 bg-gradient-to-t ${c.accent}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                      <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                        <div className="text-[10px] uppercase tracking-widest opacity-80">Sign in as</div>
                        <div className="mt-0.5 text-lg font-semibold">{c.role}</div>
                        <div className="text-xs opacity-90">{c.tagline}</div>
                        <div className="mt-2 flex items-center gap-1 text-[11px] font-medium opacity-0 transition-opacity group-hover:opacity-100">
                          Continue <ArrowRight className="h-3 w-3" />
                        </div>
                      </div>
                      {active && (
                        <div className="absolute right-2 top-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-semibold text-primary-foreground shadow-glow">
                          Selected
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

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
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md border-border/60 shadow-elegant glass">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold tracking-tight">Sign in to your workspace</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {selectedRole ? `Continuing as ${selectedRole}. Edit credentials if needed.` : "Pick a role on the left or enter your credentials."}
              </p>

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
                    onClick={() => { setEmail(c.email); setPassword(c.password); setSelectedRole(c.role); }}
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
    </div>
  );
}
