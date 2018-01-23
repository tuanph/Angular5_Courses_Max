
import * as fromShoppingListState from '../shopping-list/ngrx-store/shopping-list.reducers';
import * as fromAuthState from '../auth/store/auth.reducers';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
    shoppingListState: fromShoppingListState.State;
    authState: fromAuthState.State;
}

export const reducers: ActionReducerMap<AppState> = {
    shoppingListState: fromShoppingListState.ShoppingListReducer,
    authState: fromAuthState.authReducer
};
