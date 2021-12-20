import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from './loading.service';
 

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {
  private authToken = '';

  constructor( private router:Router,private loading:LoadingService,private snackbar:MatSnackBar) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     this.loading.isLoading.next(true)
    //fetching token
    this.getToken();
    //adding token to the request
    let tokenizedReq = req.clone({
      headers:req.headers.set('x-access-token',this.authToken)
    })
    return next.handle(tokenizedReq).pipe(
      catchError(
        (error:HttpErrorResponse) => {
          if (error instanceof HttpErrorResponse) {
            if (error.error.code === 401) {
              localStorage.clear();
              this.router.navigate(['/']);
            }
          }
          return throwError(()=> (error.statusText))
        }
      ), 
      finalize(
        ()=>{
          this.loading.isLoading.next(false);
        }
      )
    );
  }
  //loading token from local storage
  private getToken(){
    let token = localStorage.getItem('token');
    if(token){
      this.authToken = token;
    }
  }
}
