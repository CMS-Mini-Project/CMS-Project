import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthComponent } from './auth/auth/auth.component'
import { InterceptorService } from './utilities/interceptor/interceptor.service';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { SideNavComponent } from './newsfeed/side-nav/side-nav.component';
import { ProfileCardComponent } from './newsfeed/profile-card/profile-card.component';
import { ContentComponent } from './newsfeed/content/content.component';
import { RightSideNavComponent } from './newsfeed/right-side-nav/right-side-nav.component';
import { FriendsComponent } from './newsfeed/friends/friends.component';
import { ProfileComponent } from './profile/profile.component';
import { UserAboutComponent } from './profile/user-about/user-about.component';
import { ProfileFriendsComponent } from './profile/profile-friends/profile-friends.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NewsfeedComponent,
    TopNavComponent,
    SideNavComponent,
    ProfileCardComponent,
    ContentComponent,
    RightSideNavComponent,
    FriendsComponent,
    ProfileComponent,
    UserAboutComponent,
    ProfileFriendsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSnackBarModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,useClass:InterceptorService,multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
