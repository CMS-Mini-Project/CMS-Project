import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/utilities/interceptor/loading.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  error: boolean = false;
  success: boolean = false;
  message: string = '';
  constructor(
    private auth: AuthService,
    private router: Router,
    public loading: LoadingService
  ) {}

  ngOnInit(): void {}

  register(form: NgForm) {
    let data = {
      email: form.value.email.trim(),
      username: form.value.username.trim(),
      password: form.value.password.trim(),
      confirm: form.value.confirm.trim(),
      firstname: form.value.firstname.trim(),
      lastname: form.value.lastname.trim(),
    };

    if(data.confirm != data.password) {

      this.error = true;
      this.message = 'Password Miss match';
      form.resetForm();
      setTimeout(() => {
        this.error = false;
      }, 3000);
    } else {
      
      
      this.auth.register(data).subscribe({
        next: (res) => {
          this.success = true;
          this.message = 'User Registered';
          form.resetForm();
          setTimeout(() => {
            this.router.navigate(['']);
          }, 3000);
        },
        error: (err)=> {
          this.error = true;
          this.message = 'Email or Username already Exist';
          form.resetForm();
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      }
        
      );
    }
  }

  loginForm(form:NgForm){
    let data = {
      email:form.value.email.trim(),
      password:form.value.password.trim()
    }
    this.auth.login(data).subscribe(
      {
        next: (res) =>{
          localStorage.setItem('token',res.token)
          localStorage.setItem('user',res.user)
          this.router.navigate(['home'])
         
        },
        error:(err) =>{
          this.error = true;
          this.message = 'Wrong Email or Password';
          form.resetForm();
          setTimeout(() => {
            this.error = false;
          }, 3000);
        }
      }
    )
  }
}
