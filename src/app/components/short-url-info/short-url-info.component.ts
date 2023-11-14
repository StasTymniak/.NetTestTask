import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-short-url-info',
  templateUrl: './short-url-info.component.html',
  styleUrls: ['./short-url-info.component.css']
})
export class ShortUrlInfoComponent {

  public id: string | null | undefined;
  public url: any
  constructor(private api: ApiService,private route: ActivatedRoute) {
  }

  ngOnInit(){
    this.id = this.route.snapshot.paramMap.get('id');
    this.api.getUrlById(<number><unknown>this.id)
      .subscribe(res => {
        this.url = res;
      });
  }
}
