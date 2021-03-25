import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { CommunicationComponent } from "./communication/communication.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { TeacherDetailComponent } from "./teacher-detail/teacher-detail.component";
import { TeacherComponent } from "./teacher/teacher.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
  },
  {
    path: "teacher",
    component: TeacherComponent,
  },
  {
    path: "teacher/:teacherId",
    component: TeacherDetailComponent,
  },
  {
    path: "communication",
    component: CommunicationComponent,
  },
  {
    path: "",
    redirectTo: "/dashboard",
    pathMatch: "full",
  },
  {
    path: "**",
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
