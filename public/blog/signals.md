# Signals in Angular

When I left Angular development 3 years ago, signals were not a thing, so I was excited to see what they can do. Signals seem to offer us reactive state as an angular primitive - I like the sound of anything reactive.

I could see easily how Signals could replace BehaviorSubjects and other similar state management `Rxjs` operators. But what was even more interesting was how it could be used in place of combineLatest operator. Those who are familiar with combineLatest 
will have come across this moment where one event emission causes side effects, double emissions essentially - this is the diamond problem.

```
                    sourceA$
                       |
                       v
                   +-------+
                   | map() |
                   +-------+
                  /         \
                 v           v
            +--------+   +--------+
            | derivA |   | derivB |
            +--------+   +--------+
                 \           /
                  v         v
               +----------------+
               | combineLatest  |
               |   [derivA,     |
               |    derivB]     |
               +----------------+
                       |
                       v
                   computed
                   
The Diamond Problem:
When sourceA$ emits → derivA updates → combineLatest fires
                   → derivB updates → combineLatest fires AGAIN
                   
Result: computed runs twice for one source emission!
```

This is essentially because combineLastest is an obserable operator and therefore async. Signals can solve this problem by only running once for each source emission in a synchronous manner.

```typescript
const sourceA$ = new Signal<string>('');
const sourceB$ = new Signal<string>('');

const computed = computed(() => {
    return sourceA() + sourceB();
});
```

Then acting on or modifying our source we can use `computed()` giving us that `map` operator functionality we know from `Rxjs`, but but in a syncrhonous manner. A simpler api offers simpler syntax, also allowing novel Angular users to be productive without the need to understand the complexity of `Rxjs`.


## Signals vs BehaviorSubjects in Practice

Here's some code I recently wrote to show how Signals simplify state management compared to traditional rxjs approaches:

```typescript
export class RegistrationService {

  private _results: WritableSignal<RegistrationsPageSearchViewModel | null> = signal(null);
  results: Signal<RegistrationsPageSearchViewModel | null> = this._results.asReadonly();

  updateResults(results: RegistrationsPageSearchViewModel | null): void {
    this._results.set(results);
  }
}
```

If the `results$` variable was a behaviour subject we would need to have declared it like this:

```typescript
export class RegistrationService {
  private _results = new BehaviorSubject<RegistrationsPageSearchViewModel | null>(null);
  results$ = this._results.asObservable();

  updateResults(results: RegistrationsPageSearchViewModel | null): void {
    this._results.next(results);  // Emit new value through stream
  }
}
```

and read it like this:
```typescript
{{ (results$ | async)?.totalCount }}

// or subscribe

this.results$.subscribe(results => {
  this.results = results;
});

// then handle the tear down

ngOnDestroy(): void {
  this.results$.unsubscribe();
}
```

Where as with the signal we easily read it with:

```typescript
{{ results()?.totalCount }}

// or 

 this.results = this.registrationService.results;
```

Nice with a simplified syntax. :+1:


### Also nicer template syntax:

```typescript
// Signals - no pipe needed
{{ results() }}

// BehaviorSubject - requires async pipe
{{ (results$ | async)?.totalCount }}
```

We see from the above that we need less code to achieve the same results. Nor do we need to manually handle memory management when components are destroyed because as there was no connection to the stream with `subscribe()` . 

So signals are a huge improvement over BehaviorSubjects in many ways.

### To Recap ###

**API Simplicity:**
- **Signals**: `.set()`, `.update()`, direct access with `()`
- **BehaviorSubject**: `.next()`, `.complete()`, requires `| async` pipe
- **Memory-leak Risks** - BehaviorSubjects require manual teardown

**Performance:** 
Although neglible in most cases, signals are more performant than BehaviorSubjects because they only update when the value actually changes and bypass change detection.
- **Signals**: Only updates when value actually changes
- **BehaviorSubject**: Can emit even when value is the same