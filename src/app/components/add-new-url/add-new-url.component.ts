import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-add-new-url',
  templateUrl: './add-new-url.component.html',
  styleUrls: ['./add-new-url.component.css']
})
export class AddNewUrlComponent {
  public userName: string = "";
  public addUrlForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private userStore: UserStoreService, private api: ApiService) { }

  ngOnInit() {
    this.addUrlForm = this.fb.group({
      url: ['', Validators.required],
    })

    this.userStore.getFullNameFromStore()
      .subscribe(val => {
        const fullNameFromToken = this.auth.getUsernameFromToken();
        this.userName = val || fullNameFromToken
      });
  }

  addNewUrl() {
    if (this.addUrlForm.valid) {
      console.log(this.addUrlForm.value)
      this.api.addUrl(this.addUrlForm.value,this.userName)
        .subscribe({
          next: (res) => {
            // alert(res.message);
            console.log(res.url)
            this.addUrlForm.reset();
            
          },
          error: (err) => {
            alert(err?.error.message);
            this.addUrlForm.reset();
          }
        })
    }
  }
}
