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

