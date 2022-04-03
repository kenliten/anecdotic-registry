import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentsService {

  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<any> {
    await this.studentsRepository.save(createStudentDto);
  }

  findAll(): Promise<Student[]> {
    return this.studentsRepository.find();
  }

  findOne(id: number): Promise<Student> {
    return this.studentsRepository.findOne(id);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<any> {
    await this.studentsRepository.update(id, updateStudentDto);
  }

  async remove(id: number): Promise<any> {
    await this.studentsRepository.delete(id);
  }
}
