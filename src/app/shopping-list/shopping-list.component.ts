import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as ShoppingListActions from '../shopping-list/ngrx-store/shopping-list.actions';
import * as fromApp from '../store/app.reducers';
import { Ingredient } from './../shared/ingredient.model';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  shopingListState: Observable<{ ingredients: Ingredient[] }>;
  // shopingListState: Observable<shoppingListState.State>;
  constructor(private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.shopingListState = this.store.select('shoppingListState');
    this.shopingListState.subscribe(data => {
      console.log(data);
    });
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
