import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CardComponent } from './components/card.component/card.component';
import { TextRunnerComponent } from './components/TextRunnerComponent/TextRunnerComponent';
import { StopWatchService } from '@services/stopWatchService.service';
import { Router } from '@angular/router';
import { TextRunnerService } from '@services/textRunner.service';

@Component({
  selector: 'race-page',
  imports: [TextRunnerComponent, DatePipe, CardComponent],
  templateUrl: './RacePage.html',
  host: {
    class: 'bg-background-light w-full flex flex-col items-center py-10',
  },
})
export default class RacePage {
  private router = inject(Router);

  stopwatchService = inject(StopWatchService);
  textRunnerService = inject(TextRunnerService);

  barWidthStyle = computed(() => {
    const text = this.stopwatchService.text();
    if (!text) return 'width: 0%';

    const widthP = Math.min(
      (this.textRunnerService.currentCharacter() / text.characterCount) * 100,
      100,
    ).toFixed(0);
    return `width: ${widthP}%`;
  });
  isGameOver(event: boolean) {
    if (event) {
      this.router.navigate(['/race/finishRace']);
    }
  }
}
