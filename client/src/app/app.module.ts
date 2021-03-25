import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { TeacherComponent } from "./teacher/teacher.component";
import { FormsModule } from "@angular/forms";
import { TeacherDetailComponent } from "./teacher-detail/teacher-detail.component";
import { CourseDetailComponent } from "./course-detail/course-detail.component";
import { Component1Component } from "./component1/component1.component";
import { Component2Component } from "./component2/component2.component";
import { CommunicationComponent } from "./communication/communication.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { AgGridModule } from "ag-grid-angular";
import { DatePipe } from "@angular/common";
import { LinkCellRendererComponent } from './link-cell-renderer/link-cell-renderer.component';

@NgModule({
  declarations: [
    AppComponent,
    TeacherComponent,
    TeacherDetailComponent,
    CourseDetailComponent,
    Component1Component,
    Component2Component,
    CommunicationComponent,
    DashboardComponent,
    PageNotFoundComponent,
    LinkCellRendererComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    AgGridModule.withComponents([]),
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
