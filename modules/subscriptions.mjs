import {
  puncObserver,
  vowelObserver,
  waldoObserver,
  wordStatObserver,
} from "./observers.mjs";
import * as handlers from "./waldoHandlers.mjs";
const { Subject } = rxjs;

let subject = new Subject();
const wordStatSubscription$ = subject.subscribe(wordStatObserver);
const waldoSubscription$ = subject.subscribe(waldoObserver);
const vowelSubscription$ = subject.subscribe(vowelObserver);
const punctuationSubscription$ = subject.subscribe(puncObserver);

const numListener = handlers.numActionHandler$.subscribe((x) => console.log(x));
const wordStatListener = handlers.textHandler$.subscribe(wordStatSubscription$);
const punctuationListener = handlers.puncHandler$.subscribe(
  punctuationSubscription$
);
const vowelListener = handlers.vowelHandler$.subscribe(vowelSubscription$);
const waldoListener = handlers.waldoHandler$.subscribe(waldoSubscription$);

export {
  numListener,
  wordStatListener,
  punctuationListener,
  vowelListener,
  waldoListener,
  subject,
  wordStatSubscription$,
  waldoSubscription$,
  vowelSubscription$,
  punctuationSubscription$,
};
