import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunicationComponent } from './communication/communication.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: 'teacher/:teacherId',
    component: TeacherDetailComponent,
  },
  {
    path: 'communication',
    component: CommunicationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
