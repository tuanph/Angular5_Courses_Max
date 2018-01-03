import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { fail } from 'assert';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  editingSubscription: Subscription;
  indexEdited;
  public isEditMode = false;
  editedItem: Ingredient;
  @ViewChild('shoppingEditForm') editSplForm: NgForm;
  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.editingSubscription = this.shoppingListService.startEditing
      .subscribe((index: Number) => {
        this.isEditMode = true;
        this.indexEdited = index;
        this.editedItem = this.shoppingListService.getIngredient(this.indexEdited);
        this.editSplForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      });
  }

  ngOnDestroy() {
    this.editingSubscription.unsubscribe();
  }
  AddIngredient(form: NgForm) {
    const value = form.value;
    const ingredient = new Ingredient(value.name, value.amount);
    if (this.isEditMode) {
      this.shoppingListService.updateIngredient(this.indexEdited, ingredient);
    } else {
      this.shoppingListService.addIngredient(ingredient);

    }
    this.onClear();
  }
  onClear() {
    this.editSplForm.reset();
    this.isEditMode = false;
  }
  onDelete() {
    this.shoppingListService.deleteIngredient(this.indexEdited);
    this.onClear();
  }

}
