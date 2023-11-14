import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormGroupDirective  } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserStoreService } from 'src/app/services/user-store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm!: FormGroup;
  constructor(private fb: FormBuilder,private auth: AuthService,private router: Router,private userStore: UserStoreService){

  }
  ngOnInit(): void{
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }
  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          // alert(res.message);
          this.loginForm.reset();
          console.log(res.token)
          this.auth.storeToken(res.token)
          const tokenPayload = this.auth.decodedToken();
          this.userStore.setFullNameForStore(tokenPayload.unique_name);
          this.userStore.setRoleForStore(tokenPayload.role);
          this.router.navigate(['dashboard'])
        },
        error:(err)=>{
          alert(err?.error.message);
        }
      })

    } else {
      console.log('Form is not valid');
      
    }
  }
}
