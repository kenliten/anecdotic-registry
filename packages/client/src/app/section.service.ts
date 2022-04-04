import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LogService } from './log.service';
import { Section } from './section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  url = 'http://localhost:3000/sections/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private log: LogService,
  ) { }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(this.url)
      .pipe(
        catchError(this.log.handleError<Section[]>('getSections', []))
      );
  }

  getSection(id: number): Observable<Section | null> {
    return this.http.get<Section | null>(this.url + id)
      .pipe(
        catchError(this.log.handleError<Section | null>('getSection', null))
      );
  }

  addSection(section: Section): Observable<any> {
    return this.http.post(this.url, section, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('addSection', null))
      );
  }

  updateSection(section: Section): Observable<any> {
    const { id } = section;
    return this.http.patch(this.url + id, section, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('const', null))
      );
  }

  deleteSection(id: number): Observable<any> {
    return this.http.delete(this.url + id, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('deleteSection', null))
      );
  }
}
