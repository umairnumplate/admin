import { Student, AttendanceStatus, Teacher, User, ClassSchedule } from './types';

export const MOCK_TEACHER: Teacher = {
  id: 1,
  name: 'Ustad Usman Ghani',
  department: 'Hifz-ul-Quran',
  class: 'Hifz Class A',
  contact: '+92 333 9876543',
};

export const MOCK_USERS: User[] = [
    { id: 1, name: 'Ustad Usman Ghani', username: 'teacher', role: 'teacher', password: 'teacher', phone: '+923331234567' },
    { id: 2, name: 'Abdullah Khan', username: 'student', role: 'student', password: 'student', phone: '+923009876543' },
    { id: 3, name: 'ALI HAMZA', username: 'alihamza', role: 'admin', password: 'alihamza', phone: '+923215554433' },
    { id: 4, name: 'Dr. MUFTI ZAHEER AHMED', username: 'zaheerahmed', role: 'admin', password: 'zaheerahmed', phone: '+923126677889' },
];

export const MOCK_CLASSES: ClassSchedule[] = [
  {
    id: 1,
    name: 'Hifz Class A (Morning)',
    teacherId: 1, // Corresponds to Ustad Usman Ghani
    periods: [
      { id: 101, name: 'Fajr & Recitation', time: '05:30 - 07:00', isTaught: true },
      { id: 102, name: 'Sabak (New Lesson)', time: '08:00 - 09:30', isTaught: true },
      { id: 103, name: 'Sabqi (Recent Revision)', time: '09:30 - 10:30', isTaught: true },
      { id: 104, name: 'Manzil (Old Revision)', time: '10:45 - 11:45', isTaught: false },
    ],
  },
  {
    id: 2,
    name: 'Tajweed Basics (Afternoon)',
    teacherId: 1,
    periods: [
       { id: 201, name: 'Makharij Practice', time: '14:00 - 15:00', isTaught: true },
       { id: 202, name: 'Sifaat Theory', time: '15:00 - 16:00', isTaught: false },
    ],
  },
   {
    id: 3,
    name: 'Evening Revision Group',
    teacherId: 1,
    periods: [
       { id: 301, name: 'Group Recitation Circle', time: '18:00 - 19:00', isTaught: false },
    ],
  },
];


export const MOCK_STUDENTS: Student[] = [
  {
    id: 101,
    name: 'Abdullah Khan',
    photoUrl: 'https://picsum.photos/seed/abdullah/200/200',
    class: 'Hifz Class A',
    department: 'Hifz-ul-Quran',
    fatherName: 'Ahmed Khan',
    contact: '+92 300 1234567',
    teacherId: 1,
    hifzRecord: {
      sabak: 'Surah Al-Baqarah (Ayah 1-5)',
      sabqi: 'Surah Al-Fatiha',
      manzil: 'Juz 30 (Complete)',
      performance: 85,
      performanceHistory: [
        { date: 'Week 1', score: 75 },
        { date: 'Week 2', score: 78 },
        { date: 'Week 3', score: 82 },
        { date: 'Week 4', score: 80 },
        { date: 'Week 5', score: 85 },
      ],
      teacherComments: 'Excellent progress this week. Abdullah has a strong memory but needs to focus on Tajweed rules for Ayah 3.',
    },
    attendance: [
      { date: '2023-10-01', status: AttendanceStatus.Present },
      { date: '2023-10-02', status: AttendanceStatus.Present },
      { date: '2023-10-03', status: AttendanceStatus.Absent },
      { date: '2023-10-04', status: AttendanceStatus.Present },
      { date: '2023-10-05', status: AttendanceStatus.Leave },
    ],
    dailyHifzProgress: [
        { date: '2023-10-25', sabak: 'Al-Baqarah 1-5', sabqi: 'Al-Fatiha', manzil: 'Juz 30', remarks: 'Good recall.'}
    ],
    fees: { month: 'October 2023', amount: 2500, status: 'Paid' },
  },
  {
    id: 102,
    name: 'Fatima Ahmed',
    photoUrl: 'https://picsum.photos/seed/fatima/200/200',
    class: 'Dars-e-Nizami Year 1',
    department: 'Dars-e-Nizami',
    fatherName: 'Bilal Ahmed',
    contact: '+92 321 7654321',
    darsNizamiRecords: [
        { subject: 'Aqeedah', dailyTestScore: 9, weeklyTestScore: 85, assignment: 'Chapter 2 summary', remarks: 'Good understanding of concepts.' },
        { subject: 'Fiqh', dailyTestScore: 7, weeklyTestScore: 72, assignment: 'Salah practical steps', remarks: 'Needs improvement in memorizing conditions.' }
    ],
    attendance: [
      { date: '2023-10-01', status: AttendanceStatus.Present },
      { date: '2023-10-02', status: AttendanceStatus.Present },
      { date: '2023-10-03', status: AttendanceStatus.Present },
      { date: '2023-10-04', status: AttendanceStatus.Present },
      { date: '2023-10-05', status: AttendanceStatus.Late },
    ],
    fees: { month: 'October 2023', amount: 4000, status: 'Unpaid' },
  },
   {
    id: 103,
    name: 'Zainab Ali',
    photoUrl: 'https://picsum.photos/seed/zainab/200/200',
    class: 'Hifz Class A',
    department: 'Hifz-ul-Quran',
    fatherName: 'Murtaza Ali',
    contact: '+92 312 1122334',
    teacherId: 1,
    hifzRecord: {
      sabak: 'Surah Al-Baqarah (Ayah 6-10)',
      sabqi: 'Surah Al-Fatiha',
      manzil: 'Juz 30',
      performance: 92,
      performanceHistory: [
        { date: 'Week 1', score: 88 },
        { date: 'Week 2', score: 90 },
        { date: 'Week 3', score: 91 },
        { date: 'Week 4', score: 89 },
        { date: 'Week 5', score: 92 },
      ],
      teacherComments: 'Very dedicated student. Her pronunciation is excellent.',
    },
    attendance: [
      { date: '2023-10-01', status: AttendanceStatus.Present },
      { date: '2023-10-02', status: AttendanceStatus.Present },
      { date: '2023-10-03', status: AttendanceStatus.Present },
      { date: '2023-10-04', status: AttendanceStatus.Present },
      { date: '2023-10-05', status: AttendanceStatus.Present },
    ],
     dailyHifzProgress: [
        { date: '2023-10-25', sabak: 'Al-Baqarah 6-10', sabqi: 'Al-Fatiha', manzil: 'Juz 30', remarks: 'Excellent work.'}
    ],
    fees: { month: 'October 2023', amount: 2500, status: 'Paid' },
  },
];