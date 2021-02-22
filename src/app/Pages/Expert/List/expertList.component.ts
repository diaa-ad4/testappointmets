import {Component, OnInit} from '@angular/core';
import {first} from 'rxjs/operators';
import {Expert} from '../../../Models/expert';
import {ExpertService} from '../../../Services/expert.service';
import {Router, ActivatedRoute} from '@angular/router';
import {InfoDialogComponent} from '../Show/infoDialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CurrentTimezone} from '../../../CurrentTimezone';


@Component({templateUrl: 'expertList.component.html'})
export class ExpertListComponent implements OnInit {
  experts: Expert[] = null;
  private route: ActivatedRoute;
  private router: Router;

  constructor(private expertService: ExpertService, public dialog: MatDialog, public timezone: CurrentTimezone) {
  }

  ngOnInit() {
    this.expertService.getAll()
      .pipe(first())
      .subscribe(experts => {
        return this.experts = (<Expert[]> experts);
      });

    // this.expertService.getUserTimezone()
    //   .pipe(first())
    //   .subscribe(result => {
    //     this.timezone.set(result['timezone']);
    //   });
  }


  showExpert(expert: Expert) {
    this.expertService.getById(expert.id)
      .pipe(first())
      .subscribe(data => {
        expert = (<Expert> data);
        expert.work_start_time = this.timezone.getTimeAtTimezone(expert.work_start_time).format('hh:mm:ss A');
        expert.work_end_time = this.timezone.getTimeAtTimezone(expert.work_end_time).format('hh:mm:ss A');
        const dialogRef = this.dialog.open(InfoDialogComponent, {
          width: '400px',
          height: '300px',
          data: expert
        });
      });
  }
}

