import {Component, OnInit, ViewChild} from '@angular/core';
import {first} from 'rxjs/operators';
import {Expert} from '../../../Models/expert';
import {ExpertService} from '../../../Services/expert.service';
import {Router, ActivatedRoute} from '@angular/router';
import {CurrentTimezone} from '../../../CurrentTimezone';
import {jqxCalendarComponent} from 'jqwidgets-ng/jqxcalendar';
import * as momentzone from 'moment-timezone';
import {jqxDropDownListComponent} from 'jqwidgets-ng/jqxdropdownlist';
import {Appointment} from '../../../Models/appointment';


@Component({templateUrl: 'bookAppointment.component.html'})
export class BookAppointmentComponent implements OnInit {
  expert: Expert = null;
  durationSource: number[] = [15, 30, 45, 60];
  timeSlotSource: any;
  @ViewChild('myCalendar', {static: false}) myCalendar: jqxCalendarComponent;
  @ViewChild('durationDropDownList', {static: false}) durationDropDownList: jqxDropDownListComponent;
  @ViewChild('timeSlotDropDownList', {static: false}) timeSlotDropDownList: jqxDropDownListComponent;
  private date: any | moment.Moment;
  public duration: number;
  public timeSlotSourceOrginal: any[];
  public fromTime: any;
  public toTime: any;
  public timezonesSource: any;
  public timezoneSelectedIndex: number;
  public appointments: any;

  constructor(private expertService: ExpertService, public timezone: CurrentTimezone, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.expertService.getById(id)
      .pipe(first())
      .subscribe(data => {
        this.expert = (<Expert> data);
      });
    this.date = momentzone.utc().tz('UTC');
    this.timezonesSource = momentzone.tz.names();
    this.timezoneSelectedIndex = momentzone.tz.names().indexOf(this.timezone.timezone);
    this.expertService.appointmentBetweenDates({
      expert_id: id,
      start_datetime: this.date.hours(0).minutes(0).toDate(),
      end_datetime: this.date.hours(23).minutes(59).toDate()
    })
      .pipe(first())
      .subscribe(data => {
        this.appointments = (<Appointment> data);
      });
  }

  myCalendarEvent(event: any): void {
    let date = event.args.date;
    this.date = momentzone.utc(date.toDateString());
    this.expertService.appointmentBetweenDates({
      expert_id: this.expert.id,
      start_datetime: this.date.hours(0).minutes(0).toDate(),
      end_datetime: this.date.hours(23).minutes(59).toDate()
    })
      .pipe(first())
      .subscribe(data => {
        this.appointments = (<Appointment> data);
      });
  }

  durationOnSelect(event: any): void {
    let args = event.args;
    let item = this.durationDropDownList.getItem(args.index);
    this.duration = parseInt(item.value);
    this.timeSlotSourceOrginal = this.timezone.getAvilableTimes(this.date, this.expert.work_start_time, this.expert.work_end_time, this.duration);
    this.removeTimeSolts();
    this.timeSlotSource = this.timeSlotSourceOrginal.map(x => {
      return `${x.from.format('hh:mm:ss A')} - ${x.to.format('hh:mm:ss A')}`;
    });
  }

  timeslotOnSelect(event: any): void {
    let args = event.args;
    let item = this.timeSlotDropDownList.getItem(args.index);
    this.fromTime = this.timeSlotSourceOrginal[item['index']].from;
    this.toTime = this.timeSlotSourceOrginal[item[`index`]].to;
  }

  timezonesOnSelect(event: any): void {
    this.timezone.set(momentzone.tz.names()[event.args['index']]);
  }

  bookAppointment() {
    if (confirm(`your appointment will be on ${this.fromTime.format('DD MMM YYYY')} from :${this.fromTime.format('hh:mm A')}  to ${this.toTime.format('hh:mm A')}`)) {
      this.expertService.bookAppointment('', this.duration, this.fromTime.clone().tz('UTC').toDate(),
        this.toTime.tz('UTC').clone().toDate(), this.expert.id).subscribe(data => {
          this.router.navigateByUrl(`/experts`);
        },
        error => {
          console.error('Error');
        }
      );
    }
  }

  removeTimeSolts() {
    let appointments = this.appointments;
    this.timeSlotSourceOrginal = this.timeSlotSourceOrginal.filter(x => {
      if (x) {
        let result = true;
        for (let i = 0; i < appointments.length; i++) {
          let appointment = appointments[i];
          let start = momentzone.tz(appointment.start_datetime, 'UTC').clone().tz(this.timezone.timezone);
          let end = momentzone.tz(appointment.end_datetime, 'UTC').clone().tz(this.timezone.timezone);
          if (x.from.isBetween(start, end, 'minutes', '[)')
            ||
            x.to.isBetween(start, end, 'minutes', '(]')
          ) {
            result = false;
          }
        }
        return result;
      }
    });
  }

}

