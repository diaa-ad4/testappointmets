import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ExpertListComponent} from './List/expertList.component';
import {BookAppointmentComponent} from './Book/bookAppointment.component';
import {LayoutComponent} from './layout.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', component: ExpertListComponent},
      {path: ':id/book', component: BookAppointmentComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpertsRoutingModule {
}
