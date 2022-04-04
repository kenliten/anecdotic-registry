import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum SubjectEnum {
  SPANISH,
  ENGLISH,
  FRENCH,
  MATH,
  HISTORY,
  SCIENCE,
  ART,
  SPORTS,
  RELIGION,
  WORKSHOP,
};

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  section: number;

  @Column({
    type: 'enum',
    enum: SubjectEnum,
    default: SubjectEnum.SPANISH
  })
  subject: SubjectEnum;
}
