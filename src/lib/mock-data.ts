export const stats = {
  totalStudents: 4827,
  totalStaff: 312,
  totalCourses: 148,
  feesCollected: 2480000,
  attendanceRate: 92.4,
  avgGpa: 3.42,
};

export const enrollmentTrend = [
  { month: "Jan", students: 3800, target: 4000 },
  { month: "Feb", students: 3950, target: 4100 },
  { month: "Mar", students: 4100, target: 4200 },
  { month: "Apr", students: 4220, target: 4300 },
  { month: "May", students: 4380, target: 4400 },
  { month: "Jun", students: 4500, target: 4500 },
  { month: "Jul", students: 4620, target: 4600 },
  { month: "Aug", students: 4827, target: 4700 },
];

export const attendanceTrend = [
  { week: "W1", rate: 88 },
  { week: "W2", rate: 91 },
  { week: "W3", rate: 89 },
  { week: "W4", rate: 93 },
  { week: "W5", rate: 95 },
  { week: "W6", rate: 92 },
  { week: "W7", rate: 94 },
  { week: "W8", rate: 96 },
];

export const departmentDistribution = [
  { name: "Computer Science", value: 1280 },
  { name: "Engineering", value: 1040 },
  { name: "Business", value: 880 },
  { name: "Arts & Design", value: 620 },
  { name: "Sciences", value: 540 },
  { name: "Medicine", value: 467 },
];

export const feeCollection = [
  { month: "Mar", collected: 280, pending: 60 },
  { month: "Apr", collected: 310, pending: 45 },
  { month: "May", collected: 295, pending: 55 },
  { month: "Jun", collected: 340, pending: 30 },
  { month: "Jul", collected: 360, pending: 40 },
  { month: "Aug", collected: 380, pending: 25 },
];

export const students = [
  { id: "S-1024", name: "Aisha Patel", email: "aisha.p@educore.io", department: "Computer Science", year: 3, gpa: 3.86, attendance: 94, status: "Active" },
  { id: "S-1025", name: "Liam Johnson", email: "liam.j@educore.io", department: "Engineering", year: 2, gpa: 3.42, attendance: 88, status: "Active" },
  { id: "S-1026", name: "Sofia Martinez", email: "sofia.m@educore.io", department: "Business", year: 4, gpa: 3.91, attendance: 97, status: "Active" },
  { id: "S-1027", name: "Noah Williams", email: "noah.w@educore.io", department: "Medicine", year: 1, gpa: 3.21, attendance: 81, status: "Probation" },
  { id: "S-1028", name: "Emma Brown", email: "emma.b@educore.io", department: "Arts & Design", year: 3, gpa: 3.74, attendance: 92, status: "Active" },
  { id: "S-1029", name: "Kai Tanaka", email: "kai.t@educore.io", department: "Sciences", year: 2, gpa: 3.55, attendance: 90, status: "Active" },
  { id: "S-1030", name: "Zara Ahmed", email: "zara.a@educore.io", department: "Computer Science", year: 4, gpa: 3.95, attendance: 98, status: "Active" },
  { id: "S-1031", name: "Diego Rivera", email: "diego.r@educore.io", department: "Engineering", year: 1, gpa: 3.10, attendance: 78, status: "Probation" },
  { id: "S-1032", name: "Mei Lin", email: "mei.l@educore.io", department: "Business", year: 3, gpa: 3.68, attendance: 91, status: "Active" },
  { id: "S-1033", name: "Oliver Schmidt", email: "oliver.s@educore.io", department: "Computer Science", year: 2, gpa: 3.48, attendance: 89, status: "Active" },
];

export const courses = [
  { code: "CS-301", title: "Distributed Systems", instructor: "Prof. M. Reed", students: 64, credits: 4, schedule: "Mon/Wed 10:00" },
  { code: "CS-220", title: "Algorithms & Data Structures", instructor: "Prof. R. Iyer", students: 88, credits: 4, schedule: "Tue/Thu 09:00" },
  { code: "EE-410", title: "Embedded Systems", instructor: "Prof. L. Kovac", students: 42, credits: 3, schedule: "Mon/Fri 13:00" },
  { code: "BUS-201", title: "Financial Accounting", instructor: "Dr. P. Okafor", students: 120, credits: 3, schedule: "Tue/Thu 11:00" },
  { code: "MED-101", title: "Human Anatomy I", instructor: "Dr. H. Lindqvist", students: 54, credits: 5, schedule: "Daily 08:00" },
  { code: "ART-310", title: "Generative Design", instructor: "Prof. N. Alvarez", students: 36, credits: 3, schedule: "Wed 14:00" },
];

export const staffList = [
  { id: "T-201", name: "Prof. Michael Reed", email: "m.reed@educore.io", department: "Computer Science", courses: 3, rating: 4.8 },
  { id: "T-202", name: "Prof. Rashida Iyer", email: "r.iyer@educore.io", department: "Computer Science", courses: 4, rating: 4.9 },
  { id: "T-203", name: "Prof. Lukas Kovac", email: "l.kovac@educore.io", department: "Engineering", courses: 2, rating: 4.6 },
  { id: "T-204", name: "Dr. Priya Okafor", email: "p.okafor@educore.io", department: "Business", courses: 3, rating: 4.7 },
  { id: "T-205", name: "Dr. Hilda Lindqvist", email: "h.lindqvist@educore.io", department: "Medicine", courses: 2, rating: 4.9 },
];

export const studentPerformance = [
  { subject: "Math", score: 88, average: 76 },
  { subject: "Algorithms", score: 92, average: 74 },
  { subject: "Systems", score: 85, average: 71 },
  { subject: "Databases", score: 90, average: 78 },
  { subject: "Networks", score: 81, average: 73 },
  { subject: "AI", score: 94, average: 75 },
];

export const studentMarks = [
  { course: "CS-301 Distributed Systems", assignment: "Midterm", score: 88, max: 100, grade: "A" },
  { course: "CS-220 Algorithms", assignment: "Project 2", score: 95, max: 100, grade: "A+" },
  { course: "MATH-210 Linear Algebra", assignment: "Quiz 4", score: 38, max: 40, grade: "A" },
  { course: "CS-280 Databases", assignment: "Final", score: 82, max: 100, grade: "A-" },
  { course: "ENG-101 Tech Writing", assignment: "Essay", score: 27, max: 30, grade: "A" },
];

export const timetable = [
  { day: "Mon", slots: [{ time: "09:00", course: "CS-220 Algorithms", room: "B-204" }, { time: "11:00", course: "MATH-210", room: "A-101" }, { time: "14:00", course: "CS-301", room: "B-310" }] },
  { day: "Tue", slots: [{ time: "09:00", course: "CS-280 Databases", room: "B-204" }, { time: "13:00", course: "ENG-101", room: "C-201" }] },
  { day: "Wed", slots: [{ time: "10:00", course: "CS-301", room: "B-310" }, { time: "14:00", course: "Lab — AI", room: "Lab-5" }] },
  { day: "Thu", slots: [{ time: "09:00", course: "CS-220 Algorithms", room: "B-204" }, { time: "11:00", course: "CS-280", room: "B-204" }] },
  { day: "Fri", slots: [{ time: "10:00", course: "MATH-210", room: "A-101" }, { time: "13:00", course: "Seminar", room: "Hall-A" }] },
];

export const materials = [
  { id: "M-01", title: "Distributed Systems — Lecture 06 Slides", course: "CS-301", type: "PDF", size: "4.2 MB", uploaded: "2d ago" },
  { id: "M-02", title: "Algorithms — Problem Set 5", course: "CS-220", type: "PDF", size: "1.1 MB", uploaded: "4d ago" },
  { id: "M-03", title: "Database Project Spec", course: "CS-280", type: "DOCX", size: "820 KB", uploaded: "1w ago" },
  { id: "M-04", title: "AI Lab Notebook — RNN", course: "CS-450", type: "IPYNB", size: "2.6 MB", uploaded: "1w ago" },
];

export const notifications = [
  { id: 1, title: "New assignment posted", body: "CS-301 — Project 3 due Sep 18", time: "5m ago", type: "info" as const },
  { id: 2, title: "Grade released", body: "CS-220 Project 2 graded: A+", time: "2h ago", type: "success" as const },
  { id: 3, title: "Attendance warning", body: "Your attendance in ENG-101 dropped below 80%", time: "1d ago", type: "warning" as const },
  { id: 4, title: "Fee reminder", body: "Semester fee due Sep 30", time: "2d ago", type: "info" as const },
];