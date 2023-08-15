import { turkishWords } from "./kelimeler.js";
toastr.options.positionClass = "toast-top-full-width";
const title = document.getElementById("title");
const gameBoard = document.getElementById("game-board");
const mainDiv = document.getElementById("main");
const keyboardContainer = document.getElementById("keyboard-container");
const body = document.body;
let totalGuesses = 6;
let remainingGuesses = totalGuesses;
let playerGuess = [];
let turkishWords4 = [];
let turkishWords5 = [];
let turkishWords8 = [];
let turkishWords11 = [];
let exGuess = [];
exGuess = playerGuess.slice(0);

let answer = [];
for (let i = 0; i < turkishWords.length; i++) {
  if (3 < turkishWords[i].length && turkishWords[i].length < 5) {
    turkishWords4.push(turkishWords[i]);
  }
  if (4 < turkishWords[i].length && turkishWords[i].length < 6) {
    turkishWords5.push(turkishWords[i]);
  }
  if (7 < turkishWords[i].length && turkishWords[i].length < 9) {
    turkishWords8.push(turkishWords[i]);
  }
  if (10 < turkishWords[i].length && turkishWords[i].length < 12) {
    turkishWords11.push(turkishWords[i]);
  }
}

let url_string = window.location.href;
let url = new URL(url_string);
let difficulty = url.searchParams.get("letterCount");
if (difficulty == 4) {
  answer = turkishWords4[Math.floor(Math.random() * turkishWords4.length)];
  console.log(answer);
}
if (difficulty == 5) {
  answer = turkishWords5[Math.floor(Math.random() * turkishWords5.length)];

  console.log(answer);
}
if (difficulty == 8) {
  answer = turkishWords8[Math.floor(Math.random() * turkishWords8.length)];

  console.log(answer);
}
if (difficulty == 11) {
  answer = turkishWords11[Math.floor(Math.random() * turkishWords11.length)];
  console.log(answer);
}

function initGameBoard() {
  for (let i = 0; i < totalGuesses; i++) {
    let letterRow = document.createElement("div");
    letterRow.className = "letter-row";
    gameBoard.appendChild(letterRow);
    for (let j = 0; j < difficulty; j++) {
      let letterBox = document.createElement("div");
      letterBox.className = "letter-box";
      letterRow.appendChild(letterBox);
    }
  }
}
initGameBoard(difficulty);
console.log("answer length : " + answer.length);
const onScreenKeyboard = document.getElementsByClassName("keyboard-box-btn");
const onScreenKeyboardEnter = document.getElementById("keyboard-box-btn-enter");
const onScreenKeyboardDel = document.getElementById("keyboard-box-btn-del");
for (let i = 0; i < onScreenKeyboard.length; i++) {
  onScreenKeyboard[i].addEventListener("click", (e) => {
    let pressedKey = e.target.innerHTML;

    let pressedKeysBoxes = [];
    pressedKeysBoxes = e.target;

    let enter = onScreenKeyboardEnter.innerHTML;
    let del = onScreenKeyboardDel.innerHTML;

    console.log("pressedKeysBoxes: " + pressedKeysBoxes);
    console.log(pressedKey);
    console.log(enter);
    if (remainingGuesses == 0) {
      console.log(1);
      return;
    }
    if (pressedKey === del && playerGuess.length != 0) {
      console.log(2);
      removeLetter(playerGuess);
    }

    if (pressedKey === enter && playerGuess.length === answer.length) {
      console.log(3);
      let row =
        document.getElementsByClassName("letter-row")[6 - remainingGuesses];
      row.classList.add("animate__animated", "animate__bounce");

      console.log(pressedKeysBoxes);
      for (let k = 0; k < onScreenKeyboard.length; ++k) {
        if (
          answer.includes(onScreenKeyboard[k].innerHTML) &&
          playerGuess.includes(onScreenKeyboard[k].innerHTML)
        ) {
          let found = false;
          for (let j = 0; j < answer.length; j++) {
            if (
              answer[j] == onScreenKeyboard[k].innerHTML &&
              playerGuess[j] == onScreenKeyboard[k].innerHTML
            ) {
              found = true;
              onScreenKeyboard[k].classList.add("bg-green");
              if (onScreenKeyboard[k].classList.contains("bg-green")) {
                onScreenKeyboard[k].classList.remove("bg-yellow");
              }
              break;
            }
          }
          if (!found) onScreenKeyboard[k].classList.add("bg-yellow");
        } else if (playerGuess.includes(onScreenKeyboard[k].innerHTML)) {
          onScreenKeyboard[k].classList.add("bg-gray");
        }
      }

      check(remainingGuesses, answer);
    }

    if (pressedKey !== del && pressedKey !== enter) {
      addLetter(pressedKey, remainingGuesses);
    }
  });
}

document.addEventListener("keyup", (event) => {
  let pressedKey = String(event.key);
  let pressedKeysList = [];
  pressedKeysList.push(pressedKey);

  if (remainingGuesses == 0) {
    console.log(1);
    return;
  }
  if (pressedKey === "Backspace" && playerGuess.length != 0) {
    console.log(2);
    removeLetter(playerGuess);
  }
  if (pressedKey === "Enter" && playerGuess.length === answer.length) {
    console.log(3);

    for (let k = 0; k < onScreenKeyboard.length; ++k) {
      if (
        answer.includes(onScreenKeyboard[k].innerHTML) &&
        playerGuess.includes(onScreenKeyboard[k].innerHTML)
      ) {
        let found = false;
        for (let j = 0; j < answer.length; j++) {
          if (
            answer[j] == onScreenKeyboard[k].innerHTML &&
            playerGuess[j] == onScreenKeyboard[k].innerHTML
          ) {
            found = true;
            onScreenKeyboard[k].classList.add(
              "bg-green",
              "animate__animated",
              "animate__heartBeat"
            );
            if (onScreenKeyboard[k].classList.contains("bg-green")) {
              onScreenKeyboard[k].classList.remove("bg-yellow");
            }
            break;
          }
        }
        if (!found)
          onScreenKeyboard[k].classList.add(
            "bg-yellow",
            "animate__animated",
            "animate__heartBeat"
          );
      } else if (playerGuess.includes(onScreenKeyboard[k].innerHTML)) {
        onScreenKeyboard[k].classList.add("bg-gray");
      }
    }
    console.log(onScreenKeyboard);
    check(remainingGuesses, answer);
  }

  let rgx = pressedKey.match(/^[a-zA-ZiıİçÇşŞğĞÜüÖö]*$/gi);
  if (!rgx || event.code == "Backspace" || event.code == "Enter") {
    return;
  } else {
    addLetter(pressedKey, remainingGuesses);
  }
  // if (event.code.startsWith("Key") || event.code == "Quote") {
  //   addLetter(pressedKey, remainingGuesses);
  // }
});

function removeLetter(playerGuess) {
  let row = document.getElementsByClassName("letter-row")[6 - remainingGuesses];
  let box = row.children[playerGuess.length - 1];
  box.classList.remove("filled-box");
  box.textContent = "";
  playerGuess.pop();
  console.log("playerGuess" + playerGuess);
  console.log("removedLetterOrder: " + playerGuess.length);
}

function check(pressedKey) {
  let row = document.getElementsByClassName("letter-row")[6 - remainingGuesses];
  let i;

  for (i = 0; i < answer.length; i++) {
    let box = row.children[i];
    if (answer[i] == playerGuess[i] && playerGuess.length == answer.length) {
      box.classList.add("bg-green");
      row.classList.add("animate__animated", "animate__bounce");

      console.log(5);
      continue;
    }
    let checkLetter = answer[i].localeCompare(playerGuess[i]);
    let checkLetterYellow = answer.includes(playerGuess[i]);

    if (checkLetterYellow && playerGuess.length == answer.length) {
      box.classList.add("bg-yellow");
      console.log(6);
    }
    if (checkLetter !== 0 && playerGuess.length == answer.length) {
      box.classList.add("bg-gray");
      console.log(5);
    }

    if (pressedKey === "Enter") {
      break;
      continue;
    }
  }
  if (playerGuess.length != answer.length) {
    letterAlert();
    return;
  }
  console.log(
    "WORDS includes playerguess ?? :  " +
      turkishWords5.includes(playerGuess.join(""))
  );
  if (!turkishWords.includes(playerGuess.join(""))) {
    toastr.error("Geçerli Bir Kelime Deneyin!");
    exGuess = playerGuess.slice(0);
    playerGuess.splice(0, answer.length);
    remainingGuesses += 1;

    for (let i = 0; i < answer.length; i++) {
      let box = row.children[i];
      box.innerHTML = "";
      box.classList.remove(
        "bg-green",
        "bg-yellow",
        "bg-gray",
        "animate__animated",
        "animate__heartBeat"
      );
      for (let k = 0; k < onScreenKeyboard.length; k++) {
        let onScreenKeyboardInner = onScreenKeyboard[k].innerHTML;
        if (exGuess.includes(onScreenKeyboardInner))
          onScreenKeyboard[k].classList.remove(
            "bg-green",
            "bg-yellow",
            "bg-gray",
            "animate__animated",
            "animate__heartBeat"
          );
        console.log("harf: " + exGuess);
      }
    }
  }

  let checkWord = String(answer).localeCompare(playerGuess.join(""));

  if (checkWord == 0) {
    toastr.success("Tebrikler! Bir Sonraki Kelimeye Geçtiniz.");
    setTimeout(function () {
      location.reload();
    }, 3000);
  }
  if (checkWord != 0) {
    toastr.error("Tekrar Deneyin!");
    remainingGuesses -= 1;
    exGuess = playerGuess.slice(0);
    playerGuess.splice(0, answer.length);
    console.log(playerGuess);
  }
  if (remainingGuesses == 0) {
    gameBoard.style.display = "none";
    keyboardContainer.style.display = "none";
    // title.style.display = "none";
    let scoreDiv = document.createElement("div");
    scoreDiv.className = "score-div";
    scoreDiv.classList.add = "animate__animated animate__rubberBand";
    mainDiv.appendChild(scoreDiv);

    let scoreText = document.createElement("h1");
    scoreText.className = "score-text";
    scoreText.classList.add = "animate__animated animate__rubberBand";
    scoreDiv.appendChild(scoreText);
    scoreText.innerHTML = "Doğru Kelime: " + answer;
  }
}

function addLetter(pressedKey) {
  if (playerGuess.length == difficulty) {
    return;
  }

  pressedKey = pressedKey.toLowerCase();
  let row = document.getElementsByClassName("letter-row")[6 - remainingGuesses];
  let box = row.children[playerGuess.length];

  box.classList.add("filled-box", "animate__animated", "animate__flip");
  box.textContent = pressedKey;
  playerGuess.push(pressedKey);

  console.log("addedLetterOrder: " + playerGuess.length);
  console.log(playerGuess);
}
function letterAlert() {
  // if (playerGuess.length != answer.length) {
  toastr.warning("Eksik Harf Girdiniz!");
  // }
}
