import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MapComponent} from './map/map.component';
import {ChangeRequestComponent} from './change-request/change-request.component';
import {RequestFormComponent} from './request-form/request-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/map', pathMatch: 'full' },
  {path: 'map', component: MapComponent},
  {path: 'requests', component: ChangeRequestComponent},
  {path: 'request-form/:id', component: RequestFormComponent, outlet: 'modal'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
