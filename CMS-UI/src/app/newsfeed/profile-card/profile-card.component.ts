import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  user:any
  constructor() { }

  ngOnInit(): void {
    this.loadUser()
  }

  loadUser(){
    const user = localStorage.getItem('user') as string;
    this.user = JSON.parse(user)
  }

}
