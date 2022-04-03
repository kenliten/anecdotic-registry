import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Grades {
  FIRST,
  SECOND,
  THIRD,
  FOURTH,
  FIFTH,
  SIXTH,
};

export enum Level {
  PRESCHOOL,
  ELEMENTARY,
  HIGHSCHOOL,
};

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: Grades,
    default: Grades.FIRST
  })
  grade: Grades;

  @Column({
    type: 'enum',
    enum: Level,
    default: Level.PRESCHOOL
  })
  level: Level;
}
