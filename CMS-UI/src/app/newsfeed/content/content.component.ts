import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NewsfeedService } from '../newsfeed.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  posts:any =[];
  selectedFile : any = null;
  data:any;
  user:any
  constructor(private newsFeed:NewsfeedService) { }

  ngOnInit(): void {
    this.loadData();
    this.loadUser();
  }

  loadData(){
    this.newsFeed.list().subscribe({
      next: (res)=> {
        console.log(res)
        this.posts = res.data
        this.posts.reverse()
      }
    })
  }
  loadUser(){
    const user = localStorage.getItem('user') as string;
    this.user = JSON.parse(user)
  }
  onFileChange(event:any){
    this.selectedFile = event.target.files[0]
  }

  createPost(caption:NgModel,file:NgModel){
    
    if(caption.value){
      if(this.selectedFile != null){

        this.data = new FormData();
        this.data.append('feed',this.selectedFile)
        console.log(this.selectedFile)
        this.data.set('caption',caption.value.trim());
      }else{
        this.data = {
          content:caption.value.trim()
        }
      }
      this.newsFeed.createPost(this.data).subscribe({
        next: (res) =>{
          this.loadData();
          alert("Content Posted")
        },
        error: (err)=>{
          alert("Content Posting Failed")
        } 
      })
      
      caption.reset()
      file.reset()
    }
    
  }

}
