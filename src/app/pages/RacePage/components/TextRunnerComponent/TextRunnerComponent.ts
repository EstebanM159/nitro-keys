import { Component, computed, HostListener, inject, OnInit, output, signal } from '@angular/core';
import { Router } from '@angular/router';
import { StopWatchService } from '@services/stopWatchService.service';
import { ReinitializeButtonComponent } from 'src/app/components/reinitialize-button/reinitialize-button.component';
@Component({
  selector: 'text-runner-component',
  templateUrl: './TextRunnerComponent.html',
  host: {
    class: 'w-2/3 ',
  },
  styleUrl: './TextRunnerCss.css',
  imports: [ReinitializeButtonComponent],
})
// ? que pasa con lo que venia escribiendo si a alguien se le cae?
export class TextRunnerComponent {
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
  endTheGame = output<boolean>();
  nextChar = computed<string>(() => this.text()!.body[this.currentCharacter()]);
  endText = computed(() => this.currentCharacter() === this.text()!.body.length);
  progressBarOutput = output<number>();

  @HostListener('window:keydown', ['$event'])
  onKey(e: KeyboardEvent) {
    if (this.endText()) return;
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
      // el usuario no podra escribir mas de 3 caracteres erroneos
      this.errors.set(this.currentCharacter());
      this.stopwatchService.registerError();
    }

    if (this.endText()) {
      this.stopwatchService.pause();
      //? no deberia navegar a una ruta sino activar un componente finishRace
      this.endTheGame.emit(true);
    }
  }

  private isValidKey(key: string): boolean {
    return key.length === 1 || key === 'Backspace' || key === 'Shift';
  }

  reinitialize() {
    this.stopwatchService.reset();
    // this.stopwatchService.newText();
    this.currentCharacter.set(0);
    this.errors.set(null);
    this.progressBarOutput.emit(0);
  }
}
