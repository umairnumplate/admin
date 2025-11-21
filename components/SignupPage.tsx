import React, { useState } from 'react';

interface SignupPageProps {
    onSignup: (name: string, username: string, password: string, role: 'student' | 'teacher', phone: string) => void;
    onSwitchToLogin: () => void;
}

const SignupPage: React.FC<SignupPageProps> = ({ onSignup, onSwitchToLogin }) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('student');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSignup(name, username, password, role, phone);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center font-sans">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-green-700">Noor-ul-Masajid</h1>
                <p className="font-arabic text-2xl text-green-600 mt-1">نور المساجد</p>
                <p className="text-gray-500 mt-2">Islamic Education Management System</p>
            </div>
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
                    <p className="text-center text-gray-500">Join our community</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm font-bold text-gray-600 block">Full Name</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="username-signup" className="text-sm font-bold text-gray-600 block">Username</label>
                        <input
                            id="username-signup"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="phone" className="text-sm font-bold text-gray-600 block">Phone Number</label>
                        <input 
                            id="phone" 
                            type="tel" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder="+923001234567" 
                            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" 
                            required 
                        />
                    </div>
                    <div>
                        <label htmlFor="password-signup" className="text-sm font-bold text-gray-600 block">Password</label>
                        <input
                            id="password-signup"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="role" className="text-sm font-bold text-gray-600 block">Register as</label>
                        <select
                            id="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value as 'student' | 'teacher')}
                            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button onClick={onSwitchToLogin} className="font-bold text-green-600 hover:underline">
                        Log In
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;