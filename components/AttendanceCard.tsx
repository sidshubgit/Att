
import React from 'react';
import { AttendanceStatus } from '../types';
import { CAMPUS_WIFI_IP, OFF_CAMPUS_IP } from '../constants';

interface AttendanceCardProps {
  status: AttendanceStatus;
  currentIp: string;
  onConnectToggle: () => void;
  studentId: string;
}

const StatusIndicator: React.FC<{ status: AttendanceStatus }> = ({ status }) => {
  const isPresent = status === AttendanceStatus.PRESENT;
  return (
    <div className="flex items-center gap-4">
        <span className={`relative flex h-4 w-4`}>
            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isPresent ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
            <span className={`relative inline-flex rounded-full h-4 w-4 ${isPresent ? 'bg-green-500' : 'bg-red-500'}`}></span>
        </span>
        <p className={`text-4xl font-bold ${isPresent ? 'text-green-400' : 'text-red-400'}`}>
            {status}
        </p>
    </div>
  );
};

export const AttendanceCard: React.FC<AttendanceCardProps> = ({ status, currentIp, onConnectToggle, studentId }) => {
  const isConnected = currentIp === CAMPUS_WIFI_IP;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg p-6 md:p-8 w-full max-w-2xl mx-auto border border-gray-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Attendance Status</h2>
          <p className="text-gray-400">Student ID: {studentId}</p>
        </div>
        <StatusIndicator status={status} />
      </div>

      <div className="bg-gray-900/50 p-4 rounded-lg mb-6">
        <div className="flex justify-between items-center text-sm mb-2">
            <span className="text-gray-400">Your Current IP:</span>
            <span className="font-mono text-white">{currentIp}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
            <span className="text-gray-400">Campus WiFi IP:</span>
            <span className="font-mono text-white">{CAMPUS_WIFI_IP}</span>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={onConnectToggle}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 transform hover:scale-105 ${isConnected ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
        >
          {isConnected ? 'Simulate Disconnect' : 'Simulate Connecting to Campus WiFi'}
        </button>
        <p className="text-xs text-gray-500 mt-3">This is a simulation for sandbox purposes.</p>
      </div>
    </div>
  );
};
