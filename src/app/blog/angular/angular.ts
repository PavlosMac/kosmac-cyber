import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './angular.html',
  styleUrl: './angular.scss'
})
export class AngularBlogComponent {
  markdownPath = '/blog/angular.md';
  private cdr = inject(ChangeDetectorRef);

  onMarkdownReady() {
    this.cdr.detectChanges();
  }
}
