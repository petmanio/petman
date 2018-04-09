import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <mat-card>
      <mat-card-title>404: Not Found</mat-card-title>
      <mat-card-content i18n>
        <p>Hey! It looks like this page doesn't exist yet.</p>
      </mat-card-content>
      <mat-card-actions>
        <button mat-raised-button color="primary" routerLink="/" i18n>Take Me Home</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: [
    `
    :host {
      text-align: center;
      min-height: 100%;
      display: block;
      background: #fff;
    }

    mat-card {
      box-shadow: none !important;
    }
  `,
  ],
})
export class NotFoundPageComponent {
}
