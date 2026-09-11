import { Routes } from '@angular/router';
import { HomeLayout } from './nitro-keys/layout/HomeLayout/HomeLayout';
import { HomePage } from './nitro-keys/pages/HomePage/HomePage';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../app/nitro-keys/routes/auth.routes'),
  },
  {
    path: '',
    component: HomeLayout,
    // redireccion a races
    loadChildren: () => import('../app/nitro-keys/routes/races.routes'),
  },
];
