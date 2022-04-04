import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

@Entity()
export class Attendance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  section: number;

  @Column('simple-json')
  attendanceEntries: AttendanceEntry[];
}
