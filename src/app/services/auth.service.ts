import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl:string = 'https://localhost:7080/api/User/';
  private userPayload: any;
  constructor(private htpp : HttpClient,private router: Router) { 
    this.userPayload = this.decodedToken();
  }

  singUp(userObj:any){
    return this.htpp.post<any>(`${this.baseUrl}register`,userObj)
  }
  singOut(){
    localStorage.clear()
    this.router.navigate(['login'])
  }
  login(loginObj:any){
    return this.htpp.post<any>(`${this.baseUrl}authenticate`,loginObj)
  }

  storeToken(tokenValue: string){
    localStorage.setItem('token',tokenValue)
  }
  getToken(){
    return localStorage.getItem('token')
  }

  decodedToken(){
    const jwtHelper = new JwtHelperService();
    const token = this.getToken()!;
    console.log(jwtHelper.decodeToken(token))
    return jwtHelper.decodeToken(token)
  }

  getUsernameFromToken(){
    if(this.userPayload)
    return this.userPayload.unique_name;
  }

  getRoleFromToken(){
    if(this.userPayload)
    return this.userPayload.role;
  }

  isLoggedIn(): boolean{
    if (localStorage.getItem("token") === null) {
      return false
    }
    else{
      return true
    }
  }
}
