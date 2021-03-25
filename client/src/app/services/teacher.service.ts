import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppModule } from '../app.module';
import { Teacher } from '../models/teacher';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getById(id: number): Observable<Teacher> {
    return this.http.get<Teacher>(`${this.baseUrl}/teachers/${id}`);
  }

  getAll(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${this.baseUrl}/teachers`);
  }

  add(teacher: Teacher): Observable<Teacher> {
    return this.http.post<Teacher>(`${this.baseUrl}/teachers`, teacher);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/teachers/${id}`);
  }

  getCoursesByTeacherId(teacherId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/teachers/${teacherId}/courses`);
  }
}
