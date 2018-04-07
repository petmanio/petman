import { ModuleWithProviders, NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import {
  CovalentLayoutModule,
  CovalentMenuModule,
  CovalentNotificationsModule,
  CovalentSearchModule
} from '@covalent/core';

@NgModule({
  imports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatListModule,
    LayoutModule,

    CovalentSearchModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentLayoutModule,
  ],
  exports: [
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressBarModule,
    MatSelectModule,
    MatMenuModule,
    MatSidenavModule,
    MatChipsModule,
    MatListModule,
    LayoutModule,

    CovalentSearchModule,
    CovalentNotificationsModule,
    CovalentMenuModule,
    CovalentLayoutModule,
  ],
  declarations: []
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: MaterialModule,
      providers: [],
    };
  }
}
