import { Component, input } from '@angular/core';
import { PlayerInterface } from '../../interfaces/Player.interface';

@Component({
  selector: 'item-list-best-players',
  imports: [],
  templateUrl: './item-list-best-players.component.html',
})
export class ItemListBestPlayersComponent {
  playerInfo = input<PlayerInterface>();
  index = input();
}
