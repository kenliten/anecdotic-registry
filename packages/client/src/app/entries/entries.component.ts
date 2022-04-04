import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss']
})
export class EntriesComponent implements OnInit {

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
      this.loadStudents();
      this.studentForm.reset();
    });
  }

  deleteEntry(id?: number) {
    if (id) {
      this.entryService.deleteEntry(id).subscribe(_ => {
        this.loadEntries();
      });
    }
  }

  studentEntries(id?: number) {
    if (id) {
      return this.entries.filter(e => e.students.map(s => +s).includes(id)).length;
    } else {
      return 0;
    }
  }

  entriesByStudent(id?: number) {
    if (id) {
      return this.entries.filter(e => e.students.map(s => +s).includes(id));
    } else {
      return [];
    }
  }
}
