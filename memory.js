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

const img_back = [{ name: 'back', src: 'img/back2.jpg' }];

let started = false;
let paused = false;
let changeButton = false;
// Pop-up Pausa
const popup_win = document.getElementById('popup_win');
const popupPause = document.getElementById('popup_pause');

function showPopup(element) {
    element.style.display = 'block';
}

function closePopup(element) {
    element.style.display = 'none';
}

function lose_popup() {
    let popup_lose = document.getElementById('popup_win');
    popup_lose.querySelector('.win').innerHTML = 'Game Over';
    showPopup(popup_lose);
}

function closePopupWin() {
    popup_win.style.display = 'none';
}

// Aleatori
function aleatori(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function aleatori_cartes() {
    let cartes_aleatories = [];
    let copia_imgs = imgs.slice(); // Crear una copia de la matriz imgs

    for (let i = 0; i < imgs.length; i++) {
        let index = aleatori(0, copia_imgs.length - 1);
        cartes_aleatories.push(copia_imgs[index]);
        copia_imgs.splice(index, 1); // Eliminar la carta seleccionada de la copia
    }
    return cartes_aleatories;
}

let cartes_aleatories = aleatori_cartes();

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
        
        // Asignar correctamente las imágenes (corregido)
        back.innerHTML = `<img src="${img_back[0].src}" alt="${img_back[0].name}" name="${img_back[0].name}">`;
        front.innerHTML = `<img src="${carta.src}" alt="${carta.name}" name="${carta.name}">`;

        game.appendChild(card);
    });
}

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

function continueGame() {
    popupPause.style.display = 'none';
    paused = false;
}

function pauseGame() {
    showPopup(popupPause);
    paused = true;
}

function changeButtonRestart() {
    let start = document.querySelector('.start');
    start.classList.add('pause');
    start.classList.remove('start');
    let pause = document.querySelector('.pause');
    pause.innerHTML = 'Pause Game';
    pause.addEventListener('click', pauseGame);
}

function addCursorPoint() {
    let img = document.querySelectorAll('.back');
    img.forEach(img => {
        img.style.cursor = 'pointer';
    });
}   

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

let i_button = 0;

function show_all() {
    let i = 0;
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


document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.blur();
    });
});

let timer;
let timeRemaining;
let level;

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

    // Mostrar tiempo restante inicial en minutos:segundos
    updateTimerDisplay();
}

function startTimer() {
    timer = setInterval(function() {
        
        if (!paused)
            timeRemaining--;
            updateTimerDisplay();

            // Si el tiempo llega a 0, se pierde el juego
            if (timeRemaining <= 0) {
                clearInterval(timer);
                paused = true;
                lose_popup(); // Mostrar mensaje de "Game Over"
            }
    }, 1000);
}

function updateTimerDisplay() {
    let minutes = Math.floor(timeRemaining / 60);
    let seconds = timeRemaining % 60;
    document.getElementById('timer').textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

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


function removeLevelsButtons () {
    let buttons = document.querySelectorAll('.level');
    buttons.forEach(button => {
        button.style.display = 'none';
    });
}



function restartGame() {
    closePopupWin(); // Cierra el popup de victoria si está abierto
    clearInterval(timer); // Detén el temporizador si está activo

    // Reiniciar el estado del juego
    started = false; // Reinicia el estado del juego a "no iniciado"
    paused = false; // Reinicia el estado de pausa

    // Limpiar el tablero de juego
    let game = document.querySelector('.game');
    game.innerHTML = ''; // Elimina todas las cartas del tablero

    // Reiniciar el temporizador con el nivel actual
    setLevel(level); // Asegúrate de que esto utiliza la variable 'level'

    // Generar nuevas cartas aleatorias
    cartes_aleatories = aleatori_cartes();
    
    // Agregar las nuevas cartas al tablero
    afegir_cartes(cartes_aleatories);
    
    startGame(); // Inicia el juego nuevamente
}




afegir_cartes(cartes_aleatories);
// buttonsBottom();
