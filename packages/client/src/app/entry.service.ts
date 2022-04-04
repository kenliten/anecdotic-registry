import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { LogService } from './log.service';
import { Entry } from './entry';

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  url = 'http://localhost:3000/entries/';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private log: LogService,
  ) { }

  getEntries(): Observable<Entry[]> {
    return this.http.get<Entry[]>(this.url)
      .pipe(
        catchError(this.log.handleError<Entry[]>('getEntries', []))
      );
  }

  getEntry(id: number): Observable<Entry | null> {
    return this.http.get<Entry | null>(this.url + id)
      .pipe(
        catchError(this.log.handleError<Entry | null>('getEntry', null))
      );
  }

  addEntry(entry: Entry): Observable<any> {
    return this.http.post(this.url, entry, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('addEntry', null))
      );
  }

  updateEntry(entry: Entry): Observable<any> {
    const { id } = entry;
    return this.http.patch(this.url + id, entry, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('const', null))
      );
  }

  deleteEntry(id: number): Observable<any> {
    return this.http.delete(this.url + id, this.httpOptions)
      .pipe(
        catchError(this.log.handleError<any>('deleteEntry', null))
      );
  }
}
