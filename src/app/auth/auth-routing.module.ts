import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const authRouter: Route[] = [
    // { path: 'signup', component: SignupComponent },
    // { path: 'signin', component: SigninComponent }
];
@NgModule({
    imports: [RouterModule.forChild(authRouter)],
    exports: [RouterModule]
})
export class AuthRouterModule {

}
