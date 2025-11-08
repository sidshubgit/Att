
export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
}

export enum AttendanceStatus {
  PRESENT = 'Present',
  ABSENT = 'Absent',
}
