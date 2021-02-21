import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookAppointmentComponent} from './Pages/Expert/Book/bookAppointment.component';


const expertsModule = () => import('./Pages/Expert/experts.module').then(x => x.ExpertsModule);

const routes: Routes = [
  {path: 'experts', loadChildren : expertsModule},
  {path: 'experts/:id/book', component: BookAppointmentComponent},

  // otherwise redirect to home
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
