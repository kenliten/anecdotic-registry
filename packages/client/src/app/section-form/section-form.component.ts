import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Section, Grade, Level } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-section-form',
  templateUrl: './section-form.component.html',
  styleUrls: ['./section-form.component.scss']
})
export class SectionFormComponent implements OnInit {

  @Output('saved') saved: EventEmitter<boolean> = new EventEmitter();
  @Input('navigateAfterSave') navigateAfterSave: boolean = true;

  sectionForm = this.fb.group({
    name: [''],
    grade: [Grade.FIRST],
    level: [Level.PRESCHOOL],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private sectionService: SectionService,
  ) { }

  ngOnInit(): void {
    if (this.sectionId) {
      const id = +this.sectionId;
      this.sectionService.getSection(id).subscribe(section => {
        if (section) {
          const { id, ...data } = section;
          this.sectionForm.setValue(data);
        }
      });
    }
  }

  saveSection() {
    if (this.sectionId) {
      const id = +this.sectionId;
      this.sectionService.updateSection({ id, ...this.sectionForm.value }).subscribe(async (result) => {
        await this.router.navigate(['/sections', this.sectionId]);
      });
    } else {
      this.sectionService.addSection(this.sectionForm.value).subscribe(async (result) => {
        this.saved.emit(result);
        if (this.navigateAfterSave) {
          await this.router.navigate(['/sections']);
        }
      });
    }
  }

  get sectionId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
