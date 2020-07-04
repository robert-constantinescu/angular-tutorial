import {Component, OnDestroy, OnInit} from "@angular/core";
import {DataStorageService} from "../shared/data-storage.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'

})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false
  private userSubscription: Subscription;

  constructor(private dataStorageService: DataStorageService,
              private authService: AuthService){}

  ngOnInit(): void {
    this.userSubscription = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user; //some angular feature, search the web for explanation
        console.log(!user);
        console.log(!!user);
      }
    );
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
