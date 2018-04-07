import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DetailsPageComponent } from './details-page/details-page.component';
import { ExistsGuard } from './shared/guards/exists/exists.guard';

export const routes: Routes = [
  { path: ':id', component: DetailsPageComponent, canActivate: [ExistsGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationRoutingModule {
}
