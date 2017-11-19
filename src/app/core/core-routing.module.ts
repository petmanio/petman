import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { NotFoundPageComponent } from './not-found/not-found-page';

export const routes: Routes = [
  {path: '', component: HomePageComponent, pathMatch: 'full'},
  {path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'},
  {path: '**', component: NotFoundPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class CoreRoutingModule {
}
