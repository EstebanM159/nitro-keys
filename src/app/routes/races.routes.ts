import { Routes } from '@angular/router';
import { HomePage } from '../pages/HomePage/HomePage';
import { RacePage } from '../pages/RacePage/RacePage';
import { LobbyPage } from '../pages/LobbyPage/LobbyPage';
import { FinishRace } from '../components/FinishRace/FinishRace';
import { RacesLayout } from '../layout/RacesLayout/RacesLayout';
import { BestPlayersPageComponent } from '../pages/BestPlayersPage/BestPlayersPage.component';
const raceRoutes: Routes = [
  {
    path: 'race',
    component: RacesLayout,
    children: [
      {
        path: '',
        component: RacePage,
      },
      { path: 'finishRace', component: FinishRace },
      { path: 'lobby', component: LobbyPage },
      { path: '**', redirectTo: 'race' },
    ],
  },
  { path: 'home', component: HomePage },
  {
    path: 'best-runners',
    component: BestPlayersPageComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
export default raceRoutes;
