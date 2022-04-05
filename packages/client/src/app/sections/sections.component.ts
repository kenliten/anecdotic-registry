import { Component, OnInit } from '@angular/core';

import { Section, Grade, Level } from '../section';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit {

  sections: Section[] = [];

  constructor(
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

  deleteSection(id: number | undefined) {
    if (id) {
      this.sectionService.deleteSection(id).subscribe(result => {
        this.loadSections();
      });
    }
  }

}
