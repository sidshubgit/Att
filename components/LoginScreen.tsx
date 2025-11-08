
import React, { useState } from 'react';
import { UserIcon } from './Icons';

interface LoginScreenProps {
  onLogin: (studentId: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [studentId, setStudentId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim()) {
      onLogin(studentId.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-gray-700 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Attendance Sandbox</h1>
        <p className="text-gray-400 mb-8">Please enter your Student ID to begin.</p>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <UserIcon className="w-5 h-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              placeholder="e.g., 11782"
              className="w-full bg-gray-700 border border-gray-600 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={!studentId.trim()}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold disabled:bg-gray-500 disabled:cursor-not-allowed hover:bg-indigo-500 transition-colors duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};
