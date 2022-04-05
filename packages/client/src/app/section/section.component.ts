import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Entry } from '../entry';
import { EntryService } from '../entry.service';
import { Section } from '../section';
import { SectionService } from '../section.service';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {

  section: Section | null = null;
  entries: Entry[] = [];
  students: Student[] = [];
  subjects: Subject[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private entryService: EntryService,
    private sectionService: SectionService,
    private studentService: StudentService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.sectionId) {
      const id = +this.sectionId;
      this.sectionService.getSection(id).subscribe(section => {
        if (section) {
          this.section = section;
        }
      });
      this.entryService.getEntries().subscribe(entries => {
        this.entries = entries.filter(entry => entry.section === id);
      });
      this.studentService.getStudents().subscribe(students => {
        this.students = students.filter(student => student.section === id);
      });
      this.subjectService.getSubjects().subscribe(subjects => {
        this.subjects = subjects.filter(subject => subject.section === id);
      });
    }
  }

  gradeName(n: number) {
    const names = [
      'Primero',
      'Segundo',
      'Tercero',
      'Cuarto',
      'Quinto',
      'Sexto',
    ];

    return names[n];
  }

  levelName(n: number) {
    const names = [
      'Prescolar',
      'Primaria',
      'Secundaria',
    ];

    return names[n];
  }

  subjectName(n: number) {
    const names = [
      "Lengua Espanola",
      "Ingles",
      "Frances",
      "Matematica",
      "Ciencias Sociales",
      "Ciencias de la Naturaleza",
      "Educacion Artistica",
      "Educacion Fisica",
      "F.I.H.R.",
      "Taller Optativo",
    ]
    return names[n];
  }

  get sectionId() {
    return this.route.snapshot.paramMap.get('id');
  }

  studentList(id: number) {
    const entry = this.entries.find(entry => entry && entry.id ? +entry.id === id : false);
    if (entry) {
      const students = this.students.filter(student => {
        if (student.id) {
          return entry.students.map(std => +std).includes(student.id);
        } else {
          return false;
        }
      });
      return students.map(s => `${s.firstname} ${s.lastname}`).join(', ');
    } else {
      return '';
    }
  }

  deleteStudent(id?: number) {
    if (id) {
      this.studentService.deleteStudent(id).subscribe(_ => {
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

  deleteSection() {
    if (this.sectionId) {
      const id = +this.sectionId;
      this.sectionService.deleteSection(id).subscribe(result => {
        this.router.navigate(['/sections']);
      });
    }
  }

}
