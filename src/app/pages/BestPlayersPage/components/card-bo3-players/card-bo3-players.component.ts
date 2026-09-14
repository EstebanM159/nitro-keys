import { Component, input } from '@angular/core';
import { PlayerInterface } from 'src/app/interfaces/Player.interface';

@Component({
  selector: 'card-bo3-players',
  imports: [],
  templateUrl: './card-bo3-players.component.html',
})
export class CardBo3PlayersComponent {
  playerInfo = input<PlayerInterface>();
  index = input();
}
