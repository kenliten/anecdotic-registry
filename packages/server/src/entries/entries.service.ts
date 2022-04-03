import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { Entry } from './entities/entry.entity';

@Injectable()
export class EntriesService {

  constructor(
    @InjectRepository(Entry)
    private entriesRepository: Repository<Entry>
  ) {}

  async create(createEntryDto: CreateEntryDto): Promise<any> {
    await this.entriesRepository.save(createEntryDto);
  }

  findAll(): Promise<Entry[]> {
    return this.entriesRepository.find();
  }

  findOne(id: number): Promise<Entry> {
    return this.entriesRepository.findOne(id);
  }

  async update(id: number, updateEntryDto: UpdateEntryDto): Promise<any> {
    await this.entriesRepository.update(id, updateEntryDto);
  }

  async remove(id: number): Promise<any> {
    await this.entriesRepository.delete(id);
  }
}
