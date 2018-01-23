import { Ingredient } from './../../shared/ingredient.model';
import * as ShoppingListACtions from './shopping-list.actions';


export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}
const innitialState: State = {
    ingredients: [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 15)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function ShoppingListReducer(state = innitialState, action: ShoppingListACtions.ShoppingListACtions) {
    switch (action.type) {
        case ShoppingListACtions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            };
        case ShoppingListACtions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            };
        case ShoppingListACtions.UPDATE_INGREDIENT:
            const oldIngredient = state.ingredients[state.editedIngredientIndex];
            const updateIngredient = {
                ...oldIngredient,
                ...action.payload.ingredient
            };
            const newIngredientsAfterUpdate = [...state.ingredients];
            newIngredientsAfterUpdate[state.editedIngredientIndex] = updateIngredient;
            return {
                ...state,
                ingredients: newIngredientsAfterUpdate,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListACtions.DELETE_INGREDIENT:
            const oldIngredients = [...state.ingredients];
            oldIngredients.splice(state.editedIngredientIndex, 1);
            return {
                ...state,
                ingredients: oldIngredients,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        case ShoppingListACtions.START_EDIT:
            const editedIngredient = { ...state.ingredients[action.payload] };
            return {
                ...state,
                editedIngredient: editedIngredient,
                editedIngredientIndex: action.payload
            };
        case ShoppingListACtions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIndex: -1
            };
        default:
            return state;
    }
}
