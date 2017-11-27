import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/shared/guards/auth-guard/auth.guard';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details/details.component';

export const routes: Routes = [
  { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: DetailsPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule {}
