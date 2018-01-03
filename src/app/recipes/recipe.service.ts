import { Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class RecipeService {
    recipesChanged = new Subject();
    private recipes: Recipe[] = [
        new Recipe(
            'Drink',
            'For Drink',
            'https://financialtribune.com/sites/default/files/field/image/17january/04-ff-coffee_120-ab.jpg',
            [
                new Ingredient('Milk Cofee', 12),
                new Ingredient('Hot Cofee', 22)
            ]
        ),
        new Recipe(
            'Quick food',
            'Not good for your Helth',
            'https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/2:1/w_1260%2Ch_630/the-ultimate-hamburger.jpg',
            [
                new Ingredient('Chicken Rice', 50),
                new Ingredient('Big Size', 27)
            ]
        )
    ];


    constructor(private shoppingListService: ShoppingListService) {
    }

    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;// return a copy of array
        this.recipesChanged.next(this.recipes.slice());
    }


    getRecipe(index: number): Recipe {
        return this.recipes.slice()[index];// return a copy of array
    }

    getRecipes() {
        return this.recipes.slice();// return a copy of array
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, recipe: Recipe) {
        this.recipes[index] = recipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}