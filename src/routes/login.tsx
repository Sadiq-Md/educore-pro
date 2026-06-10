import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Zap, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useAuth, DEMO_CREDENTIALS } from "@/lib/auth";
import { toast } from "sonner";
import loginBg from "@/assets/login-bg.jpg";
import campusHero from "@/assets/campus-hero.jpg";
import roleAdmin from "@/assets/role-admin.jpg";
import roleStaff from "@/assets/role-staff.jpg";
import roleStudent from "@/assets/role-student.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — EduCore Pro" }] }),
  component: LoginPage,
});

const ROLE_CARDS = [
  {
    role: "Admin",
    eyebrow: "Management",
    image: roleAdmin,
    tagline: "Run the institution",
    email: "admin@educore.io",
    password: "admin123",
    bg: "from-indigo-600/30 to-purple-800/30",
    dot: "bg-indigo-400",
    dotGlow: "shadow-[0_0_12px_rgba(129,140,248,0.8)]",
    text: "text-indigo-300",
    ring: "ring-indigo-400/40 border-indigo-400/60 shadow-[0_0_30px_rgba(129,140,248,0.25)]",
  },
  {
    role: "Staff",
    eyebrow: "Educator",
    image: roleStaff,
    tagline: "Teach & inspire",
    email: "staff@educore.io",
    password: "staff123",
    bg: "from-sky-600/30 to-blue-800/30",
    dot: "bg-blue-400",
    dotGlow: "shadow-[0_0_12px_rgba(96,165,250,0.8)]",
    text: "text-blue-300",
    ring: "ring-blue-400/40 border-blue-400/60 shadow-[0_0_30px_rgba(96,165,250,0.25)]",
  },
  {
    role: "Student",
    eyebrow: "Learner",
    image: roleStudent,
    tagline: "Learn & grow",
    email: "student@educore.io",
    password: "student123",
    bg: "from-cyan-600/30 to-emerald-800/30",
    dot: "bg-cyan-400",
    dotGlow: "shadow-[0_0_12px_rgba(34,211,238,0.8)]",
    text: "text-cyan-300",
    ring: "ring-cyan-400/40 border-cyan-400/60 shadow-[0_0_30px_rgba(34,211,238,0.25)]",
  },
] as const;

const CAROUSEL_IMAGES = [loginBg, campusHero, roleAdmin, roleStaff, roleStudent];

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
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-950 text-slate-200 antialiased">
      {/* Cinematic background carousel */}
      <div className="absolute inset-0 z-0">
        <Carousel
          opts={{ loop: true, duration: 60 }}
          plugins={[Autoplay({ delay: 4500, stopOnInteraction: false })]}
          className="h-full w-full"
        >
          <CarouselContent className="ml-0 h-screen">
            {CAROUSEL_IMAGES.map((src, i) => (
              <CarouselItem key={i} className="pl-0 h-screen">
                <div className="relative h-full w-full overflow-hidden">
                  <img
                    src={src}
                    alt=""
                    className="h-full w-full scale-110 object-cover opacity-50 blur-[1px] animate-[kenburns_20s_ease-in-out_infinite_alternate]"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-slate-950/60" />
      </div>

      <style>{`
        @keyframes kenburns {
          0% { transform: scale(1.1) translate(0,0); }
          100% { transform: scale(1.18) translate(-1.5%, -1%); }
        }
      `}</style>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-md flex-col p-6 space-y-5">
        {/* Top nav */}
        <header className="flex animate-fade-in items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
              <Zap className="h-5 w-5 text-white" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-black uppercase tracking-widest text-white">EduCore Pro</span>
              <span className="text-[9px] font-medium tracking-wide text-blue-400">ACADEMIC OS</span>
            </div>
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
            <span className="font-mono text-[10px] tracking-tighter text-slate-400">ENTERPRISE V2.4</span>
          </div>
        </header>

        {/* Hero heading */}
        <div className="animate-fade-in space-y-1 py-2">
          <h1 className="text-3xl font-extrabold leading-[1.1] tracking-tight text-white">
            Welcome to the <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              modern academic OS.
            </span>
          </h1>
          <p className="text-xs font-medium leading-relaxed text-slate-400">
            Select your perspective to begin your session.
          </p>
        </div>

        {/* Role carousel */}
        <div className="-mx-6">
          <div className="no-scrollbar flex snap-x snap-mandatory space-x-4 overflow-x-auto px-6 pb-6">
            {ROLE_CARDS.map((c, idx) => {
              const active = selectedRole === c.role;
              return (
                <button
                  key={c.role}
                  type="button"
                  onClick={() => pickRole(c)}
                  style={{ animationDelay: `${idx * 80}ms` }}
                  className={`group relative h-32 w-48 flex-none snap-center animate-fade-in overflow-hidden rounded-[2rem] text-left transition-all duration-300 active:scale-95 ${
                    active
                      ? `border-2 ring-2 backdrop-blur-xl ${c.ring}`
                      : "border border-white/10 hover:-translate-y-1 hover:border-white/25"
                  }`}
                >
                  <img
                    src={c.image}
                    alt=""
                    className={`absolute inset-0 h-full w-full object-cover transition-all duration-500 group-hover:scale-110 ${
                      active ? "opacity-60" : "opacity-35"
                    }`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${c.bg} backdrop-blur-[2px]`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4">
                    <p className={`mb-1 text-[9px] font-bold uppercase tracking-widest ${c.text}`}>
                      {c.eyebrow}
                    </p>
                    <h3 className="text-lg font-bold leading-none text-white">{c.role}</h3>
                    <p className="mt-1 text-[10px] text-white/60">{c.tagline}</p>
                  </div>
                  <div className="absolute right-4 top-4">
                    <div
                      className={`h-2 w-2 rounded-full ${c.dot} ${active ? c.dotGlow : "opacity-50"} ${
                        active ? "animate-pulse" : ""
                      }`}
                    />
                  </div>
                  {active && (
                    <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md animate-scale-in">
                      <ArrowRight className="h-2.5 w-2.5" /> Selected
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-1 flex-col">
          <div className="animate-fade-in rounded-[2.5rem] border border-white/10 bg-white/5 p-7 shadow-inner backdrop-blur-3xl">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Institutional Email
                </Label>
                <Input
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@edu.corp"
                  required
                  className="h-auto rounded-2xl border-white/5 bg-slate-900/50 px-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus-visible:border-blue-500/50 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                />
              </div>
              <div>
                <Label className="mb-2 ml-1 block text-[10px] font-bold uppercase tracking-widest text-slate-500">
                  Access Code
                </Label>
                <Input
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="h-auto rounded-2xl border-white/5 bg-slate-900/50 px-5 py-3.5 text-sm text-white placeholder:text-slate-600 focus-visible:border-blue-500/50 focus-visible:ring-4 focus-visible:ring-blue-500/10"
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="group relative mt-2 h-auto w-full overflow-hidden rounded-2xl bg-white py-4 font-black text-slate-950 transition-all hover:bg-white active:scale-[0.97]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {submitting ? "Signing in…" : "Enter Workspace"}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={3} />
                </span>
              </Button>
              <div className="flex items-center gap-4 py-2 opacity-60">
                <div className="h-px flex-1 bg-white/10" />
                <span className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                  <ShieldCheck className="h-3 w-3" /> Protected by SOC2
                </span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              {/* Demo accounts */}
              <div className="grid gap-2 pt-1">
                {DEMO_CREDENTIALS.map((c) => (
                  <button
                    key={c.email}
                    type="button"
                    onClick={() => {
                      setEmail(c.email);
                      setPassword(c.password);
                      setSelectedRole(c.role);
                    }}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-900/40 px-3 py-2 text-left text-xs transition hover:border-blue-500/40 hover:bg-slate-900/70"
                  >
                    <div>
                      <div className="font-semibold text-white">{c.role}</div>
                      <div className="text-[10px] text-slate-500">{c.email}</div>
                    </div>
                    <Badge variant="outline" className="border-white/10 text-[9px] text-slate-300">
                      Use
                    </Badge>
                  </button>
                ))}
              </div>
            </form>
          </div>
        </div>

        <footer className="pb-4">
          <div className="flex justify-center gap-6 opacity-40">
            <span className="text-[9px] font-medium text-slate-300">Support</span>
            <span className="text-[9px] font-medium text-slate-300">Privacy</span>
            <span className="text-[9px] font-medium text-blue-400">System Status</span>
          </div>
        </footer>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
