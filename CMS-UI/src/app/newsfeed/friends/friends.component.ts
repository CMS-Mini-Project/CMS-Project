import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from '../newsfeed.service';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {
  followings:any = []
  constructor(private newsFeed:NewsfeedService) { }

  ngOnInit(): void {
    this.following();
  }

  following(){
    const user = JSON.parse(localStorage.getItem('user') as string)
    this.newsFeed.listFolloings().subscribe({
      next: (res)=>{
        res.data.forEach((item:any)=>{
          if(user.following.includes(item._id)){
            console.log()
            this.followings.push(item)
          }

        })
      }
    })
  }

}
