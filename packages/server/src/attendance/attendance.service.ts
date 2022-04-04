import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAttendanceDto } from './dto/create-attendance.dto';
import { UpdateAttendanceDto } from './dto/update-attendance.dto';
import { Attendance } from './entities/attendance.entity';

@Injectable()
export class AttendanceService {

  constructor(
    @InjectRepository(Attendance)
    private attendanceRepository: Repository<Attendance>
  ) {}

  async create(createAttendanceDto: CreateAttendanceDto): Promise<any> {
    await this.attendanceRepository.save(createAttendanceDto);
  }

  findAll(): Promise<Attendance[]> {
    return this.attendanceRepository.find();
  }

  findOne(id: number): Promise<Attendance> {
    return this.attendanceRepository.findOne(id);
  }

  async update(id: number, updateAttendanceDto: UpdateAttendanceDto): Promise<any> {
    await this.attendanceRepository.update(id, updateAttendanceDto);
  }

  async remove(id: number): Promise<any> {
    await this.attendanceRepository.delete(id);
  }
}
