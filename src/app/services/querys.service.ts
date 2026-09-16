import { inject, Injectable } from '@angular/core';
import { injectQuery } from '@tanstack/angular-query-experimental';
import { firstValueFrom, type Observable } from 'rxjs';
import type { PlayerInterface, PlayersResponse } from '../interfaces/Player.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class QuerysService {
  private http = inject(HttpClient);
  private jsonPlayersUrl = '/assets/mock-players.json';
  readonly rankingPlayers = injectQuery(() => ({
    queryKey: ['rankingPlayers'],
    queryFn: () => this.getRankingPlayers(),
  }));

  async getRankingPlayers(): Promise<PlayerInterface[]> {
    const response = await firstValueFrom(this.http.get<PlayersResponse>(this.jsonPlayersUrl));
    const players: PlayerInterface[] = response.players;
    return players.sort((player, player2) => player2.cpm - player.cpm);
  }
}
