import { Component, computed, HostListener, inject, OnInit, output, signal } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { StopWatchService } from '../../services/stopWatchService.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'text-runner-component',
  templateUrl: './TextRunnerComponent.html',
  host: {
    class: 'w-2/3 ',
  },
  styleUrl: './TextRunnerCss.css',
})
export class TextRunnerComponent {
  private router = inject(Router);
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
  nextChar = computed<string>(() => this.text()!.body[this.currentCharacter()]);
  endTheGame = computed(() => this.currentCharacter() === this.text()!.body.length);
  progressBarOutput = output<number>();

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.endTheGame()) return;
    if (!this.isValidKey(e.key)) return;

    // Evita el comportamiento nativo del navegador para estas teclas
    // (Space scrollea la página, Backspace navega "atrás" si no hay foco en un input).
    e.preventDefault();

    this.stopwatchService.start();

    if (e.key === 'Backspace') {
      if (this.errors() !== null) {
        this.errors.set(null);
      } else if (this.currentCharacter() > 0) {
        this.currentCharacter.update((c) => c - 1);
        this.stopwatchService.correctCharacters.update((c) => Math.max(0, c - 1));
        this.progressBarOutput.emit(this.currentCharacter());
      }
      return;
    }

    const isCorrect = e.key === this.nextChar();
    if (isCorrect) {
      this.currentCharacter.update((c) => c + 1);
      this.errors.set(null);
      this.stopwatchService.registerCorrectKeystroke();
      this.progressBarOutput.emit(this.currentCharacter());
    } else if (e.key !== 'Shift') {
      this.errors.set(this.currentCharacter());
      this.stopwatchService.registerError();
    }

    if (this.endTheGame()) {
      this.stopwatchService.pause();
      //? no deberia navegar a una ruta sino activar un componente finishRace
      this.router.navigate(['/races/finishRace']);
    }
  }

  private isValidKey(key: string): boolean {
    return key.length === 1 || key === 'Backspace' || key === 'Shift';
  }

  reinitialize() {
    this.stopwatchService.reset();
    this.stopwatchService.newText();
    this.currentCharacter.set(0);
    this.errors.set(null);
    this.progressBarOutput.emit(0);
  }
}
