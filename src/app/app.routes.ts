import { Routes } from '@angular/router';
import { ArtworkListPage } from './components/pages/artwork-list-page/artwork-list-page';
import { ArtworkPage } from './components/pages/artwork-page/artwork-page';
import { CategoryListPage } from './components/pages/category-list-page/category-list-page';
import { CategoryPage } from './components/pages/category-page/category-page';
import { LoginPage } from './components/pages/login-page/login-page';
import { LogoutPage } from './components/pages/logout-page/logout-page';
import { ProfilePage } from './components/pages/profile-page/profile-page';

export const routes: Routes = [
    {path: "", component: ArtworkListPage},

    {path: "artworks/:id", component: ArtworkPage, canActivate: [logInGuardGuard]},
    
    {path: "categories", component: CategoryListPage, canActivate: [logInGuardGuard]},
    {path: "categories/:id", component: CategoryPage, canActivate: [logInGuardGuard]},
    
    {path:"login", component: LoginPage},
    {path:"logout", component: LogoutPage},
    {path:"profile", component: ProfilePage}
];
