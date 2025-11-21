import React, { useState } from 'react';

interface LoginPageProps {
    onLogin: (username: string, password: string) => void;
    onSwitchToSignup: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onSwitchToSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogin(username, password);
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
                    <h2 className="text-2xl font-bold text-center text-gray-800">Login to Your Account</h2>
                    <p className="text-center text-gray-500">Sign in to continue</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="text-sm font-bold text-gray-600 block">Username</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password-login" className="text-sm font-bold text-gray-600 block">Password</label>
                        <input
                            id="password-login"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 mt-1 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
                            Log In
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button onClick={onSwitchToSignup} className="font-bold text-green-600 hover:underline">
                        Register Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
