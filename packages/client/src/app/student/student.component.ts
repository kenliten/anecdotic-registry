import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  student: Student | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
  ) { }

  ngOnInit(): void {
    if (this.studentId) {
      const id = +this.studentId;
      this.studentService.getStudent(id).subscribe(student => {
        if (student) {
          this.student = student;
        }
      });
    }
  }

  deleteStudent() {
    if (this.studentId) {
      const id = +this.studentId;
      this.studentService.deleteStudent(id).subscribe(_ => {
        this.router.navigate(['/students']);
      });
    }
  }

  get studentId() {
    return this.route.snapshot.paramMap.get('id');
  }

}
