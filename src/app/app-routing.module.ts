import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StepperComponent } from './stepper/stepper.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { RequestComponent } from './dashboard/request/request.component';
import { HistoryComponent } from './dashboard/history/history.component';

const routes: Routes = [

       
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',

  },
 

  { path: 'stepper', component: StepperComponent },

  { 
    path: 'dashboard', 
    component: AdminComponent,
    children : [
       
      { path: 'request', component: RequestComponent },
      { path: 'history', component: HistoryComponent },

    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
