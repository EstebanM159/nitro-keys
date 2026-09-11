import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { TextRunnerComponent } from '../../components/TextRunnerComponent/TextRunnerComponent';
import { StopWatchService } from '../../services/stopWatchService.service';
import { DatePipe } from '@angular/common';
import { CardComponent } from '../../components/card.component/card.component';

@Component({
  selector: 'race-page',
  imports: [TextRunnerComponent, DatePipe, CardComponent],
  templateUrl: './RacePage.html',
  host: {
    class: 'bg-background-light w-full flex flex-col items-center py-10',
  },
})
export class RacePage {
  stopwatchService = inject(StopWatchService);
  currentCharacterToBar = signal(0);
  totalCharacter = this.stopwatchService.text().characterCount;
  barWidthStyle = computed(() => {
    const widthP = Math.min(
      (this.currentCharacterToBar() / this.totalCharacter) * 100,
      100,
    ).toFixed(0);

    return `width: ${widthP}%`;
  });
}
