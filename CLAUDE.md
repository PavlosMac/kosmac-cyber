# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Development Server
```bash
ng serve
# or
npm start
```
Starts the Angular development server on http://localhost:4200

### Building
```bash
ng build                    # Production build
ng build --watch --configuration development  # Development build with watch mode
# or
npm run build              # Production build
npm run watch              # Development build with watch mode
```

### Testing
```bash
ng test                    # Run unit tests with Karma
# or
npm test
```

### Server-Side Rendering
```bash
npm run serve:ssr:kosmac-cyber    # Serve the SSR application
```

## Architecture Overview

This is an Angular 20 application using:
- **Standalone Components**: No NgModules, all components are standalone
- **Zoneless Architecture**: Uses `provideZonelessChangeDetection()` instead of Zone.js
- **Server-Side Rendering (SSR)**: Full SSR setup with Express.js backend
- **Signals**: Modern Angular signals for state management
- **TypeScript 5.8**: Latest TypeScript with strict type checking

### Key Files Structure
- `src/app/app.ts`: Root component using standalone architecture with signals
- `src/app/app.config.ts`: Application configuration with zoneless change detection
- `src/app/app.routes.ts`: Route definitions (currently empty)
- `src/server.ts`: Express server for SSR with Angular Node App Engine
- `angular.json`: Angular CLI configuration with SSR and build optimizations

### Key modules
- `ngx-markdown` for markdown rendering in components
- documentation: https://www.npmjs.com/package/ngx-markdown

### Development Practices (from best-practices.md)
- Use standalone components (never set `standalone: true` explicitly)
- Use `input()` and `output()` functions instead of decorators
- Use signals and `computed()` for state management
- Set `changeDetection: ChangeDetectionStrategy.OnPush`
- Use native control flow (`@if`, `@for`, `@switch`) instead of structural directives
- Use `inject()` function instead of constructor injection
- Use `class` and `style` bindings instead of `ngClass`/`ngStyle`
- Prefer reactive forms over template-driven forms

### TypeScript Configuration
- Strict type checking enabled
- Separate configs for app (`tsconfig.app.json`) and specs (`tsconfig.spec.json`)

### Build Configuration
- Production builds are optimized with bundle budgets (500kB warning, 1MB error)
- Development builds include source maps and no optimization

## Blog Creation Pattern

To create a new blog post, follow this established pattern:

### 1. Create Blog Component Files
Create a new directory under `src/app/blog/[blog-name]/` with these files:

**TypeScript Component** (`[blog-name].ts`):
```typescript
import { Component } from '@angular/core';
import { MarkdownModule } from 'ngx-markdown';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-[blog-name]',
  imports: [CommonModule, MarkdownModule],
  templateUrl: './[blog-name].html',
  styleUrl: './[blog-name].scss'
})
export class [BlogName]Component {
  markdownPath = 'blog/[blog-name].md';
}
```

**HTML Template** (`[blog-name].html`):
```html
<div class="blog-content">
  <markdown [src]="markdownPath" emoji></markdown>
</div>
```

**SCSS Styles** (`[blog-name].scss`):
```scss
.blog-header {
  text-align: center;
  padding: 2rem 0;
}
```

### 2. Add Route
Update `src/app/app.routes.ts`:
- Import the component: `import { [BlogName]Component } from './blog/[blog-name]/[blog-name]';`
- Add route: `{ path: 'blog/[blog-name]', component: [BlogName]Component }`

### 3. Update Navigation
Add navigation link in `src/app/navbar/navbar.html`:
```html
<a mat-list-item routerLink="/blog/[blog-name]" routerLinkActive="active" (click)="toggleDrawer()">
  <mat-icon matListItemIcon>article</mat-icon>
  <span matListItemTitle>[Blog Title]</span>
</a>
```

### 4. Create Markdown Content
Place the markdown file in `public/blog/[blog-name].md` with your blog content.

