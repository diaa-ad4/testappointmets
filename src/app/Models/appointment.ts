import DateTimeFormat = Intl.DateTimeFormat;

export class Appointment {
  name: string;
  duration: number;
  start_datetime: Date;
  end_datetime: Date;
  expert_id: bigint;
}
