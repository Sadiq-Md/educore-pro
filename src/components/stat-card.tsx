import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  icon: LucideIcon;
}

export function StatCard({ label, value, delta, trend = "up", icon: Icon }: Props) {
  return (
    <Card className="relative overflow-hidden border-border/60 shadow-elegant">
      <div className="absolute inset-0 opacity-60 mesh-bg pointer-events-none" />
      <CardContent className="relative p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
            <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
            {delta && (
              <p className={`mt-1 text-xs font-medium ${trend === "up" ? "text-emerald-500" : "text-destructive"}`}>
                {trend === "up" ? "▲" : "▼"} {delta}
              </p>
            )}
          </div>
          <div className="grid h-11 w-11 place-items-center rounded-xl shadow-glow" style={{ background: "var(--gradient-primary)" }}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}