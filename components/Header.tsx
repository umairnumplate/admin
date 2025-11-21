import React, { useState } from 'react';
import { User } from '../types';

interface HeaderProps {
    user: User | null;
    onLogout: () => void;
    onMenuClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onMenuClick }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleNotificationClick = () => {
    if (!('Notification' in window)) {
      alert('This browser does not support desktop notification');
      return;
    }

    if (Notification.permission === 'granted') {
      new Notification('Noor-ul-Masajid Update', {
        body: 'You have a new message or update!',
        icon: '/logo192.png'
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Welcome!', {
            body: 'Notifications have been enabled successfully.',
            icon: '/logo192.png'
          });
        }
      });
    }
  };
  
  const getTitle = () => {
    switch(user?.role) {
      case 'admin':
        return { main: 'Admin Dashboard', urdu: 'ایڈمن ڈیش بورڈ' };
      case 'teacher':
        return { main: 'Teacher Portal', urdu: 'استاد پورٹل' };
      case 'student':
        return { main: 'Student Portal', urdu: 'طالب علم پورٹل' };
      default:
        return { main: 'Dashboard', urdu: 'ڈیش بورڈ'};
    }
  }

  const { main: title, urdu: urduTitle } = getTitle();

  return (
    <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8 flex-shrink-0">
      <div className="flex items-center">
         {user?.role === 'admin' && (
           <button onClick={onMenuClick} className="md:hidden mr-4 text-gray-500 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
         )}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{title}</h1>
          <p className="font-arabic text-md sm:text-lg text-gray-500" dir="rtl">{urduTitle}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-6">
        <button onClick={handleNotificationClick} className="relative p-2 text-gray-500 hover:text-green-600 focus:outline-none">
          <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span className="absolute top-0 right-0 h-2 w-2 mt-1 mr-1 bg-red-500 rounded-full"></span>
        </button>
        <div className="relative">
            <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-2">
                <img className="h-10 w-10 rounded-full object-cover" src={`https://picsum.photos/seed/${user?.username}/200/200`} alt={user?.name}/>
                <div className="hidden md:block text-left">
                    <p className="text-sm font-semibold text-gray-800">{user?.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                </div>
            </button>
            {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
      </div>
    </header>
  );
};

export default Header;
