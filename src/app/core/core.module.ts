import { AuthInterceptor } from '../shared/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { AuthService } from '../auth/auth.service';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { SharedModule } from './../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoggingInterceptor } from '../shared/logging.interceptor';

@NgModule({
    imports: [
        SharedModule,
        AppRoutingModule
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    declarations: [
        HeaderComponent,
        HomeComponent
    ],
    providers: [
        ShoppingListService,
        RecipeService,
        AuthService,
        DataStorageService,
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
        },
        {
            provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true,
        }
    ],
})
export class CoreModule {

}
