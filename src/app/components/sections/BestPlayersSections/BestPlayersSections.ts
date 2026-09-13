import { Component, inject } from '@angular/core';
import { ItemListBestPlayersComponent } from '../../item-list-best-players/item-list-best-players.component';
import { QuerysService } from '@services/querys.service';

@Component({
  selector: 'best-players-sections',
  imports: [ItemListBestPlayersComponent],
  templateUrl: './BestPlayersSections.html',
})
export class BestPlayersSections {
  querysService = inject(QuerysService);

  get rankingPlayers() {
    return this.querysService.rankingPlayers;
  }
  // importar aca players como una query
  constructor() {
    console.log(this.rankingPlayers.data());
  }
}
