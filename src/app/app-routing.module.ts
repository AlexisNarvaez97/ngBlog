import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostComponent } from './components/posts/post/post.component';

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./components/pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "post/:id",
    component: PostComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
