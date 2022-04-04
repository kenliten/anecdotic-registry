export enum Grade {
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

export interface Section {
  id?: number;
  name: string;
  grade: Grade;
  level: Level;
}
