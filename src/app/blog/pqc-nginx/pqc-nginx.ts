import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pqc-nginx',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './pqc-nginx.html',
  styleUrl: './pqc-nginx.scss'
})
export class PqcNginxComponent {
  markdownPath = '/blog/post-quantum-nginx.md';
  mermaidPath = 'mermaids/hybrid-tls.mermaid';
  private cdr = inject(ChangeDetectorRef);

  onMarkdownReady() {
    this.cdr.detectChanges();
  }
}
