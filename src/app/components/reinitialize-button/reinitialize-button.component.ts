import { Component, inject } from '@angular/core';
import { StopWatchService } from '@services/stopWatchService.service';

@Component({
  selector: 'reinitialize-button',
  imports: [],
  templateUrl: './reinitialize-button.component.html',
})
export class ReinitializeButtonComponent {
  stopwatchService = inject(StopWatchService);
}
