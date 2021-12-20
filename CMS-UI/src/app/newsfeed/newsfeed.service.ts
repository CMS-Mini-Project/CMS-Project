import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedService {

  constructor(private http:HttpClient) { }

  createPost(data:any){
    return this.http.post<any>(environment.API+'/post/create',data)
  }

  list(){
    return this.http.get<any>(environment.API+'/post/list');
  }
  listFolloings(){
    return this.http.get<any>(environment.API+'/user/list');
  }
}
