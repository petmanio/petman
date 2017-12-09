import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { environment } from '../../../../environments/environment';
import { UtilService } from '../../services/util/util.service';

@Component({
  selector: 'app-share-dialog',
  templateUrl: './share-dialog.component.html',
  styleUrls: ['./share-dialog.component.scss']
})
export class ShareDialogComponent implements OnInit {
  public facebook: string;
  public vkontakte: string;
  public twitter: string;
  public odnoklassniki: string;
  constructor(public dialogRef: MatDialogRef<ShareDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { url: string }) { }

  ngOnInit() {
    this.facebook = UtilService.getShareUrl('facebook', this.data.url, this.data.url, environment.fb.appId);
    this.vkontakte = UtilService.getShareUrl('vkontakte', this.data.url);
    this.twitter = UtilService.getShareUrl('twitter', this.data.url);
  }

}
