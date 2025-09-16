import { Routes } from '@angular/router';
import { AngularBlogComponent } from './blog/angular/angular';
import { SignalsComponent } from './blog/signals/signals';
import { PqcNginxComponent } from './blog/pqc-nginx/pqc-nginx';
import { NginxTlsComponent } from './blog/nginx-tls/nginx-tls';
import { KyberCrystalsComponent } from './blog/kyber-crystals/kyber-crystals';
import { AboutComponent } from './about/about';
import { ServicesComponent } from './services/services';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'blog/angular', component: AngularBlogComponent },
  { path: 'blog/signals', component: SignalsComponent },
  { path: 'blog/pqc-nginx', component: PqcNginxComponent },
  { path: 'blog/tls-nginx', component: NginxTlsComponent },
  { path: 'blog/kyber-crystals', component: KyberCrystalsComponent },
  { path: 'services', component: ServicesComponent },
];
