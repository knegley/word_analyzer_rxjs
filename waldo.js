import { store } from "./modules/observers.mjs";

const { Subject, switchMap } = rxjs;
// const textObserver = {
//   next: (results) => console.log(results),
//   error: (err) => console.error(err),
//   complete: () => {
//     console.log("Done Subscribing");
//   },
// };

// let state = {};

// const puncObserver = {
//   next: (pcountDict) => {
//     state = { ...state, pcountDict };
//     console.log(state);
//   },
//   error: (err) => console.error(err),
//   complete: () => {
//     console.log("Done Subscribing");
//   },
// };

// const waldoObserver = {
//   next: (waldoArray) => {
//     state = { ...state, waldoArray };
//     console.log(state);
//   },
//   error: (err) => console.error(err),
//   complete: () => {
//     console.log("Done Subscribing");
//   },
// };

// const wordStatObserver = {
//   next: (wordStatsDict) => {
//     state = { ...state, wordStatsDict };
//     console.log(state);
//   },
//   error: (err) => console.error(err),
//   complete: () => {
//     console.log("Done Subscribing");
//   },
// };

// const vowelObserver = {
//   next: (vowelDict) => {
//     state = { ...state, vowelDict };
//     console.log(state);
//   },
//   error: (err) => console.error(err),
//   complete: () => {
//     console.log("Done Subscribing");
//   },
// };

// let subject = new Subject();
// const wordStatSubscription$ = subject.subscribe(wordStatObserver);
// const waldoSubscription$ = subject.subscribe(waldoObserver);
// const vowelSubscription$ = subject.subscribe(vowelObserver);
// const punctuationSubscription$ = subject.subscribe(puncObserver);

// handlers.numActionHandler$.subscribe((x) => console.log(x));
// handlers.textHandler$.subscribe(wordStatSubscription$);
// handlers.puncHandler$.subscribe(punctuationSubscription$);
// handlers.vowelHandler$.subscribe(vowelSubscription$);
// handlers.waldoHandler$.subscribe(waldoSubscription$);

store.subscribe((response) => console.log(response, "RESPONSE"));
