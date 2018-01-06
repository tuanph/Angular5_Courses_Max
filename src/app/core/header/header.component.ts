import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private dataService: DataStorageService, public authService: AuthService) { }

  ngOnInit() {
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
