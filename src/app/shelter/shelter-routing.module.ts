import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddPageComponent } from './add-page/add-page.component';

export const routes: Routes = [
  { path: 'add', component: AddPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShelterRoutingModule {}
