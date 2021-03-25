import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TeacherComponent } from './teacher/teacher.component';
import { FormsModule } from '@angular/forms';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';
import { CourseDetailComponent } from './course-detail/course-detail.component';
import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { CommunicationComponent } from './communication/communication.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    TeacherDetailComponent,
    CourseDetailComponent,
    Component1Component,
    Component2Component,
    CommunicationComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
