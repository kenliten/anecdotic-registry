import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';

import { Subject, SubjectEnum } from '../subject';
import { SubjectService } from '../subject.service';
import { Section } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-form.component.scss']
})
export class SubjectFormComponent implements OnInit {

  @Output('saved') saved: EventEmitter<boolean> = new EventEmitter();
  @Input('navigateAfterSave') navigateAfterSave: boolean = true;

  sections: Section[] = [];

  subjectForm = this.fb.group({
    section: [0],
    subject: [SubjectEnum.SPANISH],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private subjectService: SubjectService,
    private sectionService: SectionService,
  ) { }

  ngOnInit(): void {
    if (this.subjectId) {
      this.subjectService.getSubject(+this.subjectId).subscribe(subject => {
        if (subject) {
          const { id, ...data } = subject;
          this.subjectForm.setValue(data);
        }
      });
    }
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
      this.subjectForm.get('section')?.setValue(sections[0]?.id);
    });
  }

  saveSubject() {
    if (this.subjectId) {
      const id = +this.subjectId;
      this.subjectService.updateSubject({ id, ...this.subjectForm.value }).subscribe(result => {
        this.saved.emit(result);
        this.router.navigate(['/subjects', this.subjectId]);
      });
    } else {
      this.subjectService.addSubject(this.subjectForm.value).subscribe(result => {
        this.saved.emit(result);
        if (this.navigateAfterSave) {
          this.router.navigate(['/subjets']);
        }
      });
    }
  }

  get subjectId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
