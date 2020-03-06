import { Component, OnInit, Input } from "@angular/core";

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PostService } from "../../../services/post.service";
import { PostI } from '../../../shared/models/post.interface';

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.scss"]
})
export class EditPostComponent implements OnInit {
  image: any;
  imageOriginal: any;

  @Input() post: PostI;

  constructor(private postService: PostService) {}

  editForm = new FormGroup({
    id: new FormControl("", Validators.required),
    titlePost: new FormControl("", Validators.required),
    contentPost: new FormControl("", Validators.required),
    tagsPost: new FormControl("", Validators.required),
    imagePost: new FormControl("", Validators.required)
  });

  ngOnInit(): void {
    this.image = this.post.imagePost;
    this.imageOriginal = this.post.imagePost;
    this.initValuesForm();
  }

  editPost(post: PostI) {

    console.log('Img', this.image);
    console.log('Original', this.imageOriginal);

    if (this.image === this.imageOriginal) {
      post.imagePost = this.imageOriginal;
      this.postService.editPostById(post);
    } else {
      this.postService.editPostById(post, this.image);
    }

  }

  handleImage(event: any) {
    this.image = event.target.files[0];
  }

  private initValuesForm(): void {
    this.editForm.patchValue({
      id: this.post.id,
      titlePost: this.post.titlePost,
      contentPost: this.post.contentPost,
      tagsPost: this.post.tagsPost
    });
  }

}
