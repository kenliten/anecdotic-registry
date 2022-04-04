import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-entry-form',
  templateUrl: './entry-form.component.html',
  styleUrls: ['./entry-form.component.scss']
})
export class EntryFormComponent implements OnInit {

  @Output('saved') saved: EventEmitter<boolean> = new EventEmitter();
  students: Student[] = [];
  sections: Section[] = [];
  entryForm = this.fb.group({
    date: [new Date()],
    time: [''],
    section: [0],
    students: this.fb.array([
      this.fb.control(''),
    ]),
    place: [''],
    entryType: [0],
    description: [''],
    comments: [''],
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

  studentsBySection(id?: number) {
    if (id) {
      return this.students.filter(s => s.section === id);
    } else {
      return [];
    }
  }

  studentSectionName(id?: number) {
    if (id) {
      return this.sections.find(s => s.id === id)?.name;
    } else {
      return '';
    }
  }

  saveEntry() {
    this.entryService.addEntry(this.entryForm.value).subscribe(_ => {
      this.entryForm.reset();
      this.saved.emit(_);
    });
  }

  get studentFields() {
    return this.entryForm.get('students') as FormArray;
  }

  addStudent() {
    this.studentFields.push(this.fb.control(''));
  }
}
