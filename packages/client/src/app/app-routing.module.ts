import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EntriesComponent } from './entries/entries.component';
import { EntryComponent } from './entry/entry.component';
import { EntryFormComponent } from './entry-form/entry-form.component';

import { SectionsComponent } from './sections/sections.component';
import { SectionComponent } from './section/section.component';
import { SectionFormComponent } from './section-form/section-form.component';

import { StudentsComponent } from './students/students.component';
import { StudentComponent } from './student/student.component';
import { StudentFormComponent } from './student-form/student-form.component';

import { SubjectsComponent } from './subjects/subjects.component';
import { SubjectComponent } from './subject/subject.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';

import { AttendanceComponent } from './attendance/attendance.component';
import { AttendanceListComponent } from './attendance-list/attendance-list.component';
import { AttendanceFormComponent } from './attendance-form/attendance-form.component';

const routes: Routes = [
  { path: 'entries', component: EntriesComponent },
  { path: 'entries/new', component: EntryFormComponent },
  { path: 'entries/:id', component: EntryComponent },
  { path: 'entries/:id/edit', component: EntryFormComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'sections/new', component: SectionFormComponent },
  { path: 'sections/:id', component: SectionComponent },
  { path: 'sections/:id/edit', component: SectionFormComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/:id', component: StudentComponent },
  { path: 'students/:id/edit', component: StudentFormComponent },
  { path: 'subjects', component: SubjectsComponent },
  { path: 'subjects/new', component: SubjectFormComponent },
  { path: 'subjects/:id', component: SubjectComponent },
  { path: 'subjects/:id/edit', component: SubjectFormComponent },
  { path: 'attendance', component: AttendanceListComponent },
  { path: 'attendance/:id', component: AttendanceComponent },
  { path: '', redirectTo: '/entries', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
