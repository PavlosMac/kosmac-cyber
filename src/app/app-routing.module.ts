import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularBlogComponent } from './blog/angular/angular';
import { AboutComponent } from './about/about';
import { SignalsComponent } from './blog/signals/signals';

const routes: Routes = [
  { path: 'blog/angular', component: AngularBlogComponent },
  { path: 'blog/signals', component: SignalsComponent },
  { path: 'about', component: AboutComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
