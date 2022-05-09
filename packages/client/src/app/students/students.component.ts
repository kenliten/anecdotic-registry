import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  students: Student[] = [];
  sections: Section[] = [];
  entries: Entry[] = [];
  studentForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    section: [0],
    notes: [''],
  });

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private sectionService: SectionService,
    private entryService: EntryService,
  ) { }

  ngOnInit(): void {
    this.loadSections();
    this.loadStudents();
    this.loadEntries();
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(students => {
      this.students = students;
    });
  }

  loadSections() {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
      this.studentForm.get('section')?.setValue(sections[0]?.id);
    });
  }

  loadEntries() {
    this.entryService.getEntries().subscribe(entries => {
      this.entries = entries;
    });
  }

  studentsBySection(id?: number) {
    if (id) {
      return this.students.filter(s => s.section === id);
    } else {
      return [];
    }
  }

  saveStudent() {
    this.studentService.addStudent(this.studentForm.value).subscribe(_ => {
      if (_) {
        this.studentForm.get('firstname')?.setValue('');
        this.studentForm.get('lastname')?.setValue('');
        this.loadStudents();
      }
    });
  }

  deleteStudent(id?: number) {
    if (id) {
      this.studentService.deleteStudent(id).subscribe(_ => {
        this.loadStudents();
      });
    }
  }

  studentEntries(id?: number) {
    if (id) {
      return this.entries.filter(e => e.students.map(std => +std).includes(id)).length;
    } else {
      return 0;
    }
  }

}
