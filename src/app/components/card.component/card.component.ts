import { Component, input } from '@angular/core';

@Component({
  selector: 'card',
  imports: [],
  templateUrl: './card.component.html',
})
export class CardComponent {
  isAccuracyCPM = input<boolean>();
  cpm = input<number>();
  accuracy = input<string>();
  icon = input<string>();
  progress = input<string>();
  textInfo = input<string>();
}
