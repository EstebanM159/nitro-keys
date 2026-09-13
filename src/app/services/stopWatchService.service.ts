import { computed, inject, Injectable, linkedSignal, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import type { TextInterface, Difficult } from '../interfaces/Text.interface';
import { TextsService } from './texts.service';
import type { RaceInterface } from '../interfaces/Race.interface';

@Injectable({
  providedIn: 'root',
})
export class StopWatchService {
  private timerSubscription?: Subscription;
  private textsService = inject(TextsService);
  isRunning = signal(false);
  stopwatch = signal(0);
  // RaceStats
  time = signal<RaceInterface['time']>(0);
  characterPerMinute = signal<RaceInterface['cpm']>(0);
  accuracy = signal<RaceInterface['accuracy']>('100.0%');
  // Characters
  errorCount = signal<number>(0);
  correctCharacters = signal<number>(0);
  text = signal<TextInterface>({
    id: 0,
    body: '',
    characterCount: 0,
    characterCountWithoutSpaces: 0,
    difficult: 'easy',
  });
  // ! Esto se arregla con rxResource
  constructor() {
    this.newText();
  }
  // text = signal<string>('la toma ha sido completada');

  start() {
    if (!this.isRunning()) {
      this.isRunning.set(true);
      // timer(retrasoInicial, intervalo);
      this.timerSubscription = timer(0, 10).subscribe(() => {
        this.stopwatch.update((c) => c + 10);
      });
    }
  }
  pause() {
    this.isRunning.set(false);
    this.time.set(this.stopwatch());
    this.calculateStadistics();
    this.timerSubscription?.unsubscribe();
  }
  reset() {
    this.pause();
    this.stopwatch.set(0);
    this.errorCount.set(0);
    this.correctCharacters.set(0);
    this.accuracy.set('100.0%');
    this.characterPerMinute.set(0);
  }

  newText() {
    this.textsService.getRandomText().subscribe((text) => {
      this.text.set(text);
    });
  }

  registerCorrectKeystroke() {
    this.correctCharacters.update((c) => c + 1);
    this.calculateStadistics();
  }

  registerError() {
    this.errorCount.update((c) => c + 1);
    this.calculateStadistics();
  }
  calculateStadistics() {
    const elapsedMs = this.isRunning() ? this.stopwatch() : this.time();
    if (elapsedMs <= 0) return;
    const timeInMinutes = elapsedMs / 60000;
    this.characterPerMinute.set(this.correctCharacters() / timeInMinutes);
    const totalKeystrokes = this.correctCharacters() + this.errorCount();
    const currentAccuracy =
      totalKeystrokes > 0 ? (this.correctCharacters() / totalKeystrokes) * 100 : 100;
    this.accuracy.set(`${currentAccuracy.toFixed(1)}%`);
  }
}
