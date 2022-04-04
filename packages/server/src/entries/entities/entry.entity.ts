import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum EntryType {
  ACCIDENT,
  PROBLEM,
  FACT,
  SITUATION,
}

export enum Place {
  CLASSROOM,
  AISLE,
  GARDEN,
  PRINCIPAL_OFFICE,
  ORIENTATION_OFFICE,
  NURSERY,
  SCIENCE_LAB,
  TECH_LAB,
  DINING_ROOM,
  BATHROOM,
  MAIN_DOOR,
  COURT,
}

@Entity()
export class Entry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  time: string;

  @Column()
  section: number;

  @Column('simple-array')
  students: number[];

  // @Column({
  //   type: 'enum',
  //   enum: Place,
  //   default: Place.CLASSROOM
  // })
  @Column()
  place: string;

  @Column({
    type: 'enum',
    enum: EntryType,
    default: EntryType.ACCIDENT,
  })
  entryType: EntryType;

  @Column()
  description: string;

  @Column()
  comments: string;
}
