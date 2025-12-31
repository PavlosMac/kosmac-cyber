import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kyber-crystals',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './kyber-crystals.html',
  styleUrl: './kyber-crystals.scss'
})
export class KyberCrystalsComponent {
  markdownPath = '/blog/kyber-crystals.md';
  private cdr = inject(ChangeDetectorRef);

  onMarkdownReady() {
    this.cdr.detectChanges();
  }
}