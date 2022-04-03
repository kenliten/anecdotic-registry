import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Section } from './entities/section.entity';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';

@Injectable()
export class SectionsService {

  constructor(
    @InjectRepository(Section)
    private sectionsRepository: Repository<Section>
  ) {}

  async create(createSectionDto: CreateSectionDto): Promise<any> {
    await this.sectionsRepository.save(createSectionDto);
  }

  findAll(): Promise<Section[]> {
    return this.sectionsRepository.find();
  }

  findOne(id: number): Promise<Section> {
    return this.sectionsRepository.findOne(id);
  }

  async update(id: number, updateSectionDto: UpdateSectionDto): Promise<any> {
    await this.sectionsRepository.update(id, updateSectionDto);
  }

  async remove(id: number): Promise<any> {
    await this.sectionsRepository.delete(id);
  }
}
