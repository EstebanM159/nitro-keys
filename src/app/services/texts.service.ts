import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { Difficult, TextInterface } from '../interfaces/Text.interface';
import { map, Observable, tap } from 'rxjs';
import type { PlayerInterface } from '../interfaces/Player.interface';
@Injectable({
  providedIn: 'root',
})
export class TextsService {
  private http = inject(HttpClient);
  // private jsonTextUrl = '/assets/texts.json';
  private jsonTextUrl = '/assets/texts_updated_v2.json';

  getRandomText(): Observable<TextInterface> {
    return this.http
      .get<TextInterface[]>(this.jsonTextUrl)
      .pipe(map((texts) => texts[Math.floor(Math.random() * texts.length)]));
  }
  getTextByDifficulty(difficulty: Difficult): Observable<TextInterface> {
    return this.http.get<TextInterface[]>(this.jsonTextUrl).pipe(
      map((texts) => {
        const filteredTexts = texts.filter((text) => text.difficulty === difficulty);

        if (filteredTexts.length === 0) {
          throw new Error(`No se encontraron textos para la dificultad: ${difficulty}`);
        }

        const randomIndex = Math.floor(Math.random() * filteredTexts.length);
        return filteredTexts[randomIndex];
      }),
    );
  }
}
