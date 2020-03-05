import { Injectable } from "@angular/core";
import { AngularFirestore, AngularFirestoreCollection } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { PostI } from '../shared/models/post.interface';
import { map, finalize } from "rxjs/operators";
import { FileI } from '../shared/models/file.interface';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
  providedIn: "root"
})
export class PostService {

  private filePath: any;
  private downloadURL: Observable<string>;

  private postCollection: AngularFirestoreCollection<PostI>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.postCollection = afs.collection<PostI>('posts');
  }

  getAllPosts(): Observable<PostI[]> {
    return this.postCollection
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => {
            const data = a.payload.doc.data() as PostI;
            const id = a.payload.doc.id;
            return { id, ...data };
          })
        )
      );
  }

  getPost(id: PostI): Observable<PostI> {
    return this.afs.doc<PostI>(`posts/${id}`).valueChanges();
  }

  public deletePostById(post: PostI) {
    return this.postCollection.doc(post.id).delete();
  }

  public editPostById(post: PostI) {
    return this.postCollection.doc(post.id).update(post);
  }

  public preAddUpdatePost(post: PostI, image: FileI): void {
    this.uploadImage(post, image);
  }

  private savePost(post: PostI) {
    const postObj = {
      titlePost: post.titlePost,
      contentPost: post.contentPost,
      imagePost: this.downloadURL,
      fileRef: this.filePath,
      tagsPost: post.tagsPost
    };
    this.postCollection.add(postObj);
  }

  private uploadImage(post: PostI, image: FileI) {
    this.filePath = `images/${image.name}`;
    const fileRef = this.storage.ref(this.filePath);
    const task = this.storage.upload(this.filePath, image);
    task.snapshotChanges()
    .pipe(
      finalize( () => {
        console.log('Subiendo');
        fileRef.getDownloadURL().subscribe( urlImage => {
          this.downloadURL = urlImage;
          this.savePost(post);
          console.log('URL_IMAGE', urlImage);
          console.log('POST', post);
          // CALL ADD POST
        });
      })
    ).subscribe();
  }
}
