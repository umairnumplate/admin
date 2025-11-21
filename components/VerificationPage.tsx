import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface VerificationPageProps {
    user: User | null;
    onVerify: (code: string) => void;
    onBack: () => void;
}

const WhatsAppIcon = () => (
    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 4.315 1.731 6.086l.001.004 4.919 1.448-1.465 4.832z"/>
    </svg>
);


const VerificationPage: React.FC<VerificationPageProps> = ({ user, onVerify, onBack }) => {
    const [code, setCode] = useState('');
    const [showNotification, setShowNotification] = useState(false);

    const MOCK_OTP = '123456';

    const maskPhoneNumber = (phone: string | undefined) => {
        if (!phone || phone.length < 7) return 'your phone';
        return `${phone.substring(0, 3)}...${phone.substring(phone.length - 4)}`;
    };

    const handleSendCode = () => {
        console.log(`[WhatsApp Simulation] Verification code for ${user?.username}: ${MOCK_OTP}`);
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 4000); // Increased duration for better visibility
    };

    useEffect(() => {
        handleSendCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onVerify(code);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center font-sans relative overflow-hidden">
             {showNotification && (
                <div className="absolute top-5 bg-green-600 text-white py-3 px-5 rounded-lg shadow-lg flex items-center animate-bounce z-50">
                    <WhatsAppIcon />
                    <span>Code sent via WhatsApp! Check console. ({MOCK_OTP})</span>
                </div>
            )}
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-green-700">Noor-ul-Masajid</h1>
                <p className="font-arabic text-2xl text-green-600 mt-1">نور المساجد</p>
            </div>
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8 space-y-6">
                <div className="flex flex-col items-center text-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                        <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">WhatsApp Verification</h2>
                    <p className="text-gray-500 mt-2">
                        Enter the 6-digit code sent to your WhatsApp number: <span className="font-medium text-gray-700">{maskPhoneNumber(user?.phone)}</span>.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="code" className="sr-only">Verification Code</label>
                        <input
                            id="code"
                            type="tel" // Use tel for numeric input on mobile
                            inputMode='numeric'
                            value={code}
                            onChange={(e) => setCode(e.target.value.replace(/[^0-9]/g, ''))} // Allow only numbers
                            className="w-full p-4 text-2xl text-center tracking-[0.5em] bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            maxLength={6}
                            placeholder="------"
                            required
                        />
                    </div>
                    <div>
                        <button type="submit" className="w-full py-3 font-bold text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300">
                            Verify Account
                        </button>
                    </div>
                </form>
                <div className="text-center text-sm text-gray-600">
                    Didn't receive a code?{' '}
                    <button onClick={handleSendCode} className="font-bold text-green-600 hover:underline">
                        Resend
                    </button>
                </div>
                 <div className="text-center mt-4">
                    <button onClick={onBack} className="text-sm text-gray-500 hover:underline">
                        &larr; Back to Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerificationPage;