import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user:any;
  constructor(private auth:AuthService) { }

  ngOnInit(): void {
    this.loadUser()
  }

  loadUser() {
    this.auth.getUser().subscribe({
      next: (res)=>{
        this.user = res.data;
      }
    })
  }

}
