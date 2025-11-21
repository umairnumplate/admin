export enum AttendanceStatus {
  Present = 'Present',
  Absent = 'Absent',
  Leave = 'Leave',
  Late = 'Late',
}

export interface PerformanceHistory {
  date: string;
  score: number;
}

export interface HifzRecord {
  sabak: string;
  sabqi: string;
  manzil: string;
  performance: number; // Latest performance score
  performanceHistory: PerformanceHistory[];
  teacherComments: string;
}

export interface DarsNizamiRecord {
    subject: string;
    dailyTestScore: number | null;
    weeklyTestScore: number | null;
    assignment: string;
    remarks: string;
}

export type StudentDepartment = 'Hifz-ul-Quran' | 'Dars-e-Nizami';

export interface DailyHifzProgress {
  date: string;
  sabak: string;
  sabqi: string;
  manzil: string;
  remarks: string;
}

export interface Student {
  id: number;
  name: string;
  photoUrl: string;
  class: string;
  department: StudentDepartment;
  fatherName: string;
  contact: string;
  teacherId?: number;
  hifzRecord?: HifzRecord;
  darsNizamiRecords?: DarsNizamiRecord[];
  attendance: { date: string; status: AttendanceStatus }[];
  dailyHifzProgress?: DailyHifzProgress[];
  fees: { month: string; amount: number; status: 'Paid' | 'Unpaid' | 'Partial' };
}

export interface Teacher {
  id: number;
  name: string;
  department: StudentDepartment;
  class: string;
  contact: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    role: 'admin' | 'teacher' | 'student';
    password?: string;
    phone?: string;
}

export interface Period {
  id: number;
  name: string;
  time: string;
  isTaught: boolean;
}

export interface ClassSchedule {
  id: number;
  name: string;
  teacherId: number;
  periods: Period[];
}