import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Subject, SubjectEnum } from '../subject';
import { SubjectService } from '../subject.service';
import { Section } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {

  subjects: Subject[] = [];
  sections: Section[] = [];

  subjectForm = this.fb.group({
    section: [0],
    subject: [SubjectEnum.SPANISH],
  });

  constructor(
    private fb: FormBuilder,
    private subjectService: SubjectService,
    private sectionService: SectionService,
  ) { }

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects() {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
      this.subjectForm.get('section')?.setValue(sections[0]?.id);
    });

    this.subjectService.getSubjects().subscribe(subjects => {
      this.subjects = subjects;
    });
  }

  saveSubject() {
    this.subjectService.addSubject(this.subjectForm.value).subscribe(result => {
      this.loadSubjects();
    });
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

  deleteSubject(id?: number) {
    if (id) {
      this.subjectService.deleteSubject(id).subscribe(_ => {
        this.loadSubjects();
      });
    }
  }

}
