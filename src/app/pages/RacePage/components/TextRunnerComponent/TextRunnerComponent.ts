import { Component, HostListener, inject, OnInit } from '@angular/core';
import { StopWatchService } from '@services/stopWatchService.service';
import { TextRunnerService } from '@services/textRunner.service';
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
export class TextRunnerComponent implements OnInit {
  textRunnerService = inject(TextRunnerService);
  stopWatchService = inject(StopWatchService);
  ngOnInit(): void {
    this.stopWatchService.newText();
    this.textRunnerService.reinitialize();
  }
  @HostListener('window:keydown', ['$event'])
  onKeydown(e: KeyboardEvent) {
    this.textRunnerService.onKey(e);
  }
}
