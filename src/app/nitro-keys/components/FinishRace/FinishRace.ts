import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe, DecimalPipe } from '@angular/common';
import { StopWatchService } from '../../services/stopWatchService.service';

@Component({
  selector: 'app-finish-race',
  imports: [DatePipe, DecimalPipe],
  templateUrl: './FinishRace.html',
})
export class FinishRace {
  stopwatchService = inject(StopWatchService);
  private router = inject(Router);

  retryRace() {
    this.stopwatchService.reset();
    this.stopwatchService.newText();
    this.router.navigate(['/races']);
  }

  backToLobby() {
    this.stopwatchService.reset();
    this.router.navigate(['/races/lobby']);
  }
}
