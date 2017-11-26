import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found/not-found-page';

export const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full', data: {showSidenav: true}},
  {path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'},
  {path: 'shelter', loadChildren: 'app/shelter/shelter.module#ShelterModule'},
  {path: '**', component: NotFoundPageComponent, data: {showSidenav: true}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
