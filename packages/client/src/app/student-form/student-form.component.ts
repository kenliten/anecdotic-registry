import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  @Input('navigateAfterSave') navigateAfterSave: boolean = true;

  students: Student[] = [];
  sections: Section[] = [];
  studentForm = this.fb.group({
    firstname: [''],
    lastname: [''],
    section: [0],
    notes: [''],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private sectionService: SectionService,
  ) { }

  ngOnInit(): void {
    this.loadSections();
    if (this.studentId) {
      const id = +this.studentId;
      this.studentService.getStudent(id).subscribe(student => {
        if (student) {
          const { id, ...data } = student;
          this.studentForm.setValue(data);
        }
      });
    }
  }

  loadSections() {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
      this.studentForm.get('section')?.setValue(sections[0]?.id);
    });
  }

  saveStudent() {
    if (this.studentId) {
      const id = +this.studentId;
      this.studentService.updateStudent({ id, ...this.studentForm.value }).subscribe(async (_) => {
        this.router.navigate(['/students', this.studentId]);
      });
    } else {
      this.studentService.addStudent(this.studentForm.value).subscribe(_ => {
        this.saved.emit(_);
        this.studentForm.reset();
        if (this.navigateAfterSave) {
          this.router.navigate(['/students']);
        }
      });
    }
  }

  get studentId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
