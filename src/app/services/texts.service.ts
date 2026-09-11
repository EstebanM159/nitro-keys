import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { TextInterface } from '../interfaces/Text.interface';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TextsService {
  private http = inject(HttpClient);
  private jsonUrl = '/assets/texts.json';

  getRandomText(): Observable<TextInterface> {
    return this.http
      .get<TextInterface[]>(this.jsonUrl)
      .pipe(map((texts) => texts[Math.floor(Math.random() * texts.length)]));
  }
}
