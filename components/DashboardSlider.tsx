import React, { useState, useEffect } from 'react';
import { MOCK_STUDENTS } from '../constants';
import { Student } from '../types';

// Fix: Define explicit types for announcements and slides to enable type narrowing.
// This resolves errors where properties were accessed on a union type.
interface Announcement {
    title: string;
    urdu: string;
    date: string;
    type: string;
}

interface AnnouncementSlide {
    type: 'announcement';
    data: Announcement;
}

interface StudentSlide {
    type: 'student';
    data: Student;
}

type Slide = AnnouncementSlide | StudentSlide;

const announcements: Announcement[] = [
    { title: 'Annual Exams Schedule', urdu: 'سالانہ امتحانات کا شیڈول', date: 'Oct 25, 2023', type: 'Exam' },
    { title: 'Parent-Teacher Meeting', urdu: 'والدین-اساتذہ میٹنگ', date: 'Oct 22, 2023', type: 'Event' },
    { title: 'Fee Submission Deadline', urdu: 'فیس جمع کرانے کی آخری تاریخ', date: 'Oct 20, 2023', type: 'Fee' },
];

interface DashboardSliderProps {
  onSelectStudent: (student: Student) => void;
}

const DashboardSlider: React.FC<DashboardSliderProps> = ({ onSelectStudent }) => {
    const topStudents = MOCK_STUDENTS.slice(0, 2); // Get top 2 students for slider
    // Fix: Explicitly type the slides array and the items within it.
    // This allows TypeScript to correctly infer the type of `slide.data` within the conditional rendering blocks.
    const slides: Slide[] = [
        ...announcements.map((item): AnnouncementSlide => ({ type: 'announcement', data: item })),
        ...topStudents.map((student): StudentSlide => ({ type: 'student', data: student })),
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds
        return () => clearInterval(interval);
    }, [slides.length]);

    const getIcon = (type: string) => {
        switch (type) {
            case 'Exam': return <AcademicCapIcon className="h-8 w-8 text-red-600" />;
            case 'Event': return <CalendarIcon className="h-8 w-8 text-blue-600" />;
            case 'Fee': return <CurrencyDollarIcon className="h-8 w-8 text-yellow-600" />;
            default: return null;
        }
    };
    
    const getIconBg = (type: string) => {
        switch (type) {
            case 'Exam': return 'bg-red-100';
            case 'Event': return 'bg-blue-100';
            case 'Fee': return 'bg-yellow-100';
            default: return 'bg-gray-100';
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col">
            <h3 className="font-bold text-lg text-gray-800">Updates & Highlights</h3>
            <p className="font-arabic text-gray-500">اپڈیٹس اور جھلکیاں</p>
            <div className="flex-grow flex items-center justify-center mt-4 relative overflow-hidden min-h-[250px]">
                {slides.map((slide, index) => (
                     <div key={index} className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-700 ease-in-out ${index === currentIndex ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                        {slide.type === 'announcement' && (
                            <div className="flex flex-col items-center justify-center h-full text-center p-4">
                                <div className={`flex-shrink-0 w-20 h-20 rounded-full flex items-center justify-center ${getIconBg(slide.data.type)}`}>
                                    {getIcon(slide.data.type)}
                                </div>
                                <p className="mt-4 font-bold text-xl text-gray-800">{slide.data.title}</p>
                                <p className="font-arabic text-gray-600">{slide.data.urdu}</p>
                                <p className="text-sm text-gray-500 mt-2">{slide.data.date}</p>
                            </div>
                        )}
                        {slide.type === 'student' && (
                            <div onClick={() => onSelectStudent(slide.data)} className="flex flex-col items-center justify-center h-full text-center cursor-pointer p-4">
                                <p className="absolute top-0 right-0 bg-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">Top Performer</p>
                                <img src={slide.data.photoUrl} alt={slide.data.name} className="w-28 h-28 rounded-full object-cover border-4 border-green-200"/>
                                <p className="mt-4 font-bold text-xl text-gray-800">{slide.data.name}</p>
                                <p className="text-gray-600 text-sm">{slide.data.class}</p>
                                <p className="font-semibold text-2xl text-green-600 mt-2">{slide.data.department === 'Hifz-ul-Quran' ? `${slide.data.hifzRecord?.performance}%` : '88%'}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
             <div className="flex justify-center space-x-2 mt-4">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-green-600' : 'bg-gray-300 hover:bg-gray-400'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

// Icons
const AcademicCapIcon = ({ className = 'h-6 w-6' }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 14l9-5-9-5-9 5 9 5z" /><path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222 4 2.222V20M1 12l5.318-2.954A11.978 11.978 0 0112 8.016a11.978 11.978 0 015.682 1.03L23 12" /></svg>;
const CalendarIcon = ({ className = 'h-6 w-6' }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const CurrencyDollarIcon = ({ className = 'h-6 w-6' }) => <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 12v.01M12 12c-1.657 0-3-.895-3-2s1.343 2 3 2m0 8c1.11 0 2.08-.402 2.599-1M12 16v-1m0 1v.01M12 12c-1.657 0-3 .895-3 2s1.343 2 3 2m-3 7h6m-6 0a2 2 0 100 4 2 2 0 000-4zm18-12a2 2 0 100 4 2 2 0 000-4z" /></svg>;

export default DashboardSlider;