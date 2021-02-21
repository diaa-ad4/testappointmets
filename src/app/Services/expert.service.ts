import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {Appointment} from '../Models/appointment';
import {map} from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class ExpertService {

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
  }

  getAll() {
    return this.http.get(`${environment.apiUrl}/experts`);
  }

  getById(id) {
    return this.http.get(`${environment.apiUrl}/experts/${id}`);
  }


  appointmentBetweenDates(data) {
    return this.http.post(`${environment.apiUrl}/appointmentBetweenDates`, data);
  }

  bookAppointment(name, duration, start_datetime, end_datetime, expert_id) {
    let appointment: Appointment = {
      name: name,
      duration: duration,
      start_datetime: start_datetime,
      end_datetime: end_datetime,
      expert_id: expert_id,
    };
    return this.http.post(`${environment.apiUrl}/appointments`, appointment);
  }
}
