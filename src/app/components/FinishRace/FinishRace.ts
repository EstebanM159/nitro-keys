import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { StopWatchService } from '@services/stopWatchService.service';
import { TextRunnerService } from '@services/textRunner.service';

@Component({
  selector: 'app-finish-race',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './FinishRace.html',
})
export class FinishRace {
  stopwatchService = inject(StopWatchService);
  textRunnerService = inject(TextRunnerService);
  private router = inject(Router);

  retryRace() {
    this.stopwatchService.reset();
    this.textRunnerService.keepTextOnNextRace.set(true);
    this.router.navigate(['/race']);
  }

  backToLobby() {
    this.textRunnerService.reinitialize();
    this.stopwatchService.reset();
    this.router.navigate(['/race']);
  }
}
