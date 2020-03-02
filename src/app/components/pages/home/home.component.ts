import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';
import { PostI } from 'src/app/shared/models/post.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  posts$: Observable <PostI[]>;


  constructor(private postService: PostService) { }

  ngOnInit(): void {
    // this.postS.getAllPosts().subscribe( resp => console.log(resp));
    this.posts$ = this.postService.getAllPosts();
  }

}
