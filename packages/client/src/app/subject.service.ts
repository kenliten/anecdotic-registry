import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LogService } from './log.service';
import { Subject } from './subject';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  url = 'http://localhost:3000/subjects/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private log: LogService,
  ) { }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url)
      .pipe(
        catchError(this.log.handleError<Subject[]>('getSubjects', []))
      );
  }

  getSubject(id: number): Observable<Subject | null> {
    return this.http.get<Subject | null>(this.url + id)
      .pipe(
        catchError(this.log.handleError<Subject | null>('getSubject', null))
      );
  }

  addSubject(subject: Subject): Observable<any> {
    return this.http.post(this.url, subject, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('addSubject', null))
      );
  }

  updateSubject(subject: Subject): Observable<any> {
    const { id } = subject;
    return this.http.patch(this.url + id, subject, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('const', null))
      );
  }

  deleteSubject(id: number): Observable<any> {
    return this.http.delete(this.url + id, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('deleteSubject', null))
      );
  }
}
