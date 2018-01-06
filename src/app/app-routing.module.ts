import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth-guad.service';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent },
    { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {
}
