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

export interface Entry {
  id?: number;
  date: Date;
  time: string;
  section: number;
  students: number[];
  place: string;
  entryType: EntryType;
  description: string;
  comments: string;
}
