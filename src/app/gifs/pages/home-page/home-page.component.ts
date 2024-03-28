import { Component, OnInit } from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { Gif } from '../../components/interfaces/gifs.interfaces';

@Component({
  selector: 'gifs-home-page',
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {

  constructor(
    private gifService: GifsService
  ) { }

  ngOnInit() {
  }

  get gifs(): Gif[] {
    return this.gifService.gifsList;
  }

}
