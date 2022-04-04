import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

import { Section, Grade, Level } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  sections: Section[] = [];

  sectionForm = this.fb.group({
    name: [''],
    grade: [Grade.FIRST],
    level: [Level.PRESCHOOL],
  });

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService,
  ) { }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections() {
    this.sectionService.getSections().subscribe(sections => {
      this.sections = sections;
    });
  }

  saveSection() {
    this.sectionService.addSection(this.sectionForm.value).subscribe(result => {
      this.loadSections();
    });
  }

  deleteSection(id: number | undefined) {
    if (id) {
      this.sectionService.deleteSection(id).subscribe(result => {
        this.loadSections();
      });
    }
  }

}
