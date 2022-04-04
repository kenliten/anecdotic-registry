import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum Status {
  ACTIVE,
  INACTIVE,
}

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  section: number;

  @Column()
  notes: string;
}
