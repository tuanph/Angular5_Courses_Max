import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';


@Injectable()
export class DataStorageService {
    constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
    }

    storeRecipes() {
        // const token: string = this.auService.getToken();
        // const headers: HttpHeaders = new HttpHeaders();
        // headers.set('Authorization', 'Bearer' + token);
        // const params: HttpParams = new HttpParams();
        // params.set('auth', token);
        return this.httpClient.put('https://recipebook-1adfd.firebaseio.com/recipes.json',
            this.recipeService.getRecipes(), {
                observe: 'body',
                // headers: headers,
                // params: params
            });
    }

    getRecipes() {
        // const token: string = this.auService.getToken();
        return this.httpClient.get('https://recipebook-1adfd.firebaseio.com/recipes.json')
            .map((recipes: Recipe[]) => {
                for (const recipe of recipes) {
                    if (!recipe['ingredients']) {
                        recipe['ingredients'] = [];
                    }
                }
                return recipes;
            })
            .subscribe(
            (recipes: Recipe[]) => {

                this.recipeService.setRecipes(recipes);
            },
            (error) => {
                console.log(error);
            });
    }
}
