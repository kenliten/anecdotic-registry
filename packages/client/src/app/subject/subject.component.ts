import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Section } from '../section';
import { SectionService } from '../section.service';
import { Subject } from '../subject';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  subject: Subject | null = null;
  sections: Section[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sectionService: SectionService,
    private subjectService: SubjectService,
  ) { }

  ngOnInit(): void {
    if (this.subjectId) {
      const id = +this.subjectId;
      this.subjectService.getSubject(id).subscribe(subject => {
        if (subject) {
          this.subject = subject;
        }
      });
      this.sectionService.getSections().subscribe(sections => {
        this.sections = sections;
      });
    }
  }

  sectionName(id: number) {
    return this.sections.find(s => s.id === id)?.name;
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

  deleteSubject() {
    if (this.subjectId) {
      const id = +this.subjectId;
      this.subjectService.deleteSubject(id).subscribe(async (_) => {
        await this.router.navigate(['/subjects']);
      });
    }
  }

  get subjectId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
