import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

export const routes: Routes = [
  // { path: '', redirectTo: 'contact', pathMatch: 'full'},
  {path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
