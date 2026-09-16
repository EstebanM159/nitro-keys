import { Routes } from '@angular/router';
// import { LobbyPage } from '../pages/LobbyPage/LobbyPage';
import { FinishRace } from '../components/FinishRace/FinishRace';
import { RacesLayout } from '../layout/RacesLayout/RacesLayout';

const raceRoutes: Routes = [
  {
    path: 'race',
    component: RacesLayout,
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/RacePage/RacePage'),
      },
      { path: 'finishRace', component: FinishRace },
      // { path: 'lobby', component: LobbyPage },
      { path: '**', redirectTo: 'race' },
    ],
  },
  {
    path: 'practice',
    loadComponent: () => import('../pages/PracticeLobbyPage/PracticeLobbyPage.component'),
  },
  { path: 'home', loadComponent: () => import('../pages/HomePage/HomePage') },
  {
    path: 'best-runners',
    loadComponent: () => import('../pages/BestPlayersPage/BestPlayersPage.component'),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];
export default raceRoutes;
