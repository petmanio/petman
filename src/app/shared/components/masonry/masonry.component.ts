import { AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input } from '@angular/core';
import * as Masonry from 'masonry-layout';

@Component({
  selector: 'app-masonry',
  templateUrl: './masonry.component.html',
  styleUrls: ['./masonry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MasonryComponent implements AfterViewInit, AfterViewChecked {
  @Input() options: Masonry.Options;
  private instance: Masonry;
  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    this.update();
  }

  ngAfterViewChecked(): void {
    this.update();
  }

  private initiate(): void  {
    this.instance = new Masonry(this.el.nativeElement, this.options);
    this.update();
  }

  private update(): void {
    if (!this.instance) {
      this.initiate();
    } else {
      this.instance.reloadItems();
    }
  }
}
