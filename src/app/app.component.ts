import {Component, OnInit} from '@angular/core';
// import moment form 'moment';
import * as moment from 'moment';
import * as momentzone from 'moment-timezone';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Test';

  ngOnInit(): void {
    // const exactBirthMoment = moment.utc('2018-06-13 06:27:00').utcOffset('+10:00');
    //
    // console.log(exactBirthMoment)
    // const now = moment().toLocaleString();
    // console.warn(now);
    // console.warn(moment().utcOffset());
    // const test = momentzone().tz('Eastern European Summer Time').format('LLLL');
    // console.warn(test);
  }

}
