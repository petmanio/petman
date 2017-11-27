import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/shared/guards/auth-guard/auth.guard';
import { ListPageComponent } from './list-page/list-page.component';
import { AddPageComponent } from './add-page/add-page.component';
import { DetailsPageComponent } from './details-page/details-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';

export const routes: Routes = [
  { path: '', component: ListPageComponent },
  { path: 'add', component: AddPageComponent, canActivate: [AuthGuard] },
  { path: ':id', component: DetailsPageComponent },
  { path: ':id/edit', component: EditPageComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule {}
