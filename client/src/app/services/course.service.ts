import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  add(name: string, teacherId: number): Observable<Course> {
    return this.http.post<Course>(`${this.baseUrl}/courses`, {
      name,
      teacherId,
    });
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/courses/${id}`);
  }
}
