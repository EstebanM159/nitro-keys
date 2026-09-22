import { Component, inject, signal } from '@angular/core';
import { TextRunnerComponent } from '../RacePage/components/TextRunnerComponent/TextRunnerComponent';

import { StopWatchService } from '@services/stopWatchService.service';
import type { Difficult } from 'src/app/interfaces/Text.interface';
import { TextRunnerService } from '@services/textRunner.service';

@Component({
  selector: 'app-practice-lobby-page',
  imports: [TextRunnerComponent],
  templateUrl: './PracticeLobbyPage.component.html',
})
export default class PracticeLobbyPageComponent {
  info = [
    {
      id: 'easy',
      number: '01',
      title: 'Fácil // Cadete',
      description: 'Palabras comunes, sin símbolos ni mayúsculas complejas.',
      cpm: '50',
      color: 'text-white',
    },
    {
      id: 'medium',
      number: '02',
      title: 'Normal // Habitual',
      description: 'Puntuación balanceada, jerga digital y ritmo constante.',
      cpm: '95',
      color: 'text-white',
    },
    {
      id: 'hard',
      number: '03',
      title: 'Difícil // Hazlo',
      description: 'Cadenas de código, símbolos y palabras técnicas exigentes.',
      cpm: '140',
      color: 'text-primary',
    },
    {
      id: 'extreme',
      number: '04',
      title: 'Extremo // Pesadilla',
      description: 'Hexadecimal, sintaxis sin error y velocidad máxima.',
      cpm: '190+',
      color: 'text-[#ff9da2]',
    },
  ];
  selectedDifficulty = signal('hard');
  stopWatchService = inject(StopWatchService);
  textRunnerService = inject(TextRunnerService);
  cambiarTexto(dificultad: Difficult) {
    this.selectedDifficulty.set(dificultad);
    this.textRunnerService.reinitialize();
    this.stopWatchService.newTextByDifficulty(dificultad);
  }
}
