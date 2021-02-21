import {Injectable} from '@angular/core';
import * as momentzone from 'moment-timezone';

@Injectable()
export class CurrentTimezone {
  timezone: string = momentzone.tz.guess();
  timezoneOffset: string = `(GMT ${momentzone().tz(this.timezone).utcOffset() / 60})`;

  set(timezone) {
    this.timezone = timezone;
    this.timezoneOffset = `(GMT ${momentzone().tz(this.timezone).utcOffset() / 60})`;
  }

  getTimeAtTimezone(time) {
    let convertedTime = momentzone().utc();
    let splitTime: any;
    splitTime = time.split(/:/);
    convertedTime.hours(parseInt(splitTime[0])).minutes(parseInt(splitTime[1])).seconds(parseInt(splitTime[2])).milliseconds(0);
    convertedTime.tz(this.timezone).toString();
    return convertedTime;
  }


  getAvilableTimes(date, startTime, endTime, step) {
    let convertedTime = date;
    let splitStartTime: any;
    splitStartTime = startTime.split(/:/);
    let startDate = convertedTime.clone();
    startDate.hours(parseInt(splitStartTime[0])).minutes(parseInt(splitStartTime[1])).seconds(parseInt(splitStartTime[2])).milliseconds(0);
    let splitEndTime: any;
    splitEndTime = endTime.split(/:/);
    let endDate = convertedTime.clone();
    endDate.hours(parseInt(splitEndTime[0])).minutes(parseInt(splitEndTime[1])).seconds(parseInt(splitEndTime[2])).milliseconds(0);

    startDate.tz(this.timezone);
    endDate.tz(this.timezone);
    if (endDate.isBefore(startDate)) {
      endDate.add(1, 'days');
    }
    let tempDate = startDate.clone();

    let result = [];
    while (tempDate.isBefore(endDate)) {
      result.push({from: tempDate.clone(), to: tempDate.add(step, 'minutes').clone()});
    }
    return result;
  }
}
