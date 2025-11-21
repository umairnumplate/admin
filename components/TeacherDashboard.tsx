import React, { useState } from 'react';
import { Teacher, Student, AttendanceStatus, ClassSchedule } from '../types';
import { MOCK_CLASSES } from '../constants';

interface TeacherDashboardProps {
  teacher: Teacher;
  students: Student[];
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ teacher, students }) => {
  const [studentData, setStudentData] = useState(students);
  const [attendance, setAttendance] = useState<Record<number, AttendanceStatus>>(() => {
    const initialState: Record<number, AttendanceStatus> = {};
    students.forEach(s => {
      initialState[s.id] = s.attendance[0]?.status || AttendanceStatus.Present;
    });
    return initialState;
  });
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const [view, setView] = useState<'overview' | 'classes'>('overview');
  const [selectedClass, setSelectedClass] = useState<ClassSchedule | null>(null);
  const [teacherClasses, setTeacherClasses] = useState(() => MOCK_CLASSES.filter(c => c.teacherId === teacher.id));


  const handleAttendanceChange = (studentId: number, status: AttendanceStatus) => {
    setAttendance(prev => ({ ...prev, [studentId]: status }));
  };
  
  const handleCreateClass = () => {
    const className = prompt("Please enter the new class name:");
    if (className && className.trim() !== '') {
        const newClass: ClassSchedule = {
            id: Date.now(),
            name: className.trim(),
            teacherId: teacher.id,
            periods: Array.from({ length: 7 }, (_, i) => ({
                id: Date.now() + i,
                name: `Period ${i + 1}`,
                time: `${String(8 + i).padStart(2, '0')}:00 - ${String(9 + i).padStart(2, '0')}:00`,
                isTaught: false
            }))
        };
        setTeacherClasses(prev => [...prev, newClass]);
    }
  };

  const handleMarkAllTaught = (classId: number) => {
      let updatedClass: ClassSchedule | null = null;
      
      setTeacherClasses(prevClasses => prevClasses.map(cls => {
          if (cls.id === classId) {
              const newPeriods = cls.periods.map(p => ({ ...p, isTaught: true }));
              updatedClass = { ...cls, periods: newPeriods };
              return updatedClass;
          }
          return cls;
      }));
      
      if (updatedClass) {
          setSelectedClass(updatedClass);
      }
  };
  
  const handlePeriodTaughtChange = (classId: number, periodId: number, isChecked: boolean) => {
      let updatedClass: ClassSchedule | null = null;
      
      setTeacherClasses(prevClasses => prevClasses.map(cls => {
          if (cls.id === classId) {
              const newPeriods = cls.periods.map(p => {
                  if (p.id === periodId) {
                      return { ...p, isTaught: isChecked };
                  }
                  return p;
              });
              updatedClass = { ...cls, periods: newPeriods };
              return updatedClass;
          }
          return cls;
      }));
      
      if (updatedClass) {
          setSelectedClass(updatedClass);
      }
  };


  const renderOverview = () => (
     <div className="space-y-6">
       {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
            <button onClick={() => setIsMessageModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="font-bold text-lg text-gray-800">Message Your Students' Parents</h3>
            <p className="font-arabic text-gray-500">اپنے طلبہ کے والدین کو پیغام بھیجیں</p>
            <div className="mt-4">
                <label htmlFor="broadcastMessage" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                    id="broadcastMessage"
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Type your message here..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                />
            </div>
             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <strong>Instructions:</strong> Use your existing parent WhatsApp group or broadcast list. Then, use the button below to open WhatsApp and paste your message.
            </div>
             <div className="mt-6 flex justify-end space-x-3">
                <button 
                    onClick={() => setIsMessageModalOpen(false)}
                    className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                >
                    Cancel
                </button>
                <a 
                    href="https://web.whatsapp.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 inline-flex items-center"
                >
                    <WhatsAppIcon />
                    <span className="ml-2">Open WhatsApp</span>
                </a>
            </div>
          </div>
        </div>
      )}
      {/* Teacher Header */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-start">
            <div>
                <h2 className="text-2xl font-bold text-gray-800">Welcome, {teacher.name}</h2>
                <p className="font-arabic text-gray-500" dir="rtl">خوش آمدید، {teacher.name}</p>
            </div>
             <button 
                onClick={() => setIsMessageModalOpen(true)}
                className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center space-x-2"
            >
                <WhatsAppIcon />
                <span>Message Parents</span>
            </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4 text-center">
            <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-700">{students.length}</p>
                <p className="text-sm font-medium text-green-600">My Students (میرے طلبہ)</p>
            </div>
             <div className="p-4 bg-purple-50 rounded-lg cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setView('classes')}>
                <p className="text-2xl font-bold text-purple-700">{teacherClasses.length}</p>
                <p className="text-sm font-medium text-purple-600">My Classes (میری کلاسیں)</p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
                <p className="text-xl font-bold text-yellow-700">Upload</p>
                <p className="text-sm font-medium text-yellow-600">Course Material</p>
            </div>
             <div className="p-4 bg-indigo-50 rounded-lg cursor-pointer hover:shadow-lg transition-shadow">
                <p className="text-xl font-bold text-indigo-700">View</p>
                <p className="text-sm font-medium text-indigo-600">Gradebook</p>
            </div>
             <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-700">01</p>
                <p className="text-sm font-medium text-blue-600">Active Classes (فعال)</p>
            </div>
        </div>
      </div>

      {/* Student List for Attendance and Daily Record */}
      <div className="bg-white p-6 rounded-xl shadow-md">
         <h3 className="font-bold text-lg text-gray-800">Daily Attendance & Lesson Record</h3>
         <p className="font-arabic text-gray-500">روزانہ حاضری اور سبق کا ریکارڈ</p>
        <div className="mt-4 space-y-4">
          {studentData.map(student => (
            <div key={student.id} className="border border-gray-200 rounded-lg p-4 space-y-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                    <div className="flex items-center mb-4 sm:mb-0">
                        <img src={student.photoUrl} alt={student.name} className="w-12 h-12 rounded-full object-cover"/>
                        <div className="ml-4">
                            <p className="font-bold text-gray-800">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.class}</p>
                        </div>
                    </div>
                    {/* Attendance Controls */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full sm:w-auto">
                        {(Object.values(AttendanceStatus) as AttendanceStatus[]).map(status => (
                            <button 
                                key={status}
                                onClick={() => handleAttendanceChange(student.id, status)}
                                className={`px-3 py-2 text-xs font-semibold rounded-md transition-colors duration-200 ${
                                    attendance[student.id] === status 
                                    ? {
                                        [AttendanceStatus.Present]: 'bg-green-600 text-white',
                                        [AttendanceStatus.Absent]: 'bg-red-600 text-white',
                                        [AttendanceStatus.Leave]: 'bg-yellow-500 text-white',
                                        [AttendanceStatus.Late]: 'bg-blue-500 text-white',
                                      }[status]
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >{status}</button>
                        ))}
                    </div>
                </div>

                {/* Daily Lesson Inputs */}
                 <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 font-arabic">سبق</label>
                        <input type="text" defaultValue={student.dailyHifzProgress?.[0]?.sabak} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 font-arabic">سبقی</label>
                        <input type="text" defaultValue={student.dailyHifzProgress?.[0]?.sabqi} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700 font-arabic">منزل</label>
                        <input type="text" defaultValue={student.dailyHifzProgress?.[0]?.manzil} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm" />
                    </div>
                    <div className="md:col-span-4">
                        <label className="block text-sm font-medium text-gray-700">Remarks (تبصرہ)</label>
                        <input type="text" defaultValue={student.dailyHifzProgress?.[0]?.remarks} placeholder="Enter remarks..." className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm" />
                    </div>
                 </div>
                 <div className="flex justify-end">
                    <button className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">Save Record</button>
                 </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
  const renderClassesList = () => (
    <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
            <div>
                <h3 className="font-bold text-xl text-gray-800">My Classes</h3>
                <p className="font-arabic text-gray-500">میری کلاسیں</p>
            </div>
            <div className="flex items-center space-x-4">
                <button onClick={handleCreateClass} className="px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 flex items-center space-x-2">
                    <PlusIcon />
                    <span>Create New Class</span>
                </button>
                 <button onClick={() => setView('overview')} className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">
                    Back to Dashboard
                </button>
            </div>
        </div>
        <div className="space-y-4">
            {teacherClasses.map(cls => (
                <div key={cls.id} className="border rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                    <div>
                        <p className="font-bold text-gray-800">{cls.name}</p>
                        <p className="text-sm text-gray-500">{cls.periods.length} Periods Scheduled</p>
                    </div>
                    <button onClick={() => setSelectedClass(cls)} className="px-4 py-2 text-sm font-medium text-green-700 bg-green-100 rounded-md hover:bg-green-200 flex items-center space-x-2">
                        <span>Manage</span>
                        <ChevronRightIcon />
                    </button>
                </div>
            ))}
        </div>
    </div>
  );
  
  const renderClassDetails = () => {
    if (!selectedClass) return null;
    
    const allTaught = selectedClass.periods.every(p => p.isTaught);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="font-bold text-xl text-gray-800">{selectedClass.name}</h3>
                    <p className="font-arabic text-gray-500">کلاس کا شیڈول</p>
                </div>
                <div className="flex items-center space-x-4">
                     <button 
                        onClick={() => handleMarkAllTaught(selectedClass.id)}
                        disabled={allTaught}
                        className={`px-4 py-2 text-sm font-medium rounded-md flex items-center space-x-2 ${allTaught ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                     >
                        <CheckCircleIcon />
                        <span>Mark All Periods as Taught</span>
                    </button>
                    <button onClick={() => setSelectedClass(null)} className="px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-300">
                        Back to Classes
                    </button>
                </div>
            </div>
            
            <div className="border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period Name</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {selectedClass.periods.map(period => (
                            <tr key={period.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{period.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{period.time}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <label className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={period.isTaught}
                                            onChange={(e) => handlePeriodTaughtChange(selectedClass.id, period.id, e.target.checked)}
                                            className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                                        />
                                        <span className={`text-xs font-semibold ${period.isTaught ? 'text-green-800' : 'text-gray-600'}`}>
                                            {period.isTaught ? 'Taught' : 'Pending'}
                                        </span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
  };
  
  const renderContent = () => {
      if (view === 'classes') {
          return selectedClass ? renderClassDetails() : renderClassesList();
      }
      return renderOverview();
  }

  return renderContent();
};

const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 4.919 1.448-1.465 4.832z"/>
    </svg>
);
const PlusIcon = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const ChevronRightIcon = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>;
const CheckCircleIcon = () => <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default TeacherDashboard;