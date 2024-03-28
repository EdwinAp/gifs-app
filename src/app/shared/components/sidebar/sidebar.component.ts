import { Component, Input, OnInit } from '@angular/core';
import { GifsService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private gifsService: GifsService
  ) {

  }

  ngOnInit() {
  }

  get listContent(): string[] {
    return this.gifsService.tagsHistory;
  }

  reSearch(tag: string):void {
    this.gifsService.searchTag(tag);
  }

}
