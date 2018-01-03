import { Injectable } from "@angular/core";
import { Http, Response } from '@angular/http';
import { RecipeService } from "../recipes/recipe.service";
import { Recipe } from "../recipes/recipe.model";
import { forEach } from "@angular/router/src/utils/collection";
import { AuthService } from "../auth/auth.service";
import 'rxjs/add/operator/map';


@Injectable()
export class DataStorageService {
    constructor(private http: Http, private recipeService: RecipeService, private auService: AuthService) {
    }

    storeRecipes() {
        const token: string = this.auService.getToken();
        return this.http.put('https://recipebook-1adfd.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes());
    }

    getRecipes() {
        const token: string = this.auService.getToken();
        return this.http.get('https://recipebook-1adfd.firebaseio.com/recipes.json?auth=' + token)
            .map((response: Response) => {
                const recipes: Recipe[] = response.json();
                for (let recipe of recipes) {
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
            }
            );
    }
}