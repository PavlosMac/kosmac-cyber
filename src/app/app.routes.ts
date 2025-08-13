import { Routes } from '@angular/router';
import { AngularBlogComponent } from './blog/angular/angular';
import { SignalsComponent } from './blog/signals/signals';
import { AboutComponent } from './about/about';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'blog/angular', component: AngularBlogComponent },
  { path: 'blog/signals', component: SignalsComponent },
];
