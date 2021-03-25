import { Component, OnInit } from '@angular/core';
import { Teacher } from '../models/teacher';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss'],
})
export class TeacherComponent implements OnInit {
  name: string = '';
  teachers: Teacher[] = [];

  constructor(private teacherService: TeacherService) {}

  ngOnInit(): void {
    this.getAllTeachers();
  }

  addTeacher() {
    this.teacherService
      .add({
        name: this.name,
      })
      .subscribe((result: Teacher) => {
        // this.teachers.push(result);
        this.getAllTeachers();
        this.name = '';
      });
  }

  getAllTeachers(): void {
    this.teacherService.getAll().subscribe((result) => {
      this.teachers = result.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
    });
  }

  removeTeacher({ id }: Teacher): void {
    if (id) {
      this.teacherService.remove(id).subscribe((result) => {
        this.teachers = this.teachers.filter(
          (teacher: Teacher) => teacher.id !== id
        );
      });
    }
  }
}
