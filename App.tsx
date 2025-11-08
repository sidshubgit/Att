
import React, { useState, useEffect } from 'react';
import { LoginScreen } from './components/LoginScreen';
import { AttendanceCard } from './components/AttendanceCard';
import { ChatBot } from './components/ChatBot';
import { AttendanceStatus } from './types';
import { CAMPUS_WIFI_IP, OFF_CAMPUS_IP } from './constants';

function App() {
  const [studentId, setStudentId] = useState<string | null>(null);
  const [currentIp, setCurrentIp] = useState<string>(OFF_CAMPUS_IP);
  const [attendanceStatus, setAttendanceStatus] = useState<AttendanceStatus>(AttendanceStatus.ABSENT);

  useEffect(() => {
    if (currentIp === CAMPUS_WIFI_IP) {
      setAttendanceStatus(AttendanceStatus.PRESENT);
    } else {
      setAttendanceStatus(AttendanceStatus.ABSENT);
    }
  }, [currentIp]);

  const handleLogin = (id: string) => {
    setStudentId(id);
  };

  const handleLogout = () => {
    setStudentId(null);
    setCurrentIp(OFF_CAMPUS_IP);
  }

  const handleConnectToggle = () => {
    setCurrentIp(prevIp => prevIp === CAMPUS_WIFI_IP ? OFF_CAMPUS_IP : CAMPUS_WIFI_IP);
  };

  if (!studentId) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4 sm:p-6 lg:p-8">
        <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] [mask-image:linear-gradient(to_bottom,white_5%,transparent_100%)]"></div>
        <div className="relative z-10 container mx-auto">
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold">Student Dashboard</h1>
                <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    Log Out
                </button>
            </header>
            <main className="flex flex-col items-center gap-8">
                <AttendanceCard 
                    status={attendanceStatus}
                    currentIp={currentIp}
                    onConnectToggle={handleConnectToggle}
                    studentId={studentId}
                />
                <ChatBot />
            </main>
             <footer className="text-center text-gray-500 mt-12 text-sm">
                <p>Attendance Sandbox &copy; {new Date().getFullYear()}. All rights reserved.</p>
             </footer>
        </div>
    </div>
  );
}

export default App;
