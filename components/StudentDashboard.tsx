import React, { useState } from 'react';
import { Student, Teacher, AttendanceStatus } from '../types';

const PerformanceMeter: React.FC<{ percentage: number }> = ({ percentage }) => {
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = percentage > 80 ? 'text-green-500' : percentage > 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle className="text-gray-200" strokeWidth="10" stroke="currentColor" fill="transparent" r="52" cx="60" cy="60" />
        <circle
          className={color}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
          transform="rotate(-90 60 60)"
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className={`text-3xl font-bold ${color}`}>{percentage}%</span>
        <span className="text-sm text-gray-500">Performance</span>
      </div>
    </div>
  );
};

interface StudentDashboardProps {
  student: Student;
  teacher: Teacher;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ student, teacher }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const formatPhoneNumberForWhatsApp = (phone: string) => {
    return phone.replace(/\D/g, '');
  };
  
  const lastFiveAttendance = [...student.attendance].reverse().slice(0, 5);
  
  const renderTabContent = () => {
      switch(activeTab) {
          case 'assignments':
              return (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800">Assignments</h3>
                    <p className="font-arabic text-gray-500">اسائنمنٹس</p>
                    <div className="mt-4 text-center text-gray-500">
                        <p>No new assignments at the moment.</p>
                        <button className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">
                            Submit Homework
                        </button>
                    </div>
                </div>
              );
          case 'results':
              return (
                <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                    <h3 className="font-bold text-lg text-gray-800">Exam Results</h3>
                    <p className="font-arabic text-gray-500">امتحان کے نتائج</p>
                    <div className="mt-4 text-center text-gray-500">
                        <p>Results for the final exams will be published here.</p>
                    </div>
                </div>
              );
          case 'dashboard':
          default:
              return (
                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                    {/* Left Column: Performance & Lesson */}
                    <div className="lg:col-span-2 space-y-6">
                      {/* Daily Lesson */}
                      <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-bold text-lg text-gray-800">Today's Lesson</h3>
                        <p className="font-arabic text-gray-500">آج کا سبق</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-lg">
                            <p className="font-arabic text-green-700 font-semibold">سبق (Daily Sabak)</p>
                            <p className="text-gray-800 mt-1">{student.hifzRecord?.sabak}</p>
                          </div>
                          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                            <p className="font-arabic text-blue-700 font-semibold">سبقی (Sabqi)</p>
                            <p className="text-gray-800 mt-1">{student.hifzRecord?.sabqi}</p>
                          </div>
                          <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-lg">
                            <p className="font-arabic text-yellow-700 font-semibold">منزل (Revision)</p>
                            <p className="text-gray-800 mt-1">{student.hifzRecord?.manzil}</p>
                          </div>
                        </div>
                      </div>

                      {/* Teacher's Comments */}
                      <div className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="font-bold text-lg text-gray-800">Teacher's Comments</h3>
                        <p className="font-arabic text-gray-500">استاذ کا تبصرہ</p>
                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border flex-grow flex items-center">
                          <p className="text-gray-700 italic leading-relaxed">"{student.hifzRecord?.teacherComments}"</p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Meter, Attendance, Fees */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
                            <h3 className="font-bold text-lg text-center text-gray-800">Performance Meter</h3>
                            <p className="font-arabic text-center text-gray-500 mb-4">میزانِ تحفّظ</p>
                            <PerformanceMeter percentage={student.hifzRecord?.performance || 0} />
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="font-bold text-lg text-gray-800">Recent Attendance</h3>
                            <p className="font-arabic text-gray-500">حالیہ حاضری</p>
                            <ul className="mt-4 space-y-2">
                                {lastFiveAttendance.map(att => (
                                    <li key={att.date} className="flex justify-between items-center text-sm">
                                        <p className="text-gray-600">{att.date}</p>
                                        <span className={`px-2 py-1 font-semibold rounded-full text-xs ${
                                            att.status === AttendanceStatus.Present ? 'bg-green-100 text-green-800' : 
                                            att.status === AttendanceStatus.Absent ? 'bg-red-100 text-red-800' : 
                                            att.status === AttendanceStatus.Leave ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                                        }`}>{att.status}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-6 rounded-xl shadow-md">
                            <h3 className="font-bold text-lg text-gray-800">Fee Status</h3>
                             <p className="font-arabic text-gray-500">فیس کی حالت</p>
                            <div className="mt-4 flex justify-between items-center p-4 border rounded-lg">
                                <div>
                                    <p className="text-gray-700 font-semibold">{student.fees.month}</p>
                                    <p className="text-gray-500 text-sm">Amount: Rs {student.fees.amount}</p>
                                </div>
                                <span className={`px-3 py-1 text-sm font-semibold rounded-full ${student.fees.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                    {student.fees.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
              );
      }
  }

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div className="flex items-center">
            <img src={student.photoUrl} alt={student.name} className="w-20 h-20 rounded-full object-cover border-4 border-green-500"/>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-gray-800">Welcome, {student.name}</h2>
              <p className="font-arabic text-gray-500" dir="rtl">خوش آمدید، {student.name}</p>
              <p className="text-gray-600">{student.class} - {student.department}</p>
            </div>
          </div>
          <a 
            href={`https://wa.me/${formatPhoneNumberForWhatsApp(teacher.contact)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 sm:mt-0 px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center space-x-2"
          >
            <WhatsAppIcon />
            <span>Message Teacher</span>
          </a>
        </div>
      </div>
      
      {/* Tabs */}
       <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('dashboard')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'dashboard' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Dashboard (ڈیش بورڈ)
            </button>
            <button onClick={() => setActiveTab('assignments')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'assignments' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Assignments (اسائنمنٹس)
            </button>
            <button onClick={() => setActiveTab('results')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'results' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Results (نتائج)
            </button>
          </nav>
        </div>
      </div>

      {renderTabContent()}

    </div>
  );
};

const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 4.919 1.448-1.465 4.832z"/>
    </svg>
);

export default StudentDashboard;