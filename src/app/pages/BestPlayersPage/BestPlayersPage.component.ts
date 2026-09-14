import { Component, computed, inject } from '@angular/core';
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
  podiumOrder = computed(() => {
    const players = this.rankingPlayers.data();
    if (!players || players.length < 3) return [];
    const [first, second, third] = players;
    return [
      { player: second, position: 2 },
      { player: first, position: 1 },
      { player: third, position: 3 },
    ];
  });
  get rankingPlayers() {
    return this.queryService.rankingPlayers;
  }
}
