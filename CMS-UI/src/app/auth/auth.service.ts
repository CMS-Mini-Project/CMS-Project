import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router,private http:HttpClient) { }

  login(data: any){
    return this.http.post<any>(environment.API+'/login',data);
  }

  register(data: any){
    return this.http.post<any>(environment.API+'/register',data);
  }

  getUser(){
    return this.http.get<any>(environment.API+'/user/get')
  }


}
     