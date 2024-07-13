const wordDisplay=document.querySelector(".word-display");
const keyboardDiv=document.querySelector(".keyboard");
const guessesText=document.querySelector(".guesses-text b");
const hangmanImage=document.querySelector(".hangman-box img");
const gameModel=document.querySelector(".game-model");
const playAgainBtn=gameModel.querySelector(".play-again");

//initializing the game variables
let currentWord,correctLetters,wrongGuessCount;
const maxGuesses=6;

const resetGame = () => {
    //resseting all game variables and UI elements
    correctLetters=[];
    wrongGuessCount=0;
    hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;
    wordDisplay.innerHTML=currentWord.split("").map(()=>`<li class="letter"></li>`).join("");
    keyboardDiv.querySelectorAll("button").forEach(btn=>btn.disabled=false);
    gameModel.classList.remove("show");
}

const getRandomWord = () => {
    const { word , hint } = wordList[Math.floor(Math.random() * wordList.length)];//selecting a random word and the hint from the wordlist
    currentWord=word;//making the random word the current word
    console.log(word);
    document.querySelector(".hint-text b").innerText = hint;    
    resetGame();
}

const gameOver = (isVictory) => {
    //after 600ms of game the relevant details are shown
    setTimeout(()=>{
        const modelText = isVictory?`You found the word`:`The correct word is:`;
    gameModel.querySelector("img").src=`images/${isVictory?'win':'loss'}.gif`;
    gameModel.querySelector("h4").innerText=isVictory?'Congrats!':'Game Over!';
    gameModel.querySelector("p").innerHTML=`${modelText}<b>${currentWord}</b>`;
        gameModel.classList.add("show");
    },300);
}

const initGame = (button, clickedLetter) => {
    console.log(button,clickedLetter);
    //checking if the current letter exists in the word
    if(currentWord.includes(clickedLetter)){
        //showing all correct letters on the word-display
        [...currentWord].forEach((letter, index) =>{
            if(letter===clickedLetter){
                correctLetters.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText=letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        });
    }
    else{
        //if letter doesn't exist then update the wrong guess and the hangman image
        wrongGuessCount++;
        hangmanImage.src=`images/hangman-${wrongGuessCount}.svg`;
    }

    button.disabled=true;//disabling the clicked button so that user can't click it again
    guessesText.innerText=`${wrongGuessCount}/${maxGuesses}`;

    //calling the gameover function if the condition meets
    if(wrongGuessCount===maxGuesses) return gameOver(false);
    if(correctLetters.length===currentWord.length)return gameOver(true);
    
}

//creating keyboard buttons and adding event listeners to them
for(let i=97;i<=122;i++){
    const button=document.createElement("button");
    button.innerText=String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e => initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
playAgainBtn.addEventListener("click",getRandomWord);