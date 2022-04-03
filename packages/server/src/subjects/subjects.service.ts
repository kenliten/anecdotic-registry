import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectsService {

  constructor(
    @InjectRepository(Subject)
    private subjectsRepository: Repository<Subject>
  ) {}

  async create(createSubjectDto: CreateSubjectDto): Promise<any> {
    await this.subjectsRepository.save(createSubjectDto);
  }

  findAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }

  findOne(id: number): Promise<Subject> {
    return this.subjectsRepository.findOne(id);
  }

  async update(id: number, updateSubjectDto: UpdateSubjectDto): Promise<any> {
    await this.subjectsRepository.update(id, updateSubjectDto);
  }

  async remove(id: number): Promise<any> {
    await this.subjectsRepository.delete(id);
  }
}
