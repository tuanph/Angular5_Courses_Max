import { Ingredient } from "../shared/ingredient.model";
import { Subject } from "rxjs/Subject";

export class ShoppingListService {
    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5), new Ingredient('Tomatoes', 15)
    ];
    ingredientsChanged: Subject<Ingredient[]> = new Subject<Ingredient[]>();
    startEditing: Subject<number> = new Subject<number>();

    getIngredients() {
        return this.ingredients.slice();// return a copy of array
    }
    getIngredient(index: number) {
        return this.ingredients[index];// return a copy of array
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
    updateIngredient(index: number, ingredient: Ingredient) {
        this.ingredients[index] = ingredient;
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.ingredientsChanged.next(this.ingredients.slice());
    }
}