import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../models/teacher';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.scss']
})
export class TeacherDetailComponent implements OnInit {
  teacher: Teacher = {} as Teacher;
  courseCount: number = 0;

  constructor(private route: ActivatedRoute, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(result => {
        this.teacherService.getById(result.teacherId)
          .subscribe(result => this.teacher = result);
      });
  }

  updateCourseCount(courseCount: number): void {
    this.courseCount = courseCount;
  }

}
