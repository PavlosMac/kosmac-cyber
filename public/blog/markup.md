
# Angular ow Angular where have you been these years?

After spending a few years now working on full-stack projects using Nuxt and Next, with Vue and React I suddenly realised how much I was missing Angular. I recently did a quick check on how things looked in v20 and regretted terribly not giving it a voice when starting a project 6 months ago. At the moment I am working on a NextJs project and it is very frustrating how chaotic things easily become. Files full of functions and a blurred landscape between server and client. Why on earth would it be a good thing having client and server code polluting one another?! 

Angular centralises logic and is good at doing those hard things we need it to do, for example making a refresh token request when we get a 401 THEN getting a new bearer token THEN retrying the original request that gave the original auth error. This is hard stuff, but Angular does it elegantly and beautifully using the HttpIntercepter class and centralising this logic in one place, fully atomic.

## The SSR Challenge

SSR frameworks cannot do this easily because the context is not global, it is a dual paradigm and things become messy. Also caching becomes a concern. I eventually solved this issue in NextJs by using a route on the server. This is where the Auth0 session is available, otherwise I was ending up with strange errors. Solving this problem drove me insane and these are known issues with NextJs. It didn't help that I ended up vibe coding every possible Nextjs solution for this, not realising that 'use client' or lack there of was polluting the import chain somewhere meaning that the fetch was accessing the session somewhere it wasn't supposed to.

## Angular's Elegant Component Communication

Angular's way of moving data between components is literally beautiful compared to React, sorry React users! Take this component for instance:

```typescript
@Component({
  selector: 'app-registration-search',
  imports: [ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './registration-search.html',
  styleUrl: './registration-search.less'
})
export class RegistrationSearch implements OnInit {

  searchControl = new FormControl('');
  private defaultParams: Partial<ApiRegistrationBaseSearchParamsResponse> = {
    location_id: '68303cfb250b2f501df68026',
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

With so little syntax we have achieved so much - whilst also opened the gate to Reactive programming Angulars Houdini sidekick RxJS. We have now created an Observable stream. We can do anything we can with that data now, for example make a http request, the point is the stream is open and we can do things, quickly. 

Try achieving this in React and it will not look so nice. The `pipe()` offers us many operators and provides us a functional context to change data and manipulate streams.

## Visualization and Mental Models

Maybe I just need to visualise front-end programming more. I can visualise Pipes piping data between components and via the fibre to get or push data to our APIs. But I cannot read React's useState syntax so easily, or use HTTP interceptors for refreshing tokens as elegantly as Angular allows.

Angular's approach to state management, dependency injection, and reactive programming creates a mental model that's both powerful and intuitive. After working with it again, I'm reminded why it remains one of the most robust frameworks for complex applications.

