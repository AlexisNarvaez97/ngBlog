import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewPostComponent } from './components/posts/new-post/new-post.component';
import { NewPostModule } from './components/posts/new-post/new-post.module';
import { PostComponent } from './components/posts/post/post.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    NewPostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NewPostModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
