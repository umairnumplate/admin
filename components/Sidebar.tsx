import React from 'react';
import { MOCK_STUDENTS } from '../constants';
import { Student } from '../types';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string, student?: Student) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate, isOpen, setIsOpen }) => {
  const navItems = [
    { id: 'dashboard', name: 'Dashboard', urdu: 'ڈیش بورڈ', icon: <HomeIcon /> },
    { id: 'userManagement', name: 'User Management', urdu: 'صارفین کا انتظام', icon: <UsersIcon /> },
    { id: 'classes', name: 'Classes', urdu: 'کلاس مینجمنٹ', icon: <CollectionIcon /> },
    { id: 'attendance', name: 'Attendance', urdu: 'حاضری', icon: <ClipboardCheckIcon /> },
    { id: 'fees', name: 'Fees', urdu: 'فیس مینجمنٹ', icon: <CurrencyDollarIcon /> },
    { id: 'exams', name: 'Exams', urdu: 'امتحانات', icon: <AcademicCapIcon /> },
    { id: 'reports', name: 'Reports', urdu: 'رپورٹس', icon: <ChartBarIcon /> },
    { id: 'library', name: 'Library', urdu: 'کُتب خانہ', icon: <BookOpenIcon /> },
  ];
  
  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white text-gray-800 flex flex-col border-r border-gray-200 shadow-lg z-30 transform transition-transform duration-300 ease-in-out md:relative md:flex md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="h-20 flex items-center justify-between px-4 border-b border-gray-200 flex-shrink-0">
        <div className="text-center w-full md:w-auto">
            <h1 className="text-2xl font-bold text-green-700">Noor-ul-Masajid</h1>
            <p className="font-arabic text-sm text-green-600">نور المساجد</p>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden p-2 -mr-2 text-gray-500 hover:text-gray-800">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href="#"
            onClick={(e) => { e.preventDefault(); onNavigate(item.id); }}
            className={`flex items-center p-3 rounded-lg transition-all duration-200 ${
              activeView === item.id
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
            }`}
          >
            <div className="w-6 h-6 mr-3">{item.icon}</div>
            <span className="font-medium">{item.name}</span>
            <span className="font-arabic ml-auto text-sm">{item.urdu}</span>
          </a>
        ))}
         <div className="pt-4 border-t border-gray-200">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Student Profiles</h3>
            <div className="mt-2 space-y-1">
                 <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('studentProfile', MOCK_STUDENTS[0]); }} className={`flex items-center p-3 rounded-lg transition-all duration-200 ${activeView === 'studentProfile' ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'}`}>
                    <img src={MOCK_STUDENTS[0].photoUrl} alt={MOCK_STUDENTS[0].name} className="w-8 h-8 rounded-full mr-3"/>
                    <span className="font-medium text-sm">{MOCK_STUDENTS[0].name}</span>
                 </a>
            </div>
        </div>
      </nav>
    </div>
  );
};

// SVG Icons
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.122-1.28-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.122-1.28.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const ClipboardCheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>;
const CollectionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>;
const CurrencyDollarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 12v.01M12 12c-1.657 0-3-.895-3-2s1.343 2 3 2m0 8c1.11 0 2.08-.402 2.599-1M12 16v-1m0 1v.01M12 12c-1.657 0-3 .895-3 2s1.343 2 3 2m-3 7h6m-6 0a2 2 0 100 4 2 2 0 000-4zm18-12a2 2 0 100 4 2 2 0 000-4z" /></svg>;
const AcademicCapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12l5.318-2.954A11.978 11.978 0 0112 8.016a11.978 11.978 0 015.682 1.03L23 12" /></svg>;
const BookOpenIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>;
const ChartBarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>


export default Sidebar;
