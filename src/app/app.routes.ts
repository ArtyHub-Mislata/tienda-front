import { Routes } from '@angular/router';
import { ArtworkListPage } from './components/pages/artwork-list-page/artwork-list-page';
import { ArtworkPage } from './components/pages/artwork-page/artwork-page';
import { LoginPage } from './components/pages/login-page/login-page';
import { ProfilePage } from './components/pages/profile-page/profile-page';
import { loginGuardGuard } from './guards/login-guard-guard';
import { RegisterPage } from './components/pages/register-page/register-page';

export const routes: Routes = [
    {path: "", component: ArtworkListPage},

    {path: "artworks/:id", component: ArtworkPage, canActivate: [loginGuardGuard]},
    
    {path:"login", component: LoginPage},
    {path:"register", component: RegisterPage},
    {path:"profile", component: ProfilePage}
];
