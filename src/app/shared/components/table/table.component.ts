import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PostService } from '../../../services/post.service';
import { PostI } from '../../models/post.interface';

import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  displayedColumns: string[] = ['titlePost', 'tagsPost', 'Actions'];
  dataSource = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  constructor(private postService: PostService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(posts => this.dataSource.data = posts);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onEditPost(post: PostI) {
    console.log(post, 'Edit');
  }

  onDeletePost(post: PostI) {
    console.log(post, 'Delete');

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.postService.deletePostById(post).then( () => {
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }).catch( err => { console.log('Error', err )});
      }
    });
  }

  onNewPost() {
    // console.log('New Post');
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent);
    dialogRef.afterClosed().subscribe( resp => {
      console.log(`Dialog result ${resp}`);
    });
  }
}
