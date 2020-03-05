import { Component, OnInit } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../../../services/post.service";

@Component({
  selector: "app-new-post",
  templateUrl: "./new-post.component.html",
  styleUrls: ["./new-post.component.scss"]
})
export class NewPostComponent implements OnInit {

  imagePost: any;

  constructor(private postService: PostService) {}

  postForm = new FormGroup({
    titlePost: new FormControl('', Validators.required),
    contentPost: new FormControl('', Validators.required),
    tagsPost: new FormControl('', Validators.required),
    imagePost: new FormControl('', Validators.required),
  });

  ngOnInit(): void {}


  addNewPost(form) {
    console.log('Form', form);
    this.postService.preAddUpdatePost(form, this.imagePost);
  }

  handleImage(e: any): void {
    this.imagePost = e.target.files[0];
    console.log(this.imagePost);
  }

}
