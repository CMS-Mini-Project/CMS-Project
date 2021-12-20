import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-user-about',
  templateUrl: './user-about.component.html',
  styleUrls: ['./user-about.component.css'],
})
export class UserAboutComponent implements OnInit {
  user: any;
  error: boolean = false;
  success: boolean = false;
  message: string = '';
  constructor(private auth:AuthService) {}

  ngOnInit(): void {
    this.loadUser();
  }
  updateUserDetails(form: NgForm) {
    let data = {
      email: form.value.email.trim(),
      username: form.value.username.trim(),
      password: form.value.password.trim(),
      confirm: form.value.confirm.trim(),
      firstname: form.value.firstname.trim(),
      lastname: form.value.lastname.trim(),
    };

    if (data.confirm != data.password) {
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
          this.message = 'User Updated';
          this.loadUser();
          form.resetForm();
          setTimeout(() => {
             
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
  loadUser() {
    this.auth.getUser().subscribe({
      next: (res)=>{
        console.log(res)
        this.user = res.data
      }
    })
  }
}
