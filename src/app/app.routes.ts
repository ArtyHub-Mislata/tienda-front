import { Routes } from '@angular/router';
import { ArtworkListPage } from './components/pages/artwork-list-page/artwork-list-page';
import { ArtworkPage } from './components/pages/artwork-page/artwork-page';
import { LoginPage } from './components/pages/login-page/login-page';
import { ProfilePage } from './components/pages/profile-page/profile-page';
import { loginGuardGuard } from './guards/login-guard-guard';
import { RegisterPage } from './components/pages/register-page/register-page';
import { UserPage } from './components/pages/user-page/user-page';

import { CarritoPage } from './components/pages/carrito-page/carrito-page';

import { PaymentPage } from './components/pages/payment-page/payment-page';
import { InitialPage } from './components/pages/initial-page/initial-page';

export const routes: Routes = [
  { path: '', component: InitialPage },

  { path: 'artworks', component: ArtworkListPage },
  { path: 'artworks/:id', component: ArtworkPage },

  { path: 'login', component: LoginPage },
  { path: 'register', component: RegisterPage },
  { path: 'profile', component: ProfilePage },
  { path: 'users/:id', component: UserPage },

  { path: 'cart', component: CarritoPage },

  { path: 'payment', component: PaymentPage },
];
