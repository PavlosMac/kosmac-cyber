import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceCardComponent } from './service-card/service-card';

export interface Service {
  title: string;
  description: string;
  screenshot: string;
  technologies: string[];
  price?: string;
}

@Component({
  selector: 'app-services',
  imports: [CommonModule, ServiceCardComponent],
  templateUrl: './services.html',
  styleUrls: ['./services.scss']
})
export class ServicesComponent {
  services: Service[] = [
    {
      title: 'Auth0',
      description: 'Have the best token based authentication in the industry with Auth0 for scalability and ease of use - offering us developer friendly SDks and more.',
      screenshot: 'assets/screenshots/pqc-service.png',
      technologies: ['Auth0', 'Typescript', 'Javascript'],
      price: ''
    },
    {
      title: 'Angular Web Applications',
      description: 'Modern, reactive and responsive web applications built with Angular, Material/Boostrap using industry best practices.',
      screenshot: 'assets/screenshots/angular-service.png',
      technologies: ['Angular', 'TypeScript', 'Material Design', 'Bootstrap'],
      price: ''
    },
    {
      title: 'Python',
      description: 'High-performance REST APIs with Python FastAPI, async support, and comprehensive documentation.',
      screenshot: 'assets/screenshots/fastapi-service.png',
      technologies: ['Python', 'FastAPI'],
      price: ''
    },
  ];

  trackByTitle(index: number, service: Service): string {
    return service.title;
  }
}
