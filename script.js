import { WORDS } from "./words.js";
toastr.options.positionClass = "toast-top-full-width";
const gameBoard = document.getElementById("game-board");
let totalGuesses = 6;
let remainingGuesses = totalGuesses;
let playerGuess = [];
let letterOrder = 0;
let answer = WORDS[Math.floor(Math.random() * WORDS.length)];

console.log(answer);

function initGameBoard() {
  for (let i = 0; i < totalGuesses; i++) {
    let letterRow = document.createElement("div");
    letterRow.className = "letter-row";
    gameBoard.appendChild(letterRow);
    for (let j = 0; j < 5; j++) {
      let letterBox = document.createElement("div");
      letterBox.className = "letter-box";
      letterRow.appendChild(letterBox);
    }
  }
}
initGameBoard();
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

    if (pressedKey === enter && playerGuess.length === 5) {
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
          for (let j = 0; j < 5; j++) {
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

      check(remainingGuesses);
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
  if (pressedKey === "Enter") {
    console.log(3);

    for (let k = 0; k < onScreenKeyboard.length; ++k) {
      if (
        answer.includes(onScreenKeyboard[k].innerHTML) &&
        playerGuess.includes(onScreenKeyboard[k].innerHTML)
      ) {
        let found = false;
        for (let j = 0; j < 5; j++) {
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
    check(remainingGuesses);
  }

  if (event.code.startsWith("Key") || event.code == "Quote") {
    addLetter(pressedKey, remainingGuesses);
  }
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
    if (answer[i] == playerGuess[i] && playerGuess.length == 5) {
      box.classList.add("bg-green");
      row.classList.add("animate__animated", "animate__bounce");

      console.log(5);
      continue;
    }
    let checkLetter = answer[i].localeCompare(playerGuess[i]);
    let checkLetterYellow = answer.includes(playerGuess[i]);

    if (checkLetterYellow && playerGuess.length == 5) {
      box.classList.add("bg-yellow");
      console.log(6);
    }
    if (checkLetter !== 0 && playerGuess.length == 5) {
      box.classList.add("bg-gray");
      console.log(5);
    }

    if (pressedKey === "Enter") {
      break;
      continue;
    }
  }
  if (playerGuess.length != 5) {
    letterAlert();
    return;
  }
  console.log(
    "WORDS includes playerguess ?? :  " + WORDS.includes(playerGuess.join(""))
  );
  if (!WORDS.includes(playerGuess.join(""))) {
    toastr.error("Geçerli Bir Kelime Deneyin!");
    playerGuess.slice(0, 5);
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
        onScreenKeyboard[k].classList.remove(
          "bg-green",
          "bg-yellow",
          "bg-gray",
          "animate__animated",
          "animate__heartBeat"
        );
        console.log("asdasd" + onScreenKeyboard[k]);
      }
    }
  }
  // console.log(playerGuess);
  let checkWord = String(answer).localeCompare(playerGuess.join(""));
  // console.log(answer);
  if (checkWord == 0) {
    toastr.success("Tebrikler! Bir Sonraki Kelimeye Geçtiniz.");
    setTimeout(function () {
      location.reload();
    }, 3000);
  } else {
    toastr.error("Tekrar Deneyin!");
    remainingGuesses -= 1;
    playerGuess.splice(0, 5);
    console.log(playerGuess);
  }
}

function addLetter(pressedKey) {
  if (playerGuess.length == 5) {
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
  if (playerGuess.length != 5) {
    toastr.warning("Eksik Harf Girdiniz!");
  }
}
