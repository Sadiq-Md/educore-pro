import { useCallback, useEffect, useSyncExternalStore } from "react";
import { students, courses, studentMarks as seedMarks } from "./mock-data";

export type AttendanceStatus = "present" | "absent" | "late";

export interface AttendanceRecord {
  id: string;
  course: string;
  date: string;
  studentId: string;
  status: AttendanceStatus;
  updatedAt: number;
}

export interface MarkRecord {
  id: string;
  course: string;
  assignment: string;
  studentId: string;
  score: number;
  max: number;
  grade: string;
  updatedAt: number;
}

const ATT_KEY = "educore.attendance.v1";
const MARK_KEY = "educore.marks.v1";
const EVT = "educore:store";

function read<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new CustomEvent(EVT, { detail: { key } }));
}

function subscribe(cb: () => void) {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener(EVT, handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener(EVT, handler);
    window.removeEventListener("storage", handler);
  };
}

function ensureSeed() {
  if (typeof window === "undefined") return;
  if (!localStorage.getItem(MARK_KEY)) {
    const seed: MarkRecord[] = seedMarks.map((m, i) => ({
      id: `seed-${i}`,
      course: m.course,
      assignment: m.assignment,
      studentId: "S-1024",
      score: m.score,
      max: m.max,
      grade: m.grade,
      updatedAt: Date.now(),
    }));
    localStorage.setItem(MARK_KEY, JSON.stringify(seed));
  }
}

export function gradeFromScore(score: number, max: number): string {
  const p = (score / max) * 100;
  if (p >= 90) return "A+";
  if (p >= 85) return "A";
  if (p >= 80) return "A-";
  if (p >= 75) return "B+";
  if (p >= 70) return "B";
  if (p >= 60) return "C";
  if (p >= 50) return "D";
  return "F";
}

export function useAttendance() {
  useEffect(ensureSeed, []);
  const snap = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(ATT_KEY) ?? "[]",
    () => "[]",
  );
  const records: AttendanceRecord[] = JSON.parse(snap);

  const upsertMany = useCallback((items: Omit<AttendanceRecord, "id" | "updatedAt">[]) => {
    const current = read<AttendanceRecord[]>(ATT_KEY, []);
    const map = new Map(current.map((r) => [r.id, r]));
    for (const it of items) {
      const id = `${it.course}|${it.date}|${it.studentId}`;
      map.set(id, { ...it, id, updatedAt: Date.now() });
    }
    write(ATT_KEY, Array.from(map.values()));
  }, []);

  const remove = useCallback((id: string) => {
    write(ATT_KEY, read<AttendanceRecord[]>(ATT_KEY, []).filter((r) => r.id !== id));
  }, []);

  return { records, upsertMany, remove };
}

export function attendanceRateFor(records: AttendanceRecord[], studentId?: string, course?: string) {
  const filtered = records.filter(
    (r) => (!studentId || r.studentId === studentId) && (!course || r.course === course),
  );
  if (!filtered.length) return null;
  const ok = filtered.filter((r) => r.status === "present" || r.status === "late").length;
  return Math.round((ok / filtered.length) * 100);
}

export function overallAttendanceRate(records: AttendanceRecord[]) {
  return attendanceRateFor(records);
}

export function useMarks() {
  useEffect(ensureSeed, []);
  const snap = useSyncExternalStore(
    subscribe,
    () => localStorage.getItem(MARK_KEY) ?? "[]",
    () => "[]",
  );
  const records: MarkRecord[] = JSON.parse(snap);

  const upsert = useCallback(
    (rec: Omit<MarkRecord, "id" | "updatedAt" | "grade"> & { id?: string }) => {
      const current = read<MarkRecord[]>(MARK_KEY, []);
      const id = rec.id ?? `${rec.course}|${rec.assignment}|${rec.studentId}`;
      const grade = gradeFromScore(rec.score, rec.max);
      const idx = current.findIndex((r) => r.id === id);
      const next: MarkRecord = { ...rec, id, grade, updatedAt: Date.now() };
      if (idx >= 0) current[idx] = next;
      else current.push(next);
      write(MARK_KEY, current);
    },
    [],
  );

  const upsertMany = useCallback(
    (recs: Array<Omit<MarkRecord, "id" | "updatedAt" | "grade">>) => {
      const current = read<MarkRecord[]>(MARK_KEY, []);
      const map = new Map(current.map((r) => [r.id, r]));
      for (const r of recs) {
        const id = `${r.course}|${r.assignment}|${r.studentId}`;
        map.set(id, { ...r, id, grade: gradeFromScore(r.score, r.max), updatedAt: Date.now() });
      }
      write(MARK_KEY, Array.from(map.values()));
    },
    [],
  );

  const remove = useCallback((id: string) => {
    write(MARK_KEY, read<MarkRecord[]>(MARK_KEY, []).filter((r) => r.id !== id));
  }, []);

  return { records, upsert, upsertMany, remove };
}

export function avgScoreFor(marks: MarkRecord[], studentId?: string, course?: string) {
  const filtered = marks.filter(
    (m) => (!studentId || m.studentId === studentId) && (!course || m.course.startsWith(course)),
  );
  if (!filtered.length) return null;
  const pct = filtered.reduce((s, m) => s + (m.score / m.max) * 100, 0) / filtered.length;
  return Math.round(pct);
}

export const STUDENT_DEMO_ID = "S-1024";
export { students, courses };
