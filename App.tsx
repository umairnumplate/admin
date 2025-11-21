import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import StudentProfile from './components/StudentProfile';
import Header from './components/Header';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import VerificationPage from './components/VerificationPage';
import Reports from './components/Reports';
import { MOCK_STUDENTS, MOCK_TEACHER, MOCK_USERS } from './constants';
import { Student, User } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(MOCK_STUDENTS[0]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // New auth state management
  const [authStatus, setAuthStatus] = useState<'login' | 'signup' | 'verify' | 'app'>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [pendingUser, setPendingUser] = useState<User | null>(null);

  const MOCK_OTP = '123456';

  const handleLogin = (username: string, password: string) => {
    const user = MOCK_USERS.find(u => u.username === username);
    if (user && user.password === password) {
      setPendingUser(user);
      setAuthStatus('verify');
    } else {
      alert('Invalid credentials');
    }
  };

  const handleSignup = (name: string, username: string, password: string, role: 'student' | 'teacher', phone: string) => {
    if (MOCK_USERS.some(u => u.username === username)) {
      alert('Username already exists. Please choose a different one.');
      return;
    }
    const newUser: User = { id: MOCK_USERS.length + 1, name, username, role, password, phone };
    setPendingUser(newUser);
    setAuthStatus('verify');
  };

  const handleVerification = (code: string) => {
    if (code === MOCK_OTP) {
        if (!pendingUser) return; // Should not happen

        // If it's a new user from signup, add them to the main list
        const isNewUser = !MOCK_USERS.some(u => u.username === pendingUser.username);
        if (isNewUser) {
            MOCK_USERS.push(pendingUser);
             alert(`Registration successful! You are now logged in as a ${pendingUser.role}.`);
        }
        
        setCurrentUser(pendingUser);
        setPendingUser(null);
        setAuthStatus('app');

    } else {
        alert('Invalid verification code.');
    }
  };


  const handleLogout = () => {
    setCurrentUser(null);
    setAuthStatus('login');
  };

  const handleNavigate = (view: string, student?: Student) => {
    setActiveView(view);
    if (student) {
      setSelectedStudent(student);
    }
    setIsSidebarOpen(false);
  };

  const role = currentUser?.role;

  const renderAdminContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard onSelectStudent={(student) => handleNavigate('studentProfile', student)} />;
      case 'studentProfile':
        return selectedStudent ? <StudentProfile student={selectedStudent} /> : <Dashboard onSelectStudent={(student) => handleNavigate('studentProfile', student)} />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard onSelectStudent={(student) => handleNavigate('studentProfile', student)} />;
    }
  };

  const teacherStudents = MOCK_STUDENTS.filter(s => s.teacherId === MOCK_TEACHER.id && s.department === 'Hifz-ul-Quran');
  // Find a student that matches the current logged-in user's name, or default to the first student.
  const loggedInStudent = MOCK_STUDENTS.find(s => s.name === currentUser?.name) || MOCK_STUDENTS[0]; 

  const renderContent = () => {
    switch (role) {
      case 'admin':
        return renderAdminContent();
      case 'teacher':
        return <TeacherDashboard teacher={MOCK_TEACHER} students={teacherStudents} />;
      case 'student':
        return <StudentDashboard student={loggedInStudent} teacher={MOCK_TEACHER} />;
      default:
        return <div>Invalid Role</div>;
    }
  };

  if (authStatus === 'login') {
    return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setAuthStatus('signup')} />;
  }

  if (authStatus === 'signup') {
    return <SignupPage onSignup={handleSignup} onSwitchToLogin={() => setAuthStatus('login')} />;
  }

  if (authStatus === 'verify') {
    return <VerificationPage user={pendingUser} onVerify={handleVerification} onBack={() => setAuthStatus('login')} />;
  }


  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-hidden relative">
      {role === 'admin' && (
        <>
          <Sidebar 
            activeView={activeView} 
            onNavigate={handleNavigate} 
            isOpen={isSidebarOpen}
            setIsOpen={setIsSidebarOpen}
          />
          {isSidebarOpen && (
            <div 
              className="fixed inset-0 bg-black opacity-50 z-20 md:hidden"
              onClick={() => setIsSidebarOpen(false)}
            ></div>
          )}
        </>
      )}

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          user={currentUser}
          onLogout={handleLogout}
          onMenuClick={() => setIsSidebarOpen(true)} 
        />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;