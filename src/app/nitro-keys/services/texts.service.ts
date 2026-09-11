import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TextsService {
  private http = inject(HttpClient);

  getRandomText() {
    this.http.get('../../../../public/assets/texts.json').subscribe((text) => console.log(text));
  }
}
