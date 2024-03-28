import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../components/interfaces/gifs.interfaces';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private keyLocalStorageTags: string = 'historyTag';

  private apiKey: string = "GpCMbHACSdET7TioEVGH3jEcLizDvJoH";
  private urlGifs: string = "https://api.giphy.com/v1/gifs";

  private _tagsHistory: string[] = [];
  public gifsList: Gif[] = [];

  constructor(
    private http: HttpClient
  ) {
    this.loadLocalStorage();
    this.loadFirstTag();
   }

   private loadFirstTag() {
    if (this._tagsHistory.length > 0) {
      this.searchTag(this._tagsHistory[0])
    }
   }

  get tagsHistory(): string[] {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string): void {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter(tg => tg !== tag);
    }

    this._tagsHistory.unshift(tag);

    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage();
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) {
      return;
    }
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', 10)
      .set('q', tag);

    this.http.get<SearchResponse>(`${this.urlGifs}/search`, { params })
      .subscribe(response => {
        this.gifsList = response.data;
      })
  }

  private saveLocalStorage() {
    localStorage.setItem(this.keyLocalStorageTags, JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage() {

    if (!localStorage.getItem(this.keyLocalStorageTags)) {
      return;
    }

    this._tagsHistory = JSON.parse(localStorage.getItem(this.keyLocalStorageTags)!);
  }

}
