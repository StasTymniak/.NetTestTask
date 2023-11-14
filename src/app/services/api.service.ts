import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:string = 'https://localhost:7080/api/Url/'
  constructor(private http : HttpClient,private router: Router) { }

  getUrls(){
    return this.http.get<any>(this.baseUrl)
  }


  addUrl(loginObj:any,username: string){
    return this.http.post<any>(`${this.baseUrl}${username}/shorturl`,loginObj)
  }

  deleteUrl(id:number){
    return this.http.delete(`${this.baseUrl}${id}`)
  }

  getUrlById(id:number){
    return this.http.get<any>(`${this.baseUrl}${id}`)
  }
}
