// Import the data from the JSON file
import data from "./data.json" assert { type: "json" };

// Get necessary elements
const startBtn = document.querySelector(".start-btn");
const alphabetButtons = document.querySelectorAll(".alphabet-container button");
const timeElement = document.querySelector(".time");
const timeContainer = document.querySelector(".time");
const scoreElement = document.querySelector(".score span");
const inputField = document.querySelector(".inputs");
const Hint = document.querySelector(".hint");
const nextWordBtn = document.querySelector(".next-word");
const formerInput = inputField.innerHTML;

let currentWord = ""; // to store the current word
let score = 0; // to store the score
let timer; // to store the timer

// Function to start the game
function startGame() {
    
    // Start timer
    startTimer(30);

    timeContainer.style.backgroundColor="green";
    // Apply glossy effect to alphabet buttons
    applyGlossyEffect();

    // Choose a random word and update the UI
    chooseRandomWord();

    // Set score to zero
    score = 0;
    updateScore();

}

// Function to start the timer
function startTimer(seconds) {
    let time = seconds;
    timer = setInterval(function () {
        timeElement.textContent = `Time ${time}`;
        time--;

        if (time < 0) {
            endGame();
        }
    }, 1000);
}

// Function to apply glossy effect to alphabet buttons
function applyGlossyEffect() {
    alphabetButtons.forEach(button => {
        button.style.boxShadow = "0 0 5px rgba(255, 255, 255, 0.6), 0 0 10px rgba(255, 255, 255, 0.4), 0 0 15px rgba(255, 255, 255, 0.2)";
    });
}

// Function to update the score
function updateScore() {
    scoreElement.textContent = `Score: ${score}`;
}

// Function to choose a random word and update the UI
function chooseRandomWord() {
    const randomIndex = Math.floor(Math.random() * (data.words.length));
    currentWord = data.words[randomIndex].word;
    const wordLength = currentWord.length;
 Hint.textContent = `Hint: ${data.words[randomIndex].hint}`;

    incorrectLetters=[];
    correctLetters=[];

    // Create input fields based on word length
    let  html = " ";
    inputField.innerHTML=html;
    for (let i=0;i<wordLength;i++){
        html = '<input type="text" class="user-input-game-time">'
        inputField.innerHTML+=html;
    }

}

// Function to end the game
function endGame() {
    clearInterval(timer);

    // Stop glossy effect
    alphabetButtons.forEach(button => {
        button.style.boxShadow = "none";
        button.style.backgroundColor = "aqua";
    });

    // Reset input field
    inputField.innerHTML=formerInput;

    // Display game over or any other message if needed
    timeContainer.style.backgroundColor = "#808080";

    alert("Game Over! Your final score is: " + score);

    Hint.textContent = "Hint...";


}

// Event listeners
startBtn.addEventListener("click", startGame);
nextWordBtn.addEventListener("click", function () {
    chooseRandomWord();
});

let incorrectLetters=[], correctLetters=[];

function handleinputField(e) {
    if(e.match(/^[A-za-z]+$/)&&!incorrectLetters.includes(e))
    {
        if(currentWord.includes(e)) {
            for(let i=0;i<currentWord.length;i++)
            {
                if(currentWord[i]===e)
                {
                    correctLetters.push(e);
                    inputField.querySelectorAll('.user-input-game-time')[i].value=e;
                }
            }
        }
        else{
            incorrectLetters.push(e);
        }
        // Check if the word is complete
        if (correctLetters.length === currentWord.length) {
            // Correct word
            score++;
            updateScore();

            // Display a new word and hint
            chooseRandomWord();
        }
    }
}

alphabetButtons.forEach(button => {
    button.addEventListener("click", function () {
        handleinputField(button.textContent);
    });
});
