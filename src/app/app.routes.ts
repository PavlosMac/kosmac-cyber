import { Routes } from '@angular/router';
import { AngularBlogComponent } from './blog/angular/angular';
import { SignalsComponent } from './blog/signals/signals';
import { PqcNginxComponent } from './blog/pqc-nginx/pqc-nginx';
import { AboutComponent } from './about/about';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'blog/angular', component: AngularBlogComponent },
  { path: 'blog/signals', component: SignalsComponent },
  { path: 'blog/pqc-nginx', component: PqcNginxComponent },
];
