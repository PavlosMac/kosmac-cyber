import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularBlogComponent } from './blog/angular/angular';
import { AboutComponent } from './about/about';

const routes: Routes = [
  { path: 'blog/angular', component: AngularBlogComponent },
  { path: '', redirectTo: '/blog/angular', pathMatch: 'full' },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
