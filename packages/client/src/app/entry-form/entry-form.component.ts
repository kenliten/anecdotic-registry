import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

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
  @Input('navigateAfterSave') navigateAfterSave: boolean = true;

  students: Student[] = [];
  sections: Section[] = [];
  entryForm = this.fb.group({
    date: [''],
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
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private entryService: EntryService,
    private studentService: StudentService,
    private sectionService: SectionService,
  ) { }

  ngOnInit(): void {
    this.loadSections();
    this.loadStudents();
    if (this.entryId) {
      this.entryService.getEntry(+this.entryId).subscribe(entry => {
        if (entry) {
          const { id, date, ...data } = entry;
          for (let i = 0; i < data.students.length - 1; i++) {
            this.addStudent();
          }

          this.entryForm.setValue({ date: date.toString().split('T')[0], ...data});
        }
      });
    }
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
    if (this.entryId) {
      this.entryService.updateEntry({ id: +this.entryId, ...this.entryForm.value }).subscribe(async (_) => {
        await this.router.navigate(['/entries', this.entryId]);
      });
    } else {
      this.entryService.addEntry(this.entryForm.value).subscribe(async (_) => {
        this.entryForm.reset();
        this.saved.emit(_);
        if (this.navigateAfterSave) {
          await this.router.navigate(['/entries']);
        }
      });
    }
  }

  get studentFields() {
    return this.entryForm.get('students') as FormArray;
  }

  get entryId() {
    return this.route.snapshot.paramMap.get('id');
  }

  addStudent() {
    this.studentFields.push(this.fb.control(''));
  }
}
