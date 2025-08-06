
# Angular o Angular

After spending a few years now working on full-stack projects using Nuxt and Next, with Vue and React I suddenly realised how much I was missing Angular. I recently did a quick check on how things looked in v20 and regretted terribly not giving it a voice when starting a project 6 months ago. At the moment I am working on a NextJs project and it is very frustrating how chaotic things easily become. Files full of functions and a blurred landscape between server and client. Why on earth would it be a good thing having client and server code polluting one another?! 

Angular centralises logic and is good at doing those hard things we need it to do, for example making a refresh token request when we get a 401 THEN getting a new bearer token THEN retrying the original request that gave the original auth error. This is hard stuff, but Angular does it elegantly and beautifully using the HttpIntercepter class and centralising this logic in one place - fully atomic.

SSR frameworks cannot do this easily because the context is not global. With NextJs you need to delcare 'use client' or 'use server' when creating a file with a component. Creating one global fetch function and polluting the import chain with 'use client' or 'use server' was a bad idea and led know where, however I had no idea about this import chain. Global fetch was being imported by server and client code, which meant that although I could often test that refresh occurred, on a blue moon it would throw a 'Cookies can only be modified in server actions or a route handler' error.

Eventually solved this issue in NextJs by using a route on the server. This is where the Auth0 session is available. Solving this problem drove me insane as next did not indicate that this error has to do with a polluted import chain.


## Angular's Elegant Component Communication

Angular's way of moving data between components is wonderful compared to React, sorry React users! Take this component for instance:

```typescript
@Component({
....
})
export class RegistrationSearch implements OnInit {

  searchControl = new FormControl('');
  private defaultParams: Partial<ApiRegistrationBaseSearchParamsResponse> = {
    page: 0, 
    page_size: 100,
    sort_order:'desc',
    sort_by: 'timestamp'
  };
  
  constructor(
    private registrationService: RegistrationService,
  ) {}
  
  ngOnInit() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchTerm => 
        this.registrationService.searchRegistrations(searchTerm, this.defaultParams)
      )
    ).subscribe(results => {
      this.registrationService.updateResults(results);
    });
  }
}
```

When the component mounts a formControl is initialised an html input. Angular's formControl exposes an Observable, which is essentially a listener. As soon as the user types into that input we can capture that data and pipe it into a stream, using you guessed it a `pipe()` - simple, beautiful, elegant, READABLE.

With so little syntax we have achieved so much - whilst also having opened up the gate to Reactive programming and Angulars Houdini sidekick RxJS. We have now created an Observable stream. We can do anything we can with that data now, for example make a http request, the point is the stream is open and we can do things, quickly. 

Try achieving this in React and it will not look so nice. The `pipe()` offers us many operators and provides us a functional context to change data and manipulate streams.

To create this listener effect in React was less elegant.

```typescript
const handleSearchInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const searchTerm = e.target.value;
      setSearchInput(searchTerm);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      const trimmedTerm = searchTerm.trim();
      if (trimmedTerm.length >= 3 || trimmedTerm.length === 0) {
        // Set a new timer for 300ms
        debounceTimerRef.current = setTimeout(() => {
          executeSearch(trimmedTerm);
        }, 300);
      }
    },
    [executeSearch]
  );

  // Handle Enter key search (immediate)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();

        if (debounceTimerRef.current) {
          clearTimeout(debounceTimerRef.current);
          debounceTimerRef.current = null;
        }

        const searchTerm = searchInput.trim();
        executeSearch(searchTerm);
      }
    },
    [searchInput, executeSearch]
  );

  // Handle search mode change
  const handleSearchModeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMode = e.target.value as 'include' | 'exclude';
      setSearchMode(newMode);
      setSearchInput(''); // Clear search input

      onPageChange({
        search: undefined,
        species_exclude: undefined,
        page: 0 // Reset pagination when changing search type
      });
    },
    [onPageChange]
  );

```

You will also notice the component decorator in our Angular snippet.

```typescript
@Component({
....
})
```

I find it incredibly refreshing to view a component file and find this syntax, it is super declaritive. This is a component in React:

```typescript
export function RegistrationSearch = () => {
    return (
        <div>
            <input type="text" />
        </div>
    )
}
```

Its a function that returns JSX. So it is a component. And as much as React states that using functions has less overhead, how much overhead do we need to save on? Of course we can do this:

```typescript
import React, { Component } from 'react';

class ClassComponent extends Component {}
```
Or..
```typescript
import React from 'react';

class ClassComponent extends React.Component {}
```

But why have those options? Why have a million ways to do the same thing. This has to be a major advantage of so called opinionated frameworks like Angular. 


## React is a just library
Of course I don't want to overly bad mouth React, we can of course install Rxjs and combine it with React to achieve the same functionality. The difference being that Angular uses Rxjs under the hood and feels like it was 
built for easy integration with Rxjs. The Router and HttpClient both rely on Observables to achieve their core functionality.

Perhaps as a seasoned front-end developer, I have come to the conclusion that React is better for beginners, but it sucks for experienced developers. React is a library and does not fully take away the pain of Javascript programming, which Angular does.

