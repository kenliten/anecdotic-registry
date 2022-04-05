import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { Section } from '../section';
import { SectionService } from '../section.service';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  entry: Entry | null = null;
  sectionName = '';
  students: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private entryService: EntryService,
    private sectionService: SectionService,
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    if (this.entryId) {
      this.entryService.getEntry(+this.entryId).subscribe(entry => {
        if (entry) {
          this.entry = entry;
          entry.students.forEach(student => {
            this.studentService.getStudent(student).subscribe(std => {
              if (std) {
                this.students.push(std);
              }
            });
          });
          this.sectionService.getSection(entry.section).subscribe(section => {
            if (section) {
              this.sectionName = section.name;
            }
          });
        }
      });
    }
  }

  deleteEntry() {
    if (this.entryId) {
      this.entryService.deleteEntry(+this.entryId).subscribe(async (_) => {
        if (_) {
          await this.router.navigate(['/entries']);
        }
      });
    }
  }

  get entryId() {
    return this.route.snapshot.paramMap.get('id');
  }

  get studentList() {
    return this.students.map(s => `${s.firstname} ${s.lastname}`).join(', ');
  }

}
