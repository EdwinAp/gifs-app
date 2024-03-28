import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html'
})
export class LazyImageComponent implements OnInit {

  @Input()
  public url!: string;
  @Input()
  public alt: string = '';

  public hasLoaded: boolean = false;

  constructor() { }

  ngOnInit() {
    if (!this.url) {
      throw new Error('URL property is required (url)');
    }
  }

  onLoad() {
    this.hasLoaded = true;
  }

}
