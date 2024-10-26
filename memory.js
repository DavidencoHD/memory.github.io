const imgs = [
    { name: 'brawl1', src: 'img/brawl1.jpg' },
    { name: 'brawl2', src: 'img/brawl2.jpg' },
    { name: 'brawl3', src: 'img/brawl3.jpg' },
    { name: 'brawl4', src: 'img/brawl4.jpg' },
    { name: 'brawl5', src: 'img/brawl5.jpg' },
    { name: 'brawl6', src: 'img/brawl6.jpg' },
    { name: 'brawl7', src: 'img/brawl7.jpg' },
    { name: 'brawl8', src: 'img/brawl8.jpg' },
    { name: 'brawl9', src: 'img/brawl9.jpg' },
    { name: 'brawl10', src: 'img/brawl10.jpg' },
    { name: 'brawl11', src: 'img/brawl11.jpg' },
    { name: 'brawl12', src: 'img/brawl12.jpg' },
    { name: 'brawl1', src: 'img/brawl1.jpg' },
    { name: 'brawl2', src: 'img/brawl2.jpg' },
    { name: 'brawl3', src: 'img/brawl3.jpg' },
    { name: 'brawl4', src: 'img/brawl4.jpg' },
    { name: 'brawl5', src: 'img/brawl5.jpg' },
    { name: 'brawl6', src: 'img/brawl6.jpg' },
    { name: 'brawl7', src: 'img/brawl7.jpg' },
    { name: 'brawl8', src: 'img/brawl8.jpg' },
    { name: 'brawl9', src: 'img/brawl9.jpg' },
    { name: 'brawl10', src: 'img/brawl10.jpg' },
    { name: 'brawl11', src: 'img/brawl11.jpg' },
    { name: 'brawl12', src: 'img/brawl12.jpg' },
];

// Imatge de fons de les cartes (revers)
const img_back = [{ name: 'back', src: 'img/back2.jpg' }];

let started = false;
let paused = false;
let changeButton = false;

// Elements de pop-up per missatges de guanyador i pausa
const popup_win = document.getElementById('popup_win');
const popupPause = document.getElementById('popup_pause');

// Mostra el pop-up especificat
function showPopup(element) {
    element.style.display = 'block';
}

// Tanca el pop-up especificat
function closePopup(element) {
    element.style.display = 'none';
}

// Mostra el missatge de Game Over
function lose_popup() {
    let popup_lose = document.getElementById('popup_win');
    popup_lose.querySelector('.win').innerHTML = 'Game Over';
    showPopup(popup_lose);
}

// Tanca el pop-up de guanyador
function closePopupWin() {
    popup_win.style.display = 'none';
}

// Genera un nombre aleatori entre dos valors (min i max)
function aleatori(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Genera una disposició aleatòria de les cartes
function aleatori_cartes() {
    let cartes_aleatories = [];
    let copia_imgs = imgs.slice();

    for (let i = 0; i < imgs.length; i++) {
        let index = aleatori(0, copia_imgs.length - 1);
        cartes_aleatories.push(copia_imgs[index]);
        copia_imgs.splice(index, 1);
    }
    return cartes_aleatories;
}

// Array de cartes barrejades
let cartes_aleatories = aleatori_cartes();

// Afegeix les cartes al tauler de joc
function afegir_cartes(cartes_aleatories) {
    let game = document.querySelector('.game');
    
    cartes_aleatories.forEach(carta => {
        let card = document.createElement('div');
        card.classList.add('card');
        card.dataset.image = carta.name;

        let back = document.createElement('div');
        back.classList.add('back');

        let front = document.createElement('div');
        front.classList.add('front');
        front.dataset.name = carta.name;

        card.appendChild(back);
        card.appendChild(front);
        
        back.innerHTML = `<img src="${img_back[0].src}" alt="${img_back[0].name}" name="${img_back[0].name}">`;
        front.innerHTML = `<img src="${carta.src}" alt="${carta.name}" name="${carta.name}">`;

        game.appendChild(card);
    });
}

// Comprova si dues cartes seleccionades coincideixen
function checkForMatch() {
    const flippedCards = document.querySelectorAll('.selected');
    
    if (flippedCards.length === 2) {
        const card1 = flippedCards[0];
        const card2 = flippedCards[1];
        
        if (card1.dataset.image === card2.dataset.image) {
            card1.classList.add('matched');
            card2.classList.add('matched');
            card1.classList.remove('selected');
            card2.classList.remove('selected');
        } else {
            setTimeout(() => {
                card1.classList.remove('selected');
                card2.classList.remove('selected');
            }, 1000);
        }
    }
}

// Comprova si totes les cartes han estat emparellades
function check_all() {
    const cards = document.querySelectorAll('.card');
    let matchedCards = 0;
    
    cards.forEach(card => {
        if (card.classList.contains('matched')) {
            matchedCards++;
        }
        if (matchedCards === cards.length) {
            paused = true;
            setTimeout(() => {
                showPopup(popup_win)
            }, 1000);
        }
    });
}

// Continua el joc despres de la pausa
function continueGame() {
    paused = false;
    popupPause.style.display = 'none';
    if (!timer) {
        startTimer();
    }
}

// Pausa el joc
function pauseGame() {
    stopTimer();
    paused = true;
    showPopup(popupPause);
}

// Canvia el boto d'inici a pausa
function changeButtonRestart() {
    let start = document.querySelector('.start');
    start.classList.add('pause');
    start.classList.remove('start');
    let pause = document.querySelector('.pause');
    pause.innerHTML = 'Pause Game';
    pause.addEventListener('click', pauseGame);
}

// Afegeix un cursor de punter a les cartes
function addCursorPoint() {
    let img = document.querySelectorAll('.back');
    img.forEach(img => {
        img.style.cursor = 'pointer';
    });
}   

// Detecta el clic a les cartes i comprova coincidències
function clickImg() {
    let cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            if (!this.classList.contains('flipped') && !this.classList.contains('matched') && document.querySelectorAll('.selected').length < 2) {
                this.classList.add('selected');
                checkForMatch();
                check_all();
            }
        });
    });
}

// Marca totes les cartes com a emparellades
function matchAll() {
    if (!started) {
        return;
    }
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
            card.classList.add('matched');
    });
    check_all();
}

// Mostra o amaga totes les cartes
function show_all() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (!card.classList.contains('matched') && !card.classList.contains('flipped')) {
            card.classList.add('flipped'); // Voltea la carta    
        } else if(card.classList.contains('flipped')) {
            card.classList.remove('flipped'); // Voltea la carta
        }    
    });

    if (i_button === 0) {
        let showAllButton = document.querySelector('.show_all');
        showAllButton.innerHTML = 'Hide all';
        i_button++;
        
    } else {
        let showAllButton = document.querySelector('.show_all');
        showAllButton.innerHTML = 'Show all';
        i_button = 0;
    }
}

// Evita que el boto quedi enfocat despres de fer clic
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.blur();
    });
});

let timer;
let timeRemaining;
let level;

// Estableix el nivell de dificultat
function setLevel(selectedLevel) {
    level = selectedLevel;

    if (level === 'easy') {
        timeRemaining = 3 * 60; // 3 minutos en segundos
    } else if (level === 'medium') {
        timeRemaining = 2 * 60; // 2 minutos en segundos
    } else if (level === 'hard') {
        timeRemaining = 1 * 60; // 1 minuto en segundos
    } else if (level === 'extreme') {
        timeRemaining = 40; // 40 segundos
    } else if (level === 'impossible') {
        timeRemaining = 20; // 20 segundos
    }

    updateTimerDisplay();
}

// Para el temporitzador
function stopTimer() {
    clearInterval(timer);
    timer = null;
}

// Inicia el temporitzador
function startTimer() {
    if (timer) return;

    timer = setInterval(function() {
        
        if (!paused) {
            timeRemaining--;
            updateTimerDisplay();

            // Si el tiempo llega a 0, se pierde el juego
            if (timeRemaining <= 0) {
                clearInterval(timer);
                paused = true;
                lose_popup(); // Mostrar mensaje de "Game Over"
            }
        }
    }, 1000);
}

// Actualitza el visualitzador del temporitzador
function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Comença ell joc i ho gestiona tot
function startGame() {
    started = true;
    if (!changeButton) {
        changeButton = true;
        changeButtonRestart();
    }
    if (!timeRemaining) {
        setLevel('easy');
    }
    addCursorPoint()
    removeLevelsButtons();
    startTimer();
    clickImg();
    document.getElementById('level-select').disabled = true;
}

// Al començar partida deshabilita el botó dels nivells
function removeLevelsButtons () {
    let buttons = document.querySelectorAll('.level');
    buttons.forEach(button => {
        button.style.display = 'none';
    });
}

// Funcio que gestiona el reseteix del joc
function restartGame() {
    closePopupWin();
    clearInterval(timer); // Detén cualquier temporizador existente
    timer = null; // Asegúrate de que el temporizador está en estado nulo

    started = false; // Reinicia el estado del juego
    paused = false;

    let game = document.querySelector('.game');
    game.innerHTML = ''; // Limpiar el tablero de juego

    setLevel(level); // Reiniciar el temporizador basado en el nivel actual

    cartes_aleatories = aleatori_cartes(); // Crear nuevas cartas
    afegir_cartes(cartes_aleatories); // Añadir las cartas

    startGame(); // Comenzar el juego de nuevo
}

afegir_cartes(cartes_aleatories);
