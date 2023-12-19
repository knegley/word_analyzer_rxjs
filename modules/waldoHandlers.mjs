const {
  fromEvent,
  scan,
  map,
  tap,
  of,
  filter,
  pluck,
  Subject,
  distinctUntilChanged,
  switchMap,
} = rxjs;

let numbers = {
  numb: 0,
};

let vowelCount = {
  a: 0,
  e: 0,
  i: 0,
  o: 0,
  u: 0,
};
let wordStats = {
  characters: 0,
  words: 0,
  longestWord: 0,
  shortestWord: 0,
  lastThreeWords: 0,
};

let pCount = {
  ".": 0,
  ",": 0,
  "?": 0,
  "!": 0,
};

let waldoIndexes = [];

const text$ = rxjs.fromEvent(document.querySelector("#waldoTextArea"), "keyup");

// const textObserver = {
//   next: (results) => console.log(results),
//   error: (err) => console.error(err),
//   complete: () => {
//     console.log(initialState);
//     console.log("Done Calculating");
//   },
// };

const actions = {
  NUMBERS: "NUMBERS",
  VOWELS: "VOWELS",
  PUNCTUATION: "PUNCTUATION",
  WORDS: "WORDS",
  WALDO: "WALDO",
};

const handlers = {};

// let subject = new Subject();
// const textSubscription$ = subject.subscribe(textObserver);

handlers[actions.NUMBERS] = (state, action) => ({
  ...state,
  numb: state.numb + action,
});

handlers[actions.PUNCTUATION] = (_state, action) => {
  if (action == null) {
    return pCount;
  }
  let puncSet = new Set(action);
  console.log(action, "punc");
  console.log(puncSet, "puncSet");
  let temp = Object.fromEntries(Array.from(puncSet, (_) => [_, 0]));
  console.log(temp, "punc Temp");
  for (const punc in pCount) {
    if (action.includes(punc)) {
      temp[punc] = [
        ...action.join("").match(new RegExp(`[${punc}]`, "gi")),
      ].length;
    } else {
      temp[punc] = 0;
    }
  }
  return temp;
};

handlers[actions.VOWELS] = (_state, action) => {
  if (action == null) {
    return vowelCount;
  }

  console.log(action, "PIZZA");

  let vowelSet = new Set(action.map((val) => val.toLowerCase()));
  let temp = Object.fromEntries(Array.from(vowelSet, (_) => [_, 0]));
  console.log(temp, "temp");

  console.log(vowelSet);
  console.log(temp);
  for (const char in vowelCount) {
    if (new RegExp(`[${char}]`, "i").test(action)) {
      temp[char] = [
        ...action.join("").match(new RegExp(`[${char}]`, "gi")),
      ].length;
    } else {
      temp[char] = 0;
    }
  }
  // vowelSet.forEach(
  //   (char) =>
  //     (temp[char] = action?.match(new RegExp(`[${char}]`, "g"))?.length ?? 0)
  // );
  console.log(temp);
  return temp;
};

handlers[actions.WALDO] = (_state, action) => {
  if (action == null) {
    console.log("waldo is null");
    return waldoIndexes;
  }

  // let regex = /\bwaldo\b/gi;
  // let waldoIndexesArray = Array.from(
  //   action.matchAll(regex),
  //   ({ index }) => index
  // );
  // console.log(waldoIndexesArray);

  return action;
};

handlers[actions.WORDS] = (state, action) => {
  console.log(action, "wordsACTION");
  if (action == null) {
    return wordStats;
  }
  let lastThreeWords = action?.slice(-3) ?? "None";
  let sortedWords = action?.sort((w1, w2) => w1.length - w2.length) ?? "";
  let shortestWord = sortedWords[0] || "None";
  let longestWord = sortedWords?.at(-1) ?? "None";
  let words = action?.length ?? 0;
  let characters = action?.join("")?.length ?? 0;

  return {
    ...state,
    words,
    characters,
    longestWord,
    shortestWord,
    lastThreeWords,
  };
};

const click$ = fromEvent(document, "click");

const numAction$ = click$.pipe(map(() => 1));

const textEmitter$ = text$.pipe(
  pluck("target", "value"),
  map((str) => {
    console.log(str, "string emitter?");
    console.log(/[A-Za-z]+'?\w*/.test(str));
    if (!/[A-Za-z]+'?\w*/g.test(str)) {
      return null;
    }
    return str.match(/[A-Za-z]+'?\w*/g);
  })
);

const vowelEmitter$ = text$.pipe(
  pluck("target", "value"),
  // filter((str) => /[aeiou]/i.test(str))
  map((str) => {
    if (!/[aioeu]/gi.test(str)) {
      return null;
    }
    console.log(str);
    return [...str.match(/[aioeu]/gi)];
  })
);

const punctuationEmitter$ = text$.pipe(
  pluck("target", "value"),
  map((str) => {
    if (!/[.,?!]/.test(str)) {
      console.log("punct null");
      return null;
    }

    return [...str?.match(/[.,?!]/g)];
  })
);

const waldoEmitter$ = text$.pipe(
  pluck("target", "value"),
  // filter((text) => {
  //   let regex = /\bwaldo\b/i;
  //   return regex.test(text);
  // })
  map((action) => {
    let regex = /\bwaldo\b/gi;
    if (action == null) {
      return null;
    }
    return Array.from(action.matchAll(regex), ({ index }) => index);
  })
);

const numActionHandler$ = numAction$.pipe(
  scan(handlers[actions.NUMBERS], numbers)
);

const waldoHandler$ = waldoEmitter$.pipe(
  scan(handlers[actions.WALDO], waldoIndexes)
  // distinctUntilChanged(
  //   (prev, curr) =>
  //     Array.isArray(prev) &&
  //     Array.isArray(curr) &&
  //     prev.length === curr.length &&
  //     prev.every((value, index) => value === curr[index])
  // )
);

const puncHandler$ = punctuationEmitter$.pipe(
  scan(handlers[actions.PUNCTUATION], pCount)
);
const vowelHandler$ = vowelEmitter$.pipe(
  scan(handlers[actions.VOWELS], vowelCount)
);

const textHandler$ = textEmitter$.pipe(
  scan(handlers[actions.WORDS], wordStats)
);

export {
  numActionHandler$,
  waldoHandler$,
  puncHandler$,
  vowelHandler$,
  textHandler$,
  waldoIndexes,
};
