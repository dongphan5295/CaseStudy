const cards = document.querySelectorAll('.memory-card');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let timeStart = "";
let matchCount = 0;
let moves = 0;
let modal = document.getElementById('simpleModal');


function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        startTimer();
        return;
    }
    secondCard = this;
    checkForMatch();
    addMove();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();

}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
    matchCount++;
    if (matchCount >= 6) {
        gameOver();
    }
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 800);
}

function gameOver() {
    stopTimer();
    modal.style.display = 'block';
    document.querySelector('.modal-header').style.display = 'block';
    document.querySelector('.modal-body').style.display = 'block';
    document.querySelector('.modal-footer').style.display = 'block';
}



function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
}

function addMove() {
    moves++;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;

}

function resetMoves() {
    moves = 0;
    const movesText = document.querySelector('.moves');
    movesText.innerHTML = moves;

}


let resetGame = true;
let hour = 0;
let minute = 0;
let second = 0;

function startTimer() {
    if (resetGame == true) {
        let timer = 0;
        if (timeStart === "") {
            timeStart = setInterval(() => {
                ++timer;
                second = timer % 60;
                minute = Math.floor(timer / 60);
                if (minute < 10) minute = '0' + minute;
                if (second < 10) second = '0' + second;
                document.querySelector(".timer").innerHTML = minute + ':' + second;
                document.querySelector(".clock").innerHTML = minute + ':' + second;
            }, 1000);
        }
    }
}

function resetTimer() {
    document.querySelector(".timer").innerHTML = '00:00';
    [hour, minute, second] = [0, 0, 0];
}

function stopTimer() {
    clearInterval(timeStart);
    timeStart = '';
}


function restartGame() {
    if (timeStart)
        stopTimer();
    resetTimer();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });

    matchCount = 0;
    resetMoves();
    document.querySelector('.modal-footer').style.display = 'none';
    document.querySelector('.modal-header').style.display = 'none';
    document.querySelector('.modal-body').style.display = 'none';
    shuffle();
}


let resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetPlay, false);


function resetPlay() {
    stopTimer();
    resetTimer();
    resetMoves();
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
}


shuffle();

cards.forEach(card => card.addEventListener('click', flipCard));

