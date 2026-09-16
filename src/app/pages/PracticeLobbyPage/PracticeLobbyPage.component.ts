import { Component, signal } from '@angular/core';
import { TextRunnerComponent } from '../RacePage/components/TextRunnerComponent/TextRunnerComponent';

@Component({
  selector: 'app-practice-lobby-page',
  imports: [TextRunnerComponent],
  templateUrl: './PracticeLobbyPage.component.html',
})
export default class PracticeLobbyPageComponent {
  protected readonly selectedDifficulty = signal('hard');

  protected selectDifficulty(difficulty: string): void {
    this.selectedDifficulty.set(difficulty);
  }
}
