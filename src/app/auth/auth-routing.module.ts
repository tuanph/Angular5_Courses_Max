import { NgModule } from "@angular/core";
import { RouterModule, Route } from "@angular/router";
import { SignupComponent } from "./signup/signup.component";
import { SigninComponent } from "./signin/signin.component";

const authRouter: Route[] = [
    { path: 'signup', component: SignupComponent },
    { path: 'signin', component: SigninComponent }
];
@NgModule({
    imports: [RouterModule.forChild(authRouter)],
    exports: [RouterModule]
})
export class AuthRouterModule {

}