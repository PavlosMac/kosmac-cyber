import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
  selector: 'app-signals',
  imports: [MarkdownComponent],
  templateUrl: './signals.html',
  styleUrl: './signals.scss'
})
export class SignalsComponent {
  markdownPath = '/blog/signals.md';
  private cdr = inject(ChangeDetectorRef);

  onMarkdownReady() {
    this.cdr.detectChanges();
  }
}
