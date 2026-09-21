import { Component, inject } from '@angular/core';
import { StopWatchService } from '@services/stopWatchService.service';
import { TextRunnerService } from '@services/textRunner.service';

@Component({
  selector: 'reinitialize-button',
  imports: [],
  templateUrl: './reinitialize-button.component.html',
})
export class ReinitializeButtonComponent {
  textRunnerService = inject(TextRunnerService);
}
