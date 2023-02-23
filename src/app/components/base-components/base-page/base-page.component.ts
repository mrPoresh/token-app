import { Component, Input } from '@angular/core';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { takeUntil } from 'rxjs/operators';

import { BaseComponent } from '../base/base.component';
/* import { SMALL_DIALOG_CONFIG, CONFIRM_DIALOG_CONFIG } from '../dialogs/dialog.config';
import { ErrorDialogComponent } from '../dialogs/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component'; */

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent extends BaseComponent {

  protected _data:any;

  @Input()
  set data(dataInput: any) {
    this._data = dataInput;
  }

  get data(): any { return this._data; }

  constructor() { super() }
  
}

export type ConfirmationResponse = {
  isConfirmed: boolean;
  data: any;
}

@Component({
  template: '',
})
export class BasePageComponentWithDialogs extends BasePageComponent {

  constructor(public errorDialog:MatDialog) { super() }

  ngOnInit(): void {
  }

/*   openErrorDialog(msg?:string,title?:string): void {
    const dialogRef = this.errorDialog.open(ErrorDialogComponent, {
      ...SMALL_DIALOG_CONFIG,
      panelClass: "transparent",
      data: {msg:msg, title:title}
    });
  }

  openSuccessDialog(msg?:string,title?:string): void {
    const dialogRef = this.errorDialog.open(SuccessDialogComponent, {
      ...SMALL_DIALOG_CONFIG,
      panelClass: "transparent",
      data: {msg:msg, title:title}
    });
  }

  openConfirmDialog(msg:string, dataToConfrim:any, callback:Function): void {
    const dialogRef = this.errorDialog.open(ConfirmDialogComponent, {
      ...CONFIRM_DIALOG_CONFIG,
      panelClass: "transparent",
      data: {msg:msg, dataRefToConfirm:dataToConfrim}
    });

    dialogRef.afterClosed().pipe(takeUntil(this.unsubscribe)).subscribe(
      (resp:ConfirmationResponse) => {
        if (resp && resp.isConfirmed) {
          this.confirm(resp.data);
        }
      }
    );
  }

  confirm(data:any){} */
}