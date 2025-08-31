import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pqc-nginx',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './nginx-tls.html',
  styleUrl: './nginx-tls.scss'
})
export class NginxTlsComponent {
  markdownPath = 'blog/nginx-oqs-walkthrough.md';
  mermaidPath = 'mermaids/hybrid-tls.mermaid';
}
