import { Component, inject } from '@angular/core';
import { ItemListBestPlayersComponent } from '../../components/item-list-best-players/item-list-best-players.component';
import { QuerysService } from '@services/querys.service';
import { CardBo3PlayersComponent } from './components/card-bo3-players/card-bo3-players.component';

@Component({
  selector: 'app-best-players-page',
  imports: [ItemListBestPlayersComponent, CardBo3PlayersComponent],
  templateUrl: './BestPlayersPage.component.html',
})
export class BestPlayersPageComponent {
  queryService = inject(QuerysService);

  get rankingPlayers() {
    return this.queryService.rankingPlayers;
  }
}
