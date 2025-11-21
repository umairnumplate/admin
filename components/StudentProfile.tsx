import React, { useState } from 'react';
import { Student, AttendanceStatus } from '../types';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface StudentProfileProps {
  student: Student;
}

const PerformanceMeter: React.FC<{ percentage: number }> = ({ percentage }) => {
  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const color = percentage > 80 ? 'text-green-500' : percentage > 60 ? 'text-yellow-500' : 'text-red-500';

  return (
    <div className="relative flex items-center justify-center w-40 h-40">
      <svg className="w-full h-full" viewBox="0 0 120 120">
        <circle
          className="text-gray-200"
          strokeWidth="10"
          stroke="currentColor"
          fill="transparent"
          r="52"
          cx="60"
          cy="60"
        />
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

const StudentProfile: React.FC<StudentProfileProps> = ({ student }) => {
  const [activeTab, setActiveTab] = useState('performance');
  
  const formatPhoneNumberForWhatsApp = (phone: string) => {
    // Removes all non-digit characters and ensures it's in international format.
    return phone.replace(/\D/g, '');
  };

  const HifzPerformance = () => (
    <div className="space-y-6 mt-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md flex flex-col items-center">
          <h3 className="font-bold text-lg text-center text-gray-800">Performance Meter</h3>
          <p className="font-arabic text-center text-gray-500 mb-4">میزانِ تحفّظ</p>
          <PerformanceMeter percentage={student.hifzRecord?.performance || 0} />
          <div className="w-full h-48 mt-6">
            <h4 className="font-semibold text-center text-gray-700 mb-2">Performance Trend</h4>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={student.hifzRecord?.performanceHistory}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
              >
                <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    border: '1px solid #e2e8f0',
                    borderRadius: '0.5rem',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  name="Score"
                  unit="%"
                  stroke="#10B981"
                  strokeWidth={3}
                  dot={{ r: 5, fill: '#10B981', strokeWidth: 2, stroke: 'white' }}
                  activeDot={{ r: 8, strokeWidth: 2, stroke: 'white' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md flex flex-col">
          <h3 className="font-bold text-lg text-gray-800">Teacher's Comments</h3>
          <p className="font-arabic text-gray-500">استاذ کا تبصرہ</p>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border flex-grow flex items-center">
            <p className="text-gray-700 italic leading-relaxed">"{student.hifzRecord?.teacherComments}"</p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderTabContent = () => {
    switch (activeTab) {
        case 'performance':
            return <HifzPerformance />;
        case 'attendance':
            return <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg text-gray-800">Attendance Record</h3>
                <p className="font-arabic text-gray-500">حاضری کا ریکارڈ</p>
                <ul className="mt-4 divide-y divide-gray-200">
                    {student.attendance.map(att => (
                        <li key={att.date} className="py-3 flex justify-between items-center">
                            <p className="text-gray-700">{att.date}</p>
                            <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                                att.status === AttendanceStatus.Present ? 'bg-green-100 text-green-800' : 
                                att.status === AttendanceStatus.Absent ? 'bg-red-100 text-red-800' : 
                                att.status === AttendanceStatus.Leave ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'
                            }`}>{att.status}</span>
                        </li>
                    ))}
                </ul>
            </div>;
        case 'fees':
             return <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
                <h3 className="font-bold text-lg text-gray-800">Fee Record</h3>
                <p className="font-arabic text-gray-500">فیس ریکارڈ</p>
                <div className="mt-4 flex justify-between items-center p-4 border rounded-lg">
                    <div>
                        <p className="text-gray-700 font-semibold">{student.fees.month}</p>
                        <p className="text-gray-500 text-sm">Amount: Rs {student.fees.amount}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${student.fees.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {student.fees.status}
                    </span>
                </div>
            </div>;
        default:
            return null;
    }
  }


  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white p-6 rounded-xl shadow-md flex items-center space-x-6">
        <img
          src={student.photoUrl}
          alt={student.name}
          className="w-24 h-24 rounded-full object-cover border-4 border-green-500"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-gray-500">{student.class} - {student.department}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
              <p><strong>Father:</strong> {student.fatherName}</p>
              <div className="flex items-center space-x-2">
                <p><strong>Contact:</strong> {student.contact}</p>
                 <a 
                    href={`https://wa.me/${formatPhoneNumberForWhatsApp(student.contact)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    title="Send WhatsApp Message"
                    className="text-green-600 hover:text-green-800 transition-colors"
                  >
                    <WhatsAppIcon />
                  </a>
              </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
       <div>
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('performance')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'performance' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Performance (کارکردگی)
            </button>
            <button onClick={() => setActiveTab('attendance')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'attendance' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Attendance (حاضری)
            </button>
            <button onClick={() => setActiveTab('fees')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'fees' ? 'border-green-500 text-green-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
              Fees (فیس)
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


export default StudentProfile;