export interface PlayersResponse {
  players: PlayerInterface[];
}

export interface PlayerInterface {
  id: string;
  username: string;
  country: string;
  avatarColor: string;
  level: number;
  cpm: number;
  accuracy: number;
  racesCompleted: number;
  racesWon: number;
  isOnline: boolean;
  joinedAt: Date;
}
