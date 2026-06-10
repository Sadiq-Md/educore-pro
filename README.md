# EduCore Pro

A premium, enterprise-grade **Student Management System** built as a modern single-page web application. EduCore Pro provides role-based portals for **Admins**, **Staff**, and **Students** with dashboards, attendance, marks, courses, timetable, materials, analytics, and settings.

> Source repository: https://github.com/Sadiq-Md/Edu_Core

---

## ✨ Features

- **Three role portals** — Admin, Staff, Student (with dedicated dashboards and permissions)
- **Cinematic login** — minimalist auto-rotating image carousel + animated role selection
- **Live CRUD** — staff can mark attendance & enter/edit marks; admin and student dashboards update in real time
- **Premium UI** — glassmorphism, gradient tokens, shadow-elegant system, dark/light themes
- **Charts & analytics** — Recharts (Area, Radar, Bar) for performance, attendance trends, distributions
- **Type-safe routing** — file-based routes via TanStack Router (auto-generated route tree)
- **Reactive store** — `useSyncExternalStore` over `localStorage` so every tab/component stays in sync

---

## 🧰 Tech Stack

| Layer | Technology |
|---|---|
| Framework | **TanStack Start v1** (React 19, SSR-ready) |
| Build tool | **Vite 7** |
| Language | **TypeScript** (strict) |
| Routing | **@tanstack/react-router** (file-based) |
| Data / async | **@tanstack/react-query** |
| Styling | **Tailwind CSS v4** (via `src/styles.css`, native `@import` + `@theme`) |
| UI primitives | **shadcn/ui** + **Radix UI** |
| Charts | **Recharts** |
| Icons | **lucide-react** |
| Carousel | **embla-carousel-react** + **embla-carousel-autoplay** |
| Forms / validation | **react-hook-form** + **zod** |
| Notifications | **sonner** |
| Package manager | **bun** |
| Target runtime | Cloudflare Workers (Edge) |

---

## 🗂 Project Structure

```
Edu_Core/
├── public/                       # Static assets served at /
├── src/
│   ├── assets/                   # Imported images (login bg, role portraits, hero)
│   │   ├── campus-hero.jpg
│   │   ├── login-bg.jpg
│   │   ├── role-admin.jpg
│   │   ├── role-staff.jpg
│   │   └── role-student.jpg
│   │
│   ├── components/
│   │   ├── app-sidebar.tsx       # Collapsible role-aware nav sidebar
│   │   ├── topbar.tsx            # Header (search, theme toggle, user menu)
│   │   ├── page-header.tsx       # Reusable page title + actions
│   │   ├── stat-card.tsx         # KPI tile with icon + trend
│   │   ├── dashboards/
│   │   │   ├── admin-dashboard.tsx
│   │   │   ├── staff-dashboard.tsx
│   │   │   └── student-dashboard.tsx
│   │   └── ui/                   # shadcn primitives (button, card, dialog, ...)
│   │
│   ├── lib/
│   │   ├── auth.tsx              # AuthProvider + DEMO_USERS + useAuth() hook
│   │   ├── theme.tsx             # Dark/Light theme provider (persisted)
│   │   ├── store.ts              # Reactive localStorage store (attendance + marks CRUD)
│   │   ├── mock-data.ts          # Seed data: students, staff, courses, charts
│   │   ├── utils.ts              # `cn()` Tailwind class merger
│   │   └── api/example.functions.ts  # TanStack server-function template
│   │
│   ├── routes/                   # File-based routes (TanStack Router)
│   │   ├── __root.tsx            # Root shell: <html>, providers, <Outlet/>
│   │   ├── index.tsx             # Landing → redirects to /login or /app
│   │   ├── login.tsx             # Cinematic login with carousel + role select
│   │   ├── app.tsx               # Authenticated shell (sidebar + topbar)
│   │   ├── app.index.tsx         # Role-aware dashboard switcher
│   │   ├── app.students.tsx      # Student directory (admin)
│   │   ├── app.staff.tsx         # Staff directory (admin)
│   │   ├── app.courses.tsx       # Course catalog
│   │   ├── app.attendance.tsx    # Staff CRUD: mark attendance per session
│   │   ├── app.marks.tsx         # Staff CRUD: enter/edit marks per assignment
│   │   ├── app.materials.tsx     # Course materials list
│   │   ├── app.timetable.tsx     # Weekly timetable view
│   │   ├── app.analytics.tsx     # Charts & KPIs
│   │   ├── app.settings.tsx      # Profile + preferences
│   │   └── README.md             # Routing conventions
│   │
│   ├── routeTree.gen.ts          # AUTO-GENERATED — do not edit
│   ├── router.tsx                # createRouter() + QueryClient wiring
│   ├── start.ts                  # Server middleware registration
│   ├── server.ts                 # SSR entry
│   └── styles.css                # Tailwind v4 + design tokens (oklch + gradients)
│
├── components.json               # shadcn config
├── vite.config.ts                # Vite + TanStack plugins
├── tsconfig.json                 # TypeScript strict config
├── package.json
├── bun.lock
├── requirements.txt              # Human-readable dependency manifest
└── README.md
```

### What each key file does

| File | Responsibility |
|---|---|
| `src/routes/__root.tsx` | App shell: HTML head, global providers (Theme, Auth, QueryClient), error & 404 boundaries |
| `src/routes/login.tsx` | Animated multi-role login UI with Embla carousel and demo credentials |
| `src/routes/app.tsx` | Auth-guarded layout — renders sidebar + topbar around `<Outlet />` |
| `src/routes/app.index.tsx` | Picks `AdminDashboard`, `StaffDashboard`, or `StudentDashboard` based on `user.role` |
| `src/routes/app.attendance.tsx` | Staff form to mark Present / Absent / Late per course + date |
| `src/routes/app.marks.tsx` | Staff form to upsert per-student scores; auto-computes letter grade |
| `src/lib/auth.tsx` | Demo auth: stores user in `localStorage`, exposes `login()` / `logout()` |
| `src/lib/store.ts` | Single source of truth for attendance + marks. Uses `useSyncExternalStore` so every component re-renders instantly when data changes |
| `src/lib/mock-data.ts` | Seed data for students, staff, courses, charts |
| `src/lib/theme.tsx` | Dark / light theme provider persisted to `localStorage` |
| `src/styles.css` | Design tokens — `--primary`, `--gradient-primary`, `--shadow-elegant`, chart palette |
| `src/components/app-sidebar.tsx` | Role-aware navigation links |
| `src/components/dashboards/*` | Composed dashboards using `StatCard` + Recharts |

---

## 🔐 Authentication & Roles

Demo authentication is client-side. Credentials live in `src/lib/auth.tsx`.

| Role | Email | Password |
|---|---|---|
| Admin | `admin@educore.io` | `admin123` |
| Staff | `staff@educore.io` | `staff123` |
| Student | `student@educore.io` | `student123` |

The admin user is displayed as **Sadiq**.

### Permissions

- **Admin** — full system: users, staff, departments, course assignments, analytics
- **Staff** — assigned courses, mark attendance, enter/edit marks, upload materials
- **Student** — personal dashboard, attendance %, marks, timetable, materials, notifications

---

## 💾 Data Layer ("Database")

The current release uses **`localStorage` as a reactive persistence layer** so the app runs without any backend. The store (`src/lib/store.ts`) exposes a Supabase-like API (`upsert`, `upsertMany`, `remove`) and broadcasts changes via a custom event, so dashboards refresh in real time across tabs.

### Logical schema (mirrors a future SQL design)

```text
users(id, name, email, role, department, avatar)
students(id, name, email, program, year, gpa, avatar, attendance)
staff(id, name, email, department, courses[], rating)
courses(code, title, credits, schedule, students, instructor)
attendance_records(id, course, date, student_id, status, updated_at)
marks(id, course, assignment, student_id, score, max, grade, updated_at)
notifications(id, title, body, type, time)
```

localStorage keys:

| Key | Contents |
|---|---|
| `educore.user` | Currently logged-in user |
| `educore.theme` | `light` or `dark` |
| `educore.attendance.v1` | `AttendanceRecord[]` |
| `educore.marks.v1` | `MarkRecord[]` |

### Upgrading to Lovable Cloud (Supabase)

The project is structured to swap `src/lib/store.ts` for real Supabase tables with minimal changes — keep the hook signatures (`useAttendance`, `useMarks`) and replace the body with Supabase queries + realtime subscriptions. RLS policies should be modeled on the role-table pattern (`user_roles` + `has_role()` security-definer function).

---

## 🚀 Getting Started

### Prerequisites
- **Bun** ≥ 1.1 (recommended) or **Node.js** ≥ 20
- Git

### Install & run

```bash
git clone https://github.com/Sadiq-Md/Edu_Core.git
cd Edu_Core
bun install         # or: npm install
bun run dev         # starts dev server
```

### Build for production

```bash
bun run build
bun run start
```

---

## 🔄 Pushing this project to GitHub

This project lives inside Lovable. To mirror it into your repo `https://github.com/Sadiq-Md/Edu_Core`:

1. In the Lovable editor, click the **Plus (+)** menu in the chat input (bottom-left).
2. Choose **GitHub → Connect project** and authorize the **Lovable GitHub App** for the `Sadiq-Md` account.
3. When prompted for the repository, pick **Use existing repository** → `Sadiq-Md/Edu_Core` (or create a new one).
4. Lovable will push the current codebase and keep it in **bi-directional sync** — commits on GitHub appear in Lovable and vice versa.

> Note: Lovable cannot perform the GitHub OAuth handshake on your behalf — that step has to be done by you from the editor. Once connected, no further action is needed.

---

## 🗺 Application Routes

| URL | File | Purpose |
|---|---|---|
| `/` | `routes/index.tsx` | Landing / redirect |
| `/login` | `routes/login.tsx` | Role-aware sign-in |
| `/app` | `routes/app.tsx` | Authenticated layout |
| `/app` (index) | `routes/app.index.tsx` | Role dashboard |
| `/app/students` | `routes/app.students.tsx` | Students directory |
| `/app/staff` | `routes/app.staff.tsx` | Staff directory |
| `/app/courses` | `routes/app.courses.tsx` | Course catalog |
| `/app/attendance` | `routes/app.attendance.tsx` | Mark attendance (Staff) |
| `/app/marks` | `routes/app.marks.tsx` | Enter / edit marks (Staff) |
| `/app/materials` | `routes/app.materials.tsx` | Course materials |
| `/app/timetable` | `routes/app.timetable.tsx` | Weekly schedule |
| `/app/analytics` | `routes/app.analytics.tsx` | Charts and KPIs |
| `/app/settings` | `routes/app.settings.tsx` | Profile & preferences |

---

## 🎨 Design System

All colors and effects are semantic tokens declared in `src/styles.css` using `oklch()`:

- `--background`, `--foreground`, `--primary`, `--primary-foreground`, `--accent`, `--muted`
- `--gradient-primary` — hero gradients
- `--shadow-elegant`, `--shadow-glow` — premium depth
- Chart palette: `--chart-1` … `--chart-5`

Components never hardcode colors — they use Tailwind classes that resolve to these tokens, so dark/light themes "just work".

---

## 📦 Scripts

| Command | Description |
|---|---|
| `bun run dev` | Start dev server with HMR |
| `bun run build` | Production build |
| `bun run start` | Serve production build |
| `bun run lint` | Run ESLint |

---

## 🔄 GitHub Sync

This project is connected to [Sadiq-Md/Edu_Core](https://github.com/Sadiq-Md/Edu_Core) via Lovable's two-way GitHub integration.

---

## 📄 License

MIT — © 2026 Sadiq.

