import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit {

  @Output('saved') saved: EventEmitter<boolean> = new EventEmitter();

  students: Student[] = [];
  sections: Section[] = [];
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
  ) { }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections() {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
      this.studentForm.get('section')?.setValue(sections[0]?.id);
    });
  }

  saveStudent() {
    this.studentService.addStudent(this.studentForm.value).subscribe(_ => {
      this.saved.emit(_);
      this.studentForm.reset();
    });
  }

}
