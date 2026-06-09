import { createFileRoute } from "@tanstack/react-router";
import { Download, FileText, Upload } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { materials } from "@/lib/mock-data";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/app/materials")({
  head: () => ({ meta: [{ title: "Materials — EduCore Pro" }] }),
  component: MaterialsPage,
});

function MaterialsPage() {
  const { user } = useAuth();
  return (
    <div>
      <PageHeader
        title="Study materials"
        description="Lecture slides, lab notes, problem sets and more."
        actions={user?.role !== "student" ? (
          <Button className="shadow-glow" style={{ background: "var(--gradient-primary)" }} onClick={() => toast.success("Upload dialog opened")}><Upload className="mr-2 h-4 w-4"/>Upload</Button>
        ) : null}
      />
      <div className="grid gap-3">
        {materials.map((m) => (
          <Card key={m.id} className="shadow-elegant">
            <CardContent className="flex items-center gap-4 p-4">
              <div className="grid h-11 w-11 place-items-center rounded-lg bg-accent">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{m.title}</div>
                <div className="text-xs text-muted-foreground">{m.course} · {m.size} · {m.uploaded}</div>
              </div>
              <Badge variant="outline">{m.type}</Badge>
              <Button variant="ghost" size="icon" onClick={() => toast.success("Downloading…")}><Download className="h-4 w-4"/></Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}