import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-short-urls-table',
  templateUrl: './short-urls-table.component.html',
  styleUrls: ['./short-urls-table.component.css']
})
export class ShortUrlsTableComponent {
  public urls:any = []
  public userName: string = "";
  public userRole: string = "";
  public isLoggedIn: boolean;
  constructor(private api: ApiService, private auth: AuthService, private router: Router,private userStore: UserStoreService) {
    this.isLoggedIn = auth.isLoggedIn();
  }
  ngOnInit() {
    this.api.getUrls()
      .subscribe(res => {
        this.urls = res;
      });

    this.userStore.getFullNameFromStore()
    .subscribe(val =>{
      let userNameFromToken = this.auth.getUsernameFromToken()
      this.userName = val || userNameFromToken
    });
    this.userStore.getRoleFromStore()
    .subscribe(val=>{
      const roleFromToken = this.auth.getRoleFromToken();
      this.userRole = val || roleFromToken;
    });
  }
  infoClick(id:number ){
    console.log(id)
    this.router.navigate([`shortinfo/${id}`])
  }

  refresh(){
    this.api.getUrls()
      .subscribe(res => {
        this.urls = res;
      });
  }

  deleteClick(id: number){
    this.api.deleteUrl(id)
    .subscribe(()=>{  
      this.refresh()
    })
  }
}
