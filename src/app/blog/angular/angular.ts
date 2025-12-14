import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './angular.html',
  styleUrl: './angular.scss'
})
export class AngularBlogComponent {
  // Path to the markdown file relative to the deployed assets
  markdownPath = '/blog/angular.md';
}
