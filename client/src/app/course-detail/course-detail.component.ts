import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Course } from '../models/course';
import { CourseService } from '../services/course.service';
import { TeacherService } from '../services/teacher.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  @Input() teacherId: number = 0;
  @Output() courseCountEvent = new EventEmitter<number>();

  name: string = '';
  courses: Course[] = [];

  constructor(
    private teacherService: TeacherService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  addCourse(): void {
    this.courseService.add(this.name, this.teacherId).subscribe((result) => {
      this.getCourses();
      this.name = '';
    });
  }

  removeCourse({ id }: Course): void {
    if (id) {
      this.courseService.remove(id).subscribe(() => {
        this.courses = this.courses.filter(
          (course: Course) => course.id !== id
        );
        this.courseCountEvent.emit(this.courses.length);
      });
    }
  }

  private getCourses(): void {
    this.teacherService
      .getCoursesByTeacherId(this.teacherId)
      .subscribe((result: Course[]) => {
        this.courses = result;
        this.courseCountEvent.emit(this.courses.length);
      });
  }
}
