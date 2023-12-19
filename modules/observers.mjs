const { Subject } = rxjs;

let state = {};
let store = new Subject();

const puncObserver = {
  next: (pCountDict) => {
    state = { ...state, pCountDict };
    store.next(state);
    console.log(state, "punctuation");

    let temp = Object.fromEntries(
      Object.entries(pCountDict).map(([key, val]) => {
        switch (key) {
          case ".":
            key = "period";
            break;
          case "?":
            key = "question";
            break;
          case "!":
            key = "exclamation";
            break;
          case ",":
            key = "comma";
            break;
        }
        return [key, val];
      })
    );

    console.log(temp, "punc observer temp");
    for (const [key, value] of Object.entries(temp)) {
      let target = document.querySelector(`#${key}`);
      target.innerHTML = value;
    }
  },
  error: (err) => console.error(err),
  complete: () => {
    console.log("Done Subscribing");
  },
};

const waldoObserver = {
  next: (waldoArray) => {
    state = { ...state, waldoArray };
    console.log(waldoArray);
    let target = document.querySelector("#waldoIndexes");
    if (waldoArray == null) {
      target.innerHTML = "";
    } else {
      target.innerHTML = waldoArray;
    }
  },
  error: (err) => console.error(err),
  complete: () => {
    console.log("Done Subscribing");
  },
};

const wordStatObserver = {
  next: (wordStatsDict) => {
    state = { ...state, wordStatsDict };
    console.log(state, "wordstats");

    for (const [key, value] of Object.entries(wordStatsDict)) {
      //   console.log(key, value);
      let target = document.querySelector(`#${key}`);
      target.innerHTML = value;
    }
  },
  error: (err) => console.error(err),
  complete: () => {
    console.log("Done Subscribing");
  },
};

const vowelObserver = {
  next: (vowelDict) => {
    state = { ...state, vowelDict };
    console.log(vowelDict);

    for (const [key, value] of Object.entries(vowelDict)) {
      //   console.log(key, value);
      let target = document.querySelector(`#${key}`);
      target.innerHTML = value;
    }
  },
  error: (err) => console.error(err),
  complete: () => {
    console.log("Done Subscribing");
  },
};

export {
  state,
  wordStatObserver,
  vowelObserver,
  waldoObserver,
  puncObserver,
  store,
};
