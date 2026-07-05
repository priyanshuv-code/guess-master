const difficulty = document.getElementById("difficulty");
const rangeText = document.getElementById("rangeText");
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");

const message = document.getElementById("message");
const attemptsText = document.getElementById("attempts");
const timerText = document.getElementById("timer");
const bestScoreText = document.getElementById("bestScore");

let max = Number(difficulty.value);
let random;
let attempts;
let timer;
let interval;

startGame();

difficulty.addEventListener("change", () => {
    max = Number(difficulty.value);
    rangeText.innerText = `1 - ${max}`;
    startGame();
});

guessBtn.addEventListener("click", checkGuess);

guessInput.addEventListener("keypress", function(e){
    if(e.key==="Enter"){
        checkGuess();
    }
});

restartBtn.addEventListener("click", startGame);

function startGame(){

    clearInterval(interval);

    random = Math.floor(Math.random()*max)+1;

    attempts = 0;
    timer = 0;

    attemptsText.innerText = attempts;
    timerText.innerText = timer;

    guessInput.value = "";

    message.innerText = "Start Guessing...";
    message.className = "message";

    const best = localStorage.getItem("best"+max);

    bestScoreText.innerText = best ? best : "--";

    interval = setInterval(()=>{
        timer++;
        timerText.innerText = timer;
    },1000);

}

function checkGuess(){

    const guess = Number(guessInput.value);

    if(guessInput.value===""){
        showMessage("Please enter a number","warning");
        return;
    }

    if(guess<1 || guess>max){
        showMessage(`Enter a number between 1 and ${max}`,"warning");
        return;
    }

    attempts++;

    attemptsText.innerText = attempts;

    if(guess===random){

        clearInterval(interval);

        showMessage(`🎉 Correct! Number was ${random}`,"correct");

        let best = localStorage.getItem("best"+max);

        if(best===null || attempts<best){
            localStorage.setItem("best"+max,attempts);
            bestScoreText.innerText = attempts;
        }

        guessBtn.disabled=true;

    }
    else if(guess<random){

        showMessage("⬆ Too Low","wrong");
        shake();

    }
    else{

        showMessage("⬇ Too High","wrong");
        shake();

    }

    guessInput.value="";
    guessInput.focus();

}

function showMessage(text,type){

    message.innerText=text;

    message.className="message";

    message.classList.add(type);

}

function shake(){

    document.querySelector(".card").classList.add("shake");

    setTimeout(()=>{
        document.querySelector(".card").classList.remove("shake");
    },400);

}

restartBtn.addEventListener("click",()=>{

    guessBtn.disabled=false;

});