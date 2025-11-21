import React from 'react';
import { MOCK_USERS, MOCK_CLASSES } from '../constants';
import { User, ClassSchedule } from '../types';

const Reports: React.FC = () => {
    const teachers = MOCK_USERS.filter(user => user.role === 'teacher');

    const getTeacherClasses = (teacherId: number): ClassSchedule[] => {
        return MOCK_CLASSES.filter(cls => cls.teacherId === teacherId);
    };

    return (
        <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
                <h2 className="text-2xl font-bold text-gray-800">Teacher Activity Report</h2>
                <p className="font-arabic text-gray-500">استاد کی سرگرمی کی رپورٹ</p>
            </div>

            <div className="space-y-6">
                {teachers.map(teacher => (
                    <div key={teacher.id} className="bg-white p-6 rounded-xl shadow-md">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">{teacher.name}</h3>
                        <div className="space-y-4">
                            {getTeacherClasses(teacher.id).length > 0 ? (
                                getTeacherClasses(teacher.id).map(cls => {
                                    const taughtPeriods = cls.periods.filter(p => p.isTaught).length;
                                    const totalPeriods = cls.periods.length;
                                    const completionPercentage = totalPeriods > 0 ? (taughtPeriods / totalPeriods) * 100 : 0;

                                    return (
                                        <div key={cls.id} className="border rounded-lg p-4">
                                            <div className="flex justify-between items-center">
                                                <p className="font-semibold text-gray-700">{cls.name}</p>
                                                <p className="text-sm font-medium text-gray-600">
                                                    {taughtPeriods} / {totalPeriods} Periods Taught
                                                </p>
                                            </div>
                                            <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
                                                <div
                                                    className="bg-green-600 h-2.5 rounded-full"
                                                    style={{ width: `${completionPercentage}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <p className="text-gray-500">No classes assigned to this teacher.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reports;
