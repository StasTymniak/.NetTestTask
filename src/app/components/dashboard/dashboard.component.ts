import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public isLoggedIn: boolean;
  public userName: string = "";
  constructor(private auth: AuthService, private router: Router,private userStore: UserStoreService) { 
    this.isLoggedIn = auth.isLoggedIn(); 
  }
  ngOnInit() {
    
    this.userStore.getFullNameFromStore()
    .subscribe(val =>{
      let userNameFromToken = this.auth.getUsernameFromToken()
      this.userName = val || userNameFromToken
    });
  }

  logout() {
    this.auth.singOut()
  }
}




