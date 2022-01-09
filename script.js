//ordens que vão aparecer para clicar
let order = [];
//ordem dos clicks
let clickedOrder = [];
let score = 0;

//cada cor corresponde a um número
// 0 - verde
// 1 - vermelho
// 2 - amarelo
// 3 - azul
const blue = document.querySelector('.blue');
const red = document.querySelector('.red');
const green = document.querySelector('.green');
const yellow = document.querySelector('.yellow');

// Cria ordem aleatória de cores. Vai sortear números entre 0 e 3
let shuffleOrder = () => {
    //variável que guarda um número aleatório a cada rodada. A função Math.floor é para arredondar o nº sorteado.
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for(let i in order) {
        let elementColor = createColorElement(order[i]);
        lightColor(elementColor, Number(i) + 1);
    }
}

//acende a próxima cor.
let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add('selected');
    }, number - 250);
    //acende por um tempo, roda os 250 e tira de novo
    setTimeout(() => {
        element.classList.remove('selected');
    });
}

//variável responsável por comparar se a ordem clicada é exatamente a mesma ordem que o jogo indicou
let checkOrder = () => {
    for(let i in clickedOrder) {
        if(clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    //comparação feita com 2 == porque a comparação não é de mesmo tipo, é de outro array (e não do mesmo array)
    if(clickedOrder.length == order.length) {
        alert(`Pontuação: ${score}\n Você acertou! Iniciando próximo nível`);
        nextLevel();
    }
}

//função para o clique do usuário
let click = (color) => {
    clickedOrder[clickedOrder.length] = color;
    createColorElement(color).classList.add('selected');

    setTimeout(() => {
        createColorElement(color).classList.remove('selected');
        checkOrder();
    },250);    
}

// função que retorna a cor
let createColorElement = (color) => {
    if(color == 0) {
        return green;
    } else if(color == 1) {
        return red;
    } else if(color == 2) {
        return yellow;
    } else if(color == 3) {
        return blue;
    }
}

//função para o próximo nível do jogo
let nextLevel = () => {
    score++;
    shuffleOrder();
}

// quando o jogar perder o jogo
let gameOver = () => {
    alert(`Pontuação: ${score}!\n Você perdeu o jogo!\n Clique em ok para iniciar um novo jogo`);
    order = [];
    clickedOrder = [];

    playGame();
}

let playGame = () => {
    alert('Você está no Gênesis! Iniciando novo jogo!')
    score = 0;

    nextLevel();
}

green.onclick = () => click(0);
red.onclick = () => click(1);
yellow.onclick = () => click(2);
blue.onclick = () => click(3);

playGame();