import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found/not-found-page';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    pathMatch: 'full',
    data: { showSidenav: true }
  },
  { path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  {
    path: 'shelters',
    loadChildren: 'app/shelter/shelter.module#ShelterModule',
    data: { showSidenav: true }
  },
  {
    path: 'walkers',
    loadChildren: 'app/walker/walker.module#WalkerModule',
    data: { showSidenav: true }
  },
  {
    path: 'adoption',
    loadChildren: 'app/adopt/adopt.module#AdoptModule',
    data: { showSidenav: true }
  },
  {
    path: 'lost-found',
    loadChildren: 'app/lost-found/lost-found.module#LostFoundModule',
    data: { showSidenav: true }
  },
  {
    path: 'organizations',
    loadChildren: 'app/organization/organization.module#OrganizationModule',
    data: { showSidenav: true }
  },
  { path: '**', component: NotFoundPageComponent, data: { showSidenav: false } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}
