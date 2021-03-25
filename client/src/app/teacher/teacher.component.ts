import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ColDef, GridApi, GridReadyEvent } from "ag-grid-community";
import { LinkCellRendererComponent } from "../link-cell-renderer/link-cell-renderer.component";
import { Teacher } from "../models/teacher";
import { TeacherService } from "../services/teacher.service";

@Component({
  selector: "app-teacher",
  templateUrl: "./teacher.component.html",
  styleUrls: ["./teacher.component.scss"],
})
export class TeacherComponent implements OnInit {
  name: string = "";
  searchText: string = "";
  teachers: Teacher[] = [];
  private gridApi: GridApi = {} as GridApi;

  columnDefs: ColDef[] = [
    {
      field: "id",
      flex: 1,
    },
    {
      field: "name",
      flex: 2,
      sort: "asc",
      cellRendererFramework: LinkCellRendererComponent,
      cellRendererParams: {
        linkClickHandler: this.navigateToTeacher.bind(this),
      },
    },
    {
      field: "updatedAt",
      flex: 1,
      cellRenderer: (params) => {
        return this.transformDate(params.value);
      },
    },
    {
      headerTooltip: "Delete",
      width: 142,
      sortable: false,
      filter: false,
      enableRowGroup: false,
      enablePivot: false,
      cellRendererFramework: LinkCellRendererComponent,
      cellRendererParams: {
        linkClickHandler: this.removeTeacher.bind(this),
        value: `<span class="text-danger">Delete</span>`,
      },
    },
  ];

  defaultColDef: ColDef = {
    sortable: true,
  };

  constructor(
    private datePipe: DatePipe,
    private router: Router,
    private teacherService: TeacherService
  ) {}

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
        this.name = "";
      });
  }

  getAllTeachers(): void {
    this.teacherService.getAll().subscribe((result) => {
      this.teachers = result;
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

  onGridReady(event: GridReadyEvent) {
    this.gridApi = event.api;
  }

  filterProjects(text: string): void {
    this.gridApi.setQuickFilter(text);
  }

  private navigateToTeacher({ id }: Teacher): void {
    this.router.navigate(["/teacher", id]);
  }

  private transformDate(value: string): string {
    return value
      ? this.datePipe.transform(value, "MM/dd/yyyy HH:mm") || ""
      : "";
  }
}
