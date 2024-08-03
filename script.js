const container = document.getElementById('content');
const image = document.getElementById('imgg');
let hintMsg = document.getElementById('hint');
let word = document.getElementById('word');
let buttons = document.querySelectorAll('.btn');
const startNew = document.getElementById('new');
const popUp = document.getElementById('popUp');
const blurBack = document.getElementById('blur');
const message = document.querySelector('#msg');
const emoji = document.getElementById('emoji');
let category = document.querySelectorAll('.cat');
let choose = document.getElementById('category');
let play = document.getElementById('container'); 

let i,z;
let incorrect = 0;
let guess;
let answer;
let displayWord;
let modified;

let genre;
import {Animals, Art, Bollywood, Food, Geography, Literature, Math, Music, Science, Sports, Technology, VideoGames} from "./words.js";
import {getRandomNum} from "./randomNum.js";

category.forEach((b) => {
    b.addEventListener('click', (e) => {
        e.preventDefault();
        genre = e.target.innerHTML;
        choose.style.visibility = 'hidden';
        play.style.visibility = 'visible';
        chooseWord(genre);
    })
})

function chooseWord(c){
    let n = getRandomNum();
    // console.log(n)
    let hint;
    switch (c) {
        case "Animals":
            answer = Animals[n].word;
            hint = Animals[n].hint;
            break;
        case "Art":
            answer = Art[n].word;
            hint = Art[n].hint;
            break;
        case "Bollywood":
            answer = Bollywood[n].word;
            hint = Bollywood[n].hint;
            break;
        case "Food":
            answer = Food[n].word;
            hint = Food[n].hint;
            break;
        case "Geography":
            answer = Geography[n].word;
            hint = Geography[n].hint;
            break;
        case "Literature":
            answer = Literature[n].word;
            hint = Literature[n].hint;
            break;
        case "Math":
            answer = Math[n].word;
            hint = Math[n].hint;
            break;
        case "Music":
            answer = Music[n].word;
            hint = Music[n].hint;
            break;
        case "Science":
            answer = Science[n].word;
            hint = Science[n].hint;
            break;
        case "Sports":
            answer = Sports[n].word;
            hint = Sports[n].hint;
            break;
        case "Technology":
            answer = Technology[n].word;
            hint = Technology[n].hint;
            break;
        case "VideoGames":
            answer = VideoGames[n].word;
            hint = VideoGames[n].hint;
            break;
        default:
            break;
    }
    answer = answer.toUpperCase();
    console.log(answer);
    hintMsg.innerHTML = `<strong>Hint :</strong> ${hint}`;
    hideWord();
}

buttons.forEach((b) => {
    b.addEventListener('click', (e) => {
        e.preventDefault();
        guess = e.target.innerHTML;
        checkGuess(guess);
        buttonClicked(b);
    })
});

function checkGuess(c) {
    if (answer.includes(c)) {
        for (i = 0; i < answer.length; i++) {
            if (answer[i] == c) {
                modified = modified.substring(0, 2 * i) + c + modified.substring(2 * i + 1);
                word.innerHTML = modified;
            }
        }
        if (!modified.includes("_")) {
            gameWon();
        }
    }
    else {
        incorrect++;
        updateImage(incorrect);
        if (incorrect == 6) {
            endGame();
        }
    }
}

function hideWord() {
    //for displayWord...
    displayWord = "";
    for (i = 0; i < answer.length; i++) {
        let ascii = answer[i].charCodeAt(0);
        if((ascii>=65 && ascii<=90)){
            displayWord += "_ ";
        }
        else if(ascii == 32){
            displayWord += "| ";
        }
        else{
            displayWord += `${answer[i]} `;
        }
    }
    word.innerHTML = displayWord;

    modified = displayWord;
}

function buttonClicked(b) {
    b.style.backgroundColor = 'red';
    b.style.boxShadow = 'none';
    b.style.cursor = 'default';
    b.style.color = 'white';
    b.setAttribute('disabled', '');
}

function resetButtons(){
    buttons.forEach((b) => {
        b.style.backgroundColor = 'yellow';
        b.style.cursor = 'pointer';
        b.style.color = 'black';
        b.removeAttribute('disabled');
    });
}

function endGame() {
    play.style.visibility = 'hidden';
    emoji.src = "hangman_images/lost.gif";
    message.innerHTML = `!! HARD LUCK !!<br>The word was <br>'${answer}'`;
    message.style.color = 'red';
    blurBack.style.backgroundColor = 'rgba(255, 198, 198, 0.923)';
    startNew.style.backgroundColor = 'red';
    popUp.style.height = '360px';
    popUp.style.visibility = 'visible';
    blurBack.style.visibility = 'visible';
    startNew.addEventListener('click', (e) => {
        newGame();
    })
}

function gameWon() {
    play.style.visibility = 'hidden';
    emoji.src = "hangman_images/victory.gif";
    message.innerHTML = '!! CONGRATULATIONS !!<br>You Won';
    message.style.color = 'green';
    blurBack.style.backgroundColor = 'rgba(214, 252, 208, 0.903)';
    startNew.style.backgroundColor = 'rgb(7, 209, 44)';
    popUp.style.visibility = 'visible';
    blurBack.style.visibility = 'visible';
    startNew.addEventListener('click', (e) => {
        newGame();
    })
}

function newGame() {
    choose.style.visibility = 'visible';
    play.style.visibility = 'hidden';
    popUp.style.visibility = 'hidden';
    blurBack.style.visibility = 'hidden';
    popUp.style.height = '305px';
    resetButtons();
    z = 0;
    incorrect = 0;
    image.src = "hangman_images/hangman-0.svg";
}

function updateImage(i) {
    if (i == 1) {
        image.src = "hangman_images/hangman-1.svg";
    }
    if (i == 2) {
        image.src = "hangman_images/hangman-2.svg";
    }
    if (i == 3) {
        image.src = "hangman_images/hangman-3.svg";
    }
    if (i == 4) {
        image.src = "hangman_images/hangman-4.svg";
    }
    if (i == 5) {
        image.src = "hangman_images/hangman-5.svg";
    }
    if (i == 6) {
        image.src = "hangman_images/hangman-6.svg";
    }
}