import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import * as fromAppState from '../../store/app.reducers';
import * as fromAuthState from '../../auth/store/auth.reducers';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authState: Observer<fromAuthState.State>;
  constructor(private dataService: DataStorageService,
    public authService: AuthService,
    private store: Store<fromAppState.AppState>) { }

  ngOnInit() {
    this.authState = this.store.select('authState');
  }
  onSaveData() {
    this.dataService.storeRecipes()
      .subscribe((response) => {
        console.log('Fetch Data:' + response);
      });
  }
  onGetData() {
    this.dataService.getRecipes();
  }
  onLogOut() {
    this.authService.logOut();
  }

}
