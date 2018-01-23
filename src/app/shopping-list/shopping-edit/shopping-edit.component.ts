import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Ingredient } from '../../shared/ingredient.model';
import * as ShoppingListActions from '../ngrx-store/shopping-list.actions';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  public isEditMode = false;
  editedItem: Ingredient;
  @ViewChild('shoppingEditForm') editSplForm: NgForm;
  constructor(private store: Store<fromApp.AppState>) { }
  subscription: Subscription;
  ngOnInit() {
    this.subscription = this.store.select('shoppingListState')
      .subscribe(
      data => {
        console.log(data);
        if (data != null && data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.isEditMode = true;
          this.editSplForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.isEditMode = false;
        }
      });
    // this.editingSubscription = this.shoppingListService.startEditing
    //   .subscribe((index: Number) => {
    //     this.isEditMode = true;
    //     this.editedItem = this.shoppingListService.getIngredient(this.indexEdited);
    //     this.editSplForm.setValue({
    //       name: this.editedItem.name,
    //       amount: this.editedItem.amount
    //     });
    //   });
  }


  AddIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.isEditMode) {
      // this.shoppingListService.updateIngredient(this.indexEdited, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngretient({ ingredient: ingredient }));
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngretient(ingredient));
    }
    this.onClear();
  }
  onClear() {
    this.editSplForm.reset();
    this.isEditMode = false;
  }
  onDelete() {
    // this.shoppingListService.deleteIngredient(this.indexEdited);
    this.store.dispatch(new ShoppingListActions.DeleteIngretient());
    this.onClear();
  }

  public ngOnDestroy(): void {
    this.store.dispatch(new ShoppingListActions.StopEdit());
    this.subscription.unsubscribe();
  }
}
