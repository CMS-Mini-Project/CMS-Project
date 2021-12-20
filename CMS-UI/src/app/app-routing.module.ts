import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth/auth.component';
import { ContentComponent } from './newsfeed/content/content.component';
import { FriendsComponent } from './newsfeed/friends/friends.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { ProfileFriendsComponent } from './profile/profile-friends/profile-friends.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAboutComponent } from './profile/user-about/user-about.component';

const routes: Routes = [
 {
   path:'',component:AuthComponent
 },
 {
   path:'home',component:NewsfeedComponent,
   children:[
     {
       path:'',component:ContentComponent
     },
     {
       path:'friends',component:FriendsComponent
     }
   ]
 },
 {
   path:'profile',component:ProfileComponent,
   children:[
     {
       path:'',component:UserAboutComponent
     },
     {
       path:'friends',component:ProfileFriendsComponent
     }
   ]
 }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
