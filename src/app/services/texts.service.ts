import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { TextInterface } from '../interfaces/Text.interface';
import type { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TextsService {
  private http = inject(HttpClient);
  private jsonUrl = 'public/assets/texts.json';

  getRandomText(): Observable<TextInterface> {
    return this.http.get<TextInterface>(this.jsonUrl);
  }
}
