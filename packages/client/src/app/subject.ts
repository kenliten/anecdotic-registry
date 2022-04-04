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

export interface Subject {
  id?: number;
  section: number;
  subject: SubjectEnum;
}
