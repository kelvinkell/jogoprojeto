// Definindo as cartas, agora misturando imagens e definições (por exemplo, 2a com 2b, 3a com 3b)
let cardValues = [
    { image: 'images/2a.png', id: '2a' }, { image: 'images/2b.png', id: '2b' },
    { image: 'images/3a.png', id: '3a' }, { image: 'images/3b.png', id: '3b' },
    { image: 'images/4a.png', id: '4a' }, { image: 'images/4b.png', id: '4b' },
    { image: 'images/5a.png', id: '5a' }, { image: 'images/5b.png', id: '5b' },
    { image: 'images/6a.png', id: '6a' }, { image: 'images/6b.png', id: '6b' },
    { image: 'images/7a.png', id: '7a' }, { image: 'images/7b.png', id: '7b' },
    { image: 'images/8a.png', id: '8a' }, { image: 'images/8b.png', id: '8b' },
    { image: 'images/9a.png', id: '9a' }, { image: 'images/9b.png', id: '9b' }
];

let cardFlipped = [];
let matchedPairs = 0;
let incorrectPairs = 0;
let score = 0;
let gameStarted = false;
let timer;
let timeElapsed = 0;

// Função para embaralhar as cartas
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Função para criar as cartas no tabuleiro
function createCards() {
    const board = document.getElementById('game-board');
    board.innerHTML = ''; // Limpa o tabuleiro

    shuffle(cardValues); // Embaralha as cartas

    cardValues.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.id = card.id; // Armazena o ID da carta para comparar posteriormente

        // Criação da imagem escondida inicialmente
        const img = document.createElement('img');
        img.src = card.image;
        img.style.display = 'none'; // A imagem fica escondida até a carta ser virada
        cardElement.appendChild(img);

        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

// Função para virar as cartas
function flipCard() {
    if (cardFlipped.length < 2 && !this.classList.contains('flipped')) {
        this.classList.add('flipped');
        const img = this.querySelector('img');
        img.style.display = 'block'; // Exibe a imagem ao virar

        cardFlipped.push(this);

        // Se tiver duas cartas viradas, ativa o botão de verificar
        if (cardFlipped.length === 2) {
            document.getElementById('keep-button').disabled = false;
        }
    }
}

// Função para verificar se as cartas viradas são iguais
document.getElementById('keep-button').addEventListener('click', () => {
    const [firstCard, secondCard] = cardFlipped;
    const firstCardId = firstCard.dataset.id;
    const secondCardId = secondCard.dataset.id;

    // Compara se as cartas correspondem (por exemplo, 2a com 2b)
    if (firstCardId.slice(0, -1) === secondCardId.slice(0, -1)) {
        // Acertou
        score++;
        matchedPairs++;
    } else {
        // Errou
        incorrectPairs++;
        setTimeout(() => {
            firstCard.querySelector('img').style.display = 'none';
            secondCard.querySelector('img').style.display = 'none';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 1000);
    }

    updateScore();
    cardFlipped = [];
    document.getElementById('keep-button').disabled = true;
});

// Função para atualizar a pontuação e os erros
function updateScore() {
    document.getElementById('score').textContent = `Pontuação: ${score}`;
    document.getElementById('errors').textContent = `Erros: ${incorrectPairs}`;
}

// Função para iniciar o jogo
document.getElementById('start-button').addEventListener('click', () => {
    if (!gameStarted) {
        const manual = document.getElementById('manual');
        manual.remove();
        gameStarted = true;
        startTimer();
        document.getElementById('start-button').style.display = 'none'; // Esconde o botão
        createCards();
        document.getElementById('keep-button').disabled = true; // Desabilita o botão até virarem 2 cartas
        document.getElementById('revert-button').disabled = false;
    }
});

// Função para iniciar o timer
function startTimer() {
    timer = setInterval(() => {
        timeElapsed++;
        document.getElementById('time').textContent = timeElapsed;
    }, 1000);
}

// Função para reverter as cartas
document.getElementById('revert-button').addEventListener('click', () => {
    if (cardFlipped.length === 2) {
        const [firstCard, secondCard] = cardFlipped;
        setTimeout(() => {
            firstCard.querySelector('img').style.display = 'none';
            secondCard.querySelector('img').style.display = 'none';
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
        }, 500);
        cardFlipped = [];
    }
});

// Função para redirecionar para o jogo de música
document.getElementById('go-to-musica').addEventListener('click', () => {
    window.location.href = "musica.html"; // Redireciona para o arquivo musica.html
});
