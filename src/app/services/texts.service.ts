import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { TextInterface } from '../interfaces/Text.interface';
import { map, Observable } from 'rxjs';
import type { PlayerInterface } from '../interfaces/Player.interface';
@Injectable({
  providedIn: 'root',
})
export class TextsService {
  private http = inject(HttpClient);
  private jsonTextUrl = '/assets/texts.json';

  getRandomText(): Observable<TextInterface> {
    return this.http
      .get<TextInterface[]>(this.jsonTextUrl)
      .pipe(map((texts) => texts[Math.floor(Math.random() * texts.length)]));
  }
}
