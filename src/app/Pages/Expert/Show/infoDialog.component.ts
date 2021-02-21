import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Expert} from '../../../Models/expert';
import {CurrentTimezone} from '../../../CurrentTimezone';
import {Router} from '@angular/router';


@Component({
  selector: 'info-dialog',
  templateUrl: 'infoDialog.component.html',
})
export class InfoDialogComponent {


  constructor(
    public dialogRef: MatDialogRef<InfoDialogComponent>,
    public timezone: CurrentTimezone,
    @Inject(MAT_DIALOG_DATA) public expert: Expert, public router: Router) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  bookNow(expert) {
    console.warn(expert);
    this.dialogRef.close();
    this.router.navigateByUrl(`/experts/${expert.id}/book`);
  }

}
