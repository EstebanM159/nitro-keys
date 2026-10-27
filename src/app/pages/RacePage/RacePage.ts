import { Component, computed, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
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
export default class RacePage implements OnInit {
  private router = inject(Router);

  stopwatchService = inject(StopWatchService);
  textRunnerService = inject(TextRunnerService);
  gameOver = effect(() => this.isGameOver(this.textRunnerService.endTheGame()));
  ngOnInit(): void {
    this.stopwatchService.newText();
  }
  barWidthStyle = computed(() => {
    const text = this.stopwatchService.text();
    console.log(text?.difficulty);
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
