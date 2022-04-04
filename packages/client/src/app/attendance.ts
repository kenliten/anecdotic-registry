export enum AttendanceType {
  PRESENT,
  LATE,
  JUSTIFIED,
  ABSENT,
};

export interface AttendanceEntry {
  student: number;
  attendanceType: AttendanceType;
};

export interface Attendance {
  id?: number;
  date: Date;
  section: number;
  attendanceEntries: AttendanceEntry[];
}
