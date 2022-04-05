import { Component, OnInit } from '@angular/core';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Entry } from '../entry';
import { EntryService } from '../entry.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  sections = 0;
  subjects = 0;
  students = 0;
  entries = 0;

  constructor(
    private sectionService: SectionService,
    private subjectService: SubjectService,
    private studentService: StudentService,
    private entryService: EntryService,
  ) { }

  ngOnInit(): void {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections.length;
    });

    this.subjectService.getSubjects().subscribe(subjects => {
      const rs: Subject[] = [];
      this.subjects = subjects.filter(subject => {
        if (rs.find(s => s.subject === subject.subject)) {
          return false;
        } else {
          rs.push(subject);
          return true;
        }
      }).length;
    });

    this.studentService.getStudents().subscribe(students => {
      this.students = students.length;
    });

    this.entryService.getEntries().subscribe(entries => {
      this.entries = entries.length;
    });
  }
}
