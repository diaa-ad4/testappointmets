import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

import {ExpertsRoutingModule} from './experts-routing.module';
import {ExpertListComponent} from './List/expertList.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule} from '@angular/material/dialog';
import {InfoDialogComponent} from './Show/infoDialog.component';
import {BookAppointmentComponent} from './Book/bookAppointment.component';
import {LayoutComponent} from './layout.component';
import {MomentTimezonePickerModule} from 'moment-timezone-picker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {jqxCalendarModule} from 'jqwidgets-ng/jqxcalendar';
import {jqxDropDownListModule} from 'jqwidgets-ng/jqxdropdownlist';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ExpertsRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatDialogModule,
    MomentTimezonePickerModule,
    MatNativeDateModule,
    MatDatepickerModule,
    jqxCalendarModule,
    jqxDropDownListModule
  ],
  declarations: [
    LayoutComponent,
    ExpertListComponent,
    BookAppointmentComponent,
    InfoDialogComponent
  ]
})
export class ExpertsModule {
}
