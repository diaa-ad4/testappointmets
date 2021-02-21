import {Time} from '@angular/common';
import {Appointment} from './appointment';

export class Expert {
  id: bigint;
  name: string;
  da: string;
  expert: string;
  work_start_time: string;
  work_end_time: string;
  country: string;
  time_zone: string;
  appointments: Appointment[];
}
