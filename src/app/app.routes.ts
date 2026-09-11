import { Routes } from '@angular/router';
import { HomeLayout } from './layout/HomeLayout/HomeLayout';
import { HomePage } from './pages/HomePage/HomePage';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/routes/auth.routes'),
  },
  {
    path: '',
    component: HomeLayout,
    // redireccion a races
    loadChildren: () => import('../app/routes/races.routes'),
  },
];
