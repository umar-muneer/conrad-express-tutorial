import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import {
  ICellRendererParams,
  IAfterGuiAttachedParams,
} from 'ag-grid-community';

type ICellRendererParamsWithClickHandler = ICellRendererParams & {
  linkClickHandler: (data: any) => {};
};

@Component({
  selector: 'ts-link-cell-renderer',
  templateUrl: './link-cell-renderer.component.html',
  styleUrls: ['./link-cell-renderer.component.scss'],
})
export class LinkCellRendererComponent
  implements OnInit, ICellRendererAngularComp {
  params: ICellRendererParamsWithClickHandler = {} as ICellRendererParamsWithClickHandler;
  constructor() {}

  ngOnInit(): void {}

  agInit(params: ICellRendererParamsWithClickHandler): void {
    this.params = params;
  }

  afterGuiAttached?(params?: IAfterGuiAttachedParams): void {}

  refresh(params: any): boolean {
    return true;
  }
}
