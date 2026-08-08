import { Component, computed, HostListener, inject, OnInit, output, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { StopWatchService } from '../../services/stopWatchService';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'text-runner-component',
  templateUrl: './TextRunnerComponent.html',
  host: {
    class: 'w-2/3 ',
  },
  styleUrl: './TextRunnerCss.css',
})
export class TextRunnerComponent {
  stopwatchService = inject(StopWatchService);
  words = computed(() => {
    const charsArray = this.text.split(''); // Ahora lo manejamos aquí adentro
    const result: { chars: { char: string; index: number }[] }[] = [];
    let currentWord: { char: string; index: number }[] = [];

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
  text = this.stopwatchService.text();
  currentCharacter = signal(0);
  errors = signal<number | null>(null);
  nextChar = computed<string>(() => this.text[this.currentCharacter()]);
  endTheGame = computed(() => this.currentCharacter() === this.text.length);
  progressBarOutput = output<number>();
  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.endTheGame()) return;
    if (!this.isValidKey(e.key)) return;

    this.stopwatchService.start();

    if (e.key === 'Backspace') {
      this.errors.set(null);
      return;
    }

    if (this.currentCharacter() === this.errors()) return;

    const isCorrect = e.key === this.nextChar();
    if (isCorrect) {
      this.currentCharacter.update((c) => c + 1);
      this.errors.set(null);
      this.progressBarOutput.emit(this.currentCharacter());
    } else if (e.key !== 'Shift') {
      this.errors.set(this.currentCharacter());
      this.stopwatchService.errorCount.update((c) => c + 1);
    }

    if (this.endTheGame()) {
      this.stopwatchService.pause();
    }
  }

  private isValidKey(key: string): boolean {
    return [1, 5, 9].includes(key.length);
  }
}
