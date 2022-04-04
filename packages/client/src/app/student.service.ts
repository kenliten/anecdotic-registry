import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LogService } from './log.service';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  url = 'http://localhost:3000/students/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private log: LogService,
  ) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.url)
      .pipe(
        catchError(this.log.handleError<Student[]>('getStudents', []))
      );
  }

  getStudent(id: number): Observable<Student | null> {
    return this.http.get<Student | null>(this.url + id)
      .pipe(
        catchError(this.log.handleError<Student | null>('getStudent', null))
      );
  }

  addStudent(student: Student): Observable<any> {
    return this.http.post(this.url, student, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('addStudent', null))
      );
  }

  updateStudent(student: Student): Observable<any> {
    const { id } = student;
    return this.http.patch(this.url + id, student, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('const', null))
      );
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete(this.url + id, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('deleteStudent', null))
      );
  }
}
