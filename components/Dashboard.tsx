import React, { useState } from 'react';
import { MOCK_STUDENTS } from '../constants';
import { Student } from '../types';
import DashboardSlider from './DashboardSlider';

interface StatCardProps {
  title: string;
  urduTitle: string;
  value: string;
  icon: React.ReactNode;
  color: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({ title, urduTitle, value, icon, color, onClick }) => (
  <div className={`bg-white p-6 rounded-xl shadow-md flex items-center justify-between ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''}`} onClick={onClick}>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-xs font-arabic text-gray-400">{urduTitle}</p>
      <p className="text-3xl font-bold text-gray-800 mt-1">{value}</p>
    </div>
    <div className={`p-4 rounded-full ${color}`}>
      {icon}
    </div>
  </div>
);

interface DashboardProps {
  onSelectStudent: (student: Student) => void;
}


const Dashboard: React.FC<DashboardProps> = ({ onSelectStudent }) => {
  const [department, setDepartment] = useState<'Hifz-ul-Quran' | 'Dars-e-Nizami'>('Hifz-ul-Quran');
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const hifzStudentsCount = MOCK_STUDENTS.filter(s => s.department === 'Hifz-ul-Quran').length;
  const darsNizamiStudentsCount = MOCK_STUDENTS.filter(s => s.department === 'Dars-e-Nizami').length;
  const totalStudentsCount = MOCK_STUDENTS.length;
  const feesDueCount = MOCK_STUDENTS.filter(s => s.fees.status === 'Unpaid' || s.fees.status === 'Partial').length;
  
  return (
    <div className="space-y-8">
       {isMessageModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-lg relative">
            <button onClick={() => setIsMessageModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="font-bold text-lg text-gray-800">Broadcast to All Parents</h3>
            <p className="font-arabic text-gray-500">تمام والدین کو پیغام بھیجیں</p>
            <div className="mt-4">
                <label htmlFor="broadcastMessage" className="block text-sm font-medium text-gray-700">Message</label>
                <textarea 
                    id="broadcastMessage"
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                    placeholder="Type your announcement here..."
                    value={broadcastMessage}
                    onChange={(e) => setBroadcastMessage(e.target.value)}
                />
            </div>
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
                <strong>Instructions:</strong> Create a WhatsApp group or broadcast list for parents. Then, use the button below to open WhatsApp and paste your message.
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

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Students" urduTitle="کل طلبہ" value={totalStudentsCount.toString()} color="bg-blue-100 text-blue-600" icon={<UsersIcon />} />
        <StatCard title="Hifz Students" urduTitle="حفظِ قرآن طلبہ" value={hifzStudentsCount.toString()} color="bg-purple-100 text-purple-600" icon={<BookOpenIcon />} />
        <StatCard title="Dars-e-Nizami" urduTitle="درسِ نظامی طلبہ" value={darsNizamiStudentsCount.toString()} color="bg-teal-100 text-teal-600" icon={<AcademicCapIcon className="h-6 w-6"/>} />
        <StatCard title="Fees Due" urduTitle="واجب الادا فیس" value={feesDueCount.toString()} color="bg-orange-100 text-orange-600" icon={<CreditCardIcon />} />
        <StatCard title="Total Teachers" urduTitle="کل اساتذہ" value="22" color="bg-green-100 text-green-600" icon={<BriefcaseIcon />} />
        <StatCard title="Total Classes" urduTitle="کل کلاسز" value="15" color="bg-yellow-100 text-yellow-600" icon={<CollectionIcon />} />
        <StatCard title="Today's Attendance" urduTitle="آج کی حاضری" value="95%" color="bg-indigo-100 text-indigo-600" icon={<ClipboardCheckIcon />} />
        <StatCard 
            title="Broadcast Message" 
            urduTitle="براڈکاسٹ پیغام" 
            value="Send" 
            color="bg-red-100 text-red-600" 
            icon={<ChatAlt2Icon />} 
            onClick={() => setIsMessageModalOpen(true)}
        />
      </div>

      {/* New layout with Admission Form and Slider */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 bg-white p-6 rounded-xl shadow-md">
            <h3 className="font-bold text-lg text-gray-800">New Student Admission</h3>
            <p className="font-arabic text-gray-500">نئے طالب علم کا داخلہ</p>
            <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">Name <span className="font-arabic">(نام)</span></label>
                        <input type="text" id="studentName" placeholder="Abdullah Khan" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="fatherName" className="block text-sm font-medium text-gray-700">Father's Name <span className="font-arabic">(والد کا نام)</span></label>
                        <input type="text" id="fatherName" placeholder="Ahmed Khan" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone No <span className="font-arabic">(فون نمبر)</span></label>
                        <input type="tel" id="phone" placeholder="+92 300 1234567" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">Department / Shoba <span className="font-arabic">(شعبہ)</span></label>
                        <div className="mt-2 flex items-center space-x-6">
                            <div className="flex items-center">
                                <input id="hifz" name="department" type="radio" checked={department === 'Hifz-ul-Quran'} onChange={() => setDepartment('Hifz-ul-Quran')} className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300" />
                                <label htmlFor="hifz" className="ml-2 block text-sm text-gray-900">
                                    Hifz-e-Quran <span className="font-arabic text-xs">(حفظِ قرآن)</span>
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input id="dars" name="department" type="radio" checked={department === 'Dars-e-Nizami'} onChange={() => setDepartment('Dars-e-Nizami')} className="focus:ring-green-500 h-4 w-4 text-green-600 border-gray-300" />
                                <label htmlFor="dars" className="ml-2 block text-sm text-gray-900">
                                    Dars-e-Nizami <span className="font-arabic text-xs">(درسِ نظامی)</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                {department === 'Hifz-ul-Quran' && (
                    <div className="pt-4 border-t border-gray-200">
                        <h4 className="text-sm font-semibold text-gray-800">Initial Hifz Record</h4>
                        <p className="font-arabic text-xs text-gray-500">ابتدائی حفظ ریکارڈ</p>
                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="sabak" className="block text-sm font-medium text-gray-700">Daily Sabak <span className="font-arabic">(سبق)</span></label>
                                <input type="text" id="sabak" placeholder="Surah Al-Baqarah (1-5)" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="sabqi" className="block text-sm font-medium text-gray-700">Sabqi <span className="font-arabic">(سبقی)</span></label>
                                <input type="text" id="sabqi" placeholder="Surah Al-Fatiha" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                            </div>
                            <div>
                                <label htmlFor="manzil" className="block text-sm font-medium text-gray-700">Manzil <span className="font-arabic">(منزل)</span></label>
                                <input type="text" id="manzil" placeholder="Juz 30" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="teacherComments" className="block text-sm font-medium text-gray-700">Teacher Comments <span className="font-arabic">(استاذ کا تبصرہ)</span></label>
                            <textarea id="teacherComments" rows={2} placeholder="Initial assessment notes..." className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                        </div>
                    </div>
                )}

                 <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address <span className="font-arabic">(پتہ)</span></label>
                    <textarea id="address" rows={2} placeholder="House #123, Street 4, Islamabad" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"></textarea>
                </div>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="fatherCnic" className="block text-sm font-medium text-gray-700">Father's CNIC <span className="font-arabic">(والد کا شناختی کارڈ نمبر)</span></label>
                        <input type="text" id="fatherCnic" placeholder="37405-1234567-8" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                    </div>
                    <div>
                        <label htmlFor="studentCnic" className="block text-sm font-medium text-gray-700">Student's CNIC / B-Form <span className="font-arabic">(طالب علم کا شناختی کارڈ نمبر)</span></label>
                        <input type="text" id="studentCnic" placeholder="37405-9876543-2" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm" />
                    </div>
                </div>
                <div>
                     <label className="block text-sm font-medium text-gray-700">Profile Picture <span className="font-arabic">(پروفائل تصویر)</span></label>
                    <div className="mt-1 flex items-center">
                        <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </span>
                        <input type="file" className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 w-full md:w-auto"/>
                    </div>
                </div>
                <div className="pt-2">
                    <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        Register Student
                    </button>
                </div>
            </form>
        </div>
        <div className="lg:col-span-2">
          <DashboardSlider onSelectStudent={onSelectStudent} />
        </div>
      </div>
    </div>
  );
};

// Icons used in this component
const UsersIcon = () => <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const BriefcaseIcon = () => <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const CollectionIcon = () => <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const ClipboardCheckIcon = () => <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const AcademicCapIcon = ({ className = 'h-6 w-6' }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12l5.318-2.954A11.978 11.978 0 0112 8.016a11.978 11.978 0 015.682 1.03L23 12" /></svg>;
const BookOpenIcon = ({ className = 'h-6 w-6' }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const ChatAlt2Icon = () => <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a2 2 0 01-2-2V7a2 2 0 012-2h6l2-2h2l-2 2zM7 8H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l4-4h2a2 2 0 002-2V9a2 2 0 00-2-2h-1l-2-2H9L7 8z" /></svg>;
const CreditCardIcon = () => <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>;
const WhatsAppIcon = () => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 4.919 1.448-1.465 4.832z"/>
    </svg>
);


export default Dashboard;