import { computed, inject, Injectable, signal } from '@angular/core';
import { StopWatchService } from '@services/stopWatchService.service';

@Injectable({
  providedIn: 'root',
})
export class TextRunnerService {
  stopwatchService = inject(StopWatchService);
  words = computed(() => {
    const result: { chars: { char: string; index: number }[] }[] = [];
    let currentWord: { char: string; index: number }[] = [];
    const charsArray = this.text()?.body?.split('') ?? [];
    charsArray.forEach((char, index) => {
      currentWord.push({ char, index });
      if (char === ' ') {
        result.push({ chars: currentWord });
        currentWord = [];
      }
    });

    if (currentWord.length > 0) {
      result.push({ chars: currentWord });
    }
    return result;
  });

  text = computed(() => this.stopwatchService.text());
  currentCharacter = signal(0);
  errors = signal<number | null>(null);
  endTheGame = signal<boolean>(false);
  nextChar = computed<string>(() => this.text()!.body[this.currentCharacter()]);
  endText = computed(() => this.currentCharacter() === this.text()!.body.length);

  onKey(e: KeyboardEvent) {
    if (this.endText()) return;
    if (!this.isValidKey(e)) return;

    // Evita el comportamiento nativo del navegador para estas teclas
    // (Space scrollea la página, Backspace navega "atrás" si no hay foco en un input).
    e.preventDefault();

    this.stopwatchService.start();

    if (e.key === 'Backspace') {
      if (this.errors() !== null) {
        this.errors.set(null);
      } else if (this.currentCharacter() > 0) {
        this.currentCharacter.update((c) => c - 1);
        this.stopwatchService.correctCharacters.update((c: number) => Math.max(0, c - 1));
      }
      return;
    }

    const isBackquote = e.code === 'Backquote' && (e.key === '`' || e.key === 'Dead');
    const isCorrect = e.key === this.nextChar() || (isBackquote && this.nextChar() === '`');
    if (isCorrect) {
      this.currentCharacter.update((c) => c + 1);
      this.errors.set(null);
      this.stopwatchService.registerCorrectKeystroke();
    } else if (e.key !== 'Shift') {
      // el usuario no podra escribir mas de 3 caracteres erroneos
      this.errors.set(this.currentCharacter());
      this.stopwatchService.registerError();
    }

    // ? mas adelante esto deberia mandar datos
    if (this.endText()) {
      this.stopwatchService.pause();
      this.endTheGame.set(true);
    }
  }

  private isValidKey(event: KeyboardEvent): boolean {
    const { key } = event;
    return (
      key.length === 1 ||
      key === 'Backspace' ||
      key === 'Shift' ||
      key === 'Control' ||
      key === 'AltGraph' ||
      (event.code === 'Backquote' && key === 'Dead')
    );
  }

  reinitialize() {
    this.stopwatchService.reset();
    this.currentCharacter.set(0);
    this.errors.set(null);
  }
}
