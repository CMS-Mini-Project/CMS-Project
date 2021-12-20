import { Component, OnInit } from '@angular/core';
import { NewsfeedService } from 'src/app/newsfeed/newsfeed.service';

@Component({
  selector: 'app-profile-friends',
  templateUrl: './profile-friends.component.html',
  styleUrls: ['./profile-friends.component.css']
})
export class ProfileFriendsComponent implements OnInit {
  followings:any = [];
  constructor(private newsFeed:NewsfeedService) { }

  ngOnInit(): void {
    this.following()
  }
  following(){
    const user = JSON.parse(localStorage.getItem('user') as string)
    this.newsFeed.listFolloings().subscribe({
      next: (res)=>{
        res.data.forEach((item:any)=>{
          if(user.following.includes(item._id)){
            console.log(item)
            this.followings.push(item)
          }

        })
      }
    })
  }


}
