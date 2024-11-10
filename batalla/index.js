const API_URL = 'https://pokeapi.co/api/v2/pokemon/:id';

// DOM
const box = document.getElementById('box');
const spriteJ = document.getElementById('pokemon-J');
const spriteM = document.getElementById('pokemon-M');
const dialogJ = document.getElementById('span-dialogJ');
const dialogM = document.getElementById('span-dialogM');
const statsBox = document.getElementsByClassName('stats-box');
const nameJ = document.getElementById('name-J');
const nameM = document.getElementById('name-M');
const HPBarJ = document.getElementById('hp-bar__J');
const HPBarM = document.getElementById('hp-bar__M');
const currencyHP = document.getElementById('currency-hp');
const pokemonJList = document.getElementById('pokemonJ-list');
const pokemonMList = document.getElementById('pokemonM-list');
const HP = document.getElementById('hp');
const $volverAlMenu = document.getElementById('volverMenu');
let turno;

// Atributos Personajes
let vidaJ, ataqueJ;
let vidaM, ataqueM;
let idJugador, idMaquina;
let listaPokemones = [];

// Sonido de batalla
const battleSound = new Audio('../batalla/sonido/sonidoBatalla.mp3'); 
battleSound.loop = true; 

$volverAlMenu.addEventListener('click', vovlerMenuPrincipal);
let listButton = document.getElementById('list-button');
listButton.addEventListener('click', cargarEntorno);

quitarMensajePantalla();

function indexarPokemones() {
    for (let i = 1; i <= 155; i++) {
        fetchData(API_URL, i)
            .then(data => {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(data.name));
                option.value = data.id;
                pokemonJList.appendChild(option);
                return data;
            })
            .then(data => {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(data.name));
                pokemonMList.appendChild(option);
            });
    }
}
indexarPokemones();

function fetchData(url, id) {
    return new Promise((resolve, reject) => {
        fetch(url.replace(':id', id))
            .then(response => response.json())
            .then(data => resolve(data));
    });
}

// Comienzo Batalla
function cargarEntorno() {
    idJugador = pokemonJList.value;
    idMaquina = pokemonMList.value;
    turno = 1;
    precargarElementos();
    quitarMensajePantalla();

    // Sonido Batalla
    battleSound.play();

    fetchData(API_URL, idJugador)
        .then(data => {
            nameJ.innerHTML = data.name;
            vidaJ = data.stats[0].base_stat;
            ataqueJ = data.stats[1].base_stat;
            spriteJ.src = data.sprites.back_default;
            currencyHP.innerHTML = vidaJ;
            HP.innerHTML = vidaJ;
            HPBarJ.value = vidaJ;
            HPBarJ.max = vidaJ;
            return fetchData(API_URL, idMaquina);
        })
        .then(data => {
            nameM.innerHTML = data.name;
            vidaM = data.stats[0].base_stat;
            ataqueM = data.stats[1].base_stat;
            spriteM.src = data.sprites.front_default;
            HPBarM.value = vidaM;
            HPBarM.max = vidaM;
        })
        .then(() => setTimeout(dibujarElementos, 200))
        .then(() => batalla())
        .catch(err => console.error(err));
}

// Animacion
function dibujarElementos() {
    spriteJ.classList.remove("hidden");
    spriteM.classList.remove("hidden");

    setTimeout(switchStats, 1000);
    setTimeout(switchStats, 1100);
    setTimeout(switchStats, 1200);
    setTimeout(switchStats, 1300);
    setTimeout(switchStats, 1400);
}

function switchStats() {
    statsBox[0].style.visibility = (statsBox[0].style.visibility === 'visible') ? 'hidden' : 'visible';
    statsBox[1].style.visibility = statsBox[0].style.visibility;
}

// Logica Batalla
function batalla() {
    if (turno === 1) {
        spriteM.addEventListener('click', atacar);
    } else {
        setTimeout(() => atacar(), 2000);
    }
}

function atacar() {
    let dialogoJugador = (turno === 1) ? dialogM : dialogJ;
    
    if (turno === 1) {
        vidaM -= Math.floor(ataqueJ / (Math.ceil((Math.random() * 3) + 1)));
        HPBarM.value = vidaM;
        if (vidaM < 0) vidaM = 0;
        turno = 0;
    } else {
        vidaJ -= Math.floor(ataqueM / (Math.ceil((Math.random() * 3) + 1)));
        HPBarJ.value = vidaJ;
        if (vidaJ < 0) vidaJ = 0;
        HP.innerHTML = vidaJ;
        turno = 1;
    }

    dialogoJugador.innerHTML = '*japish*';
    dialogoJugador.style.marginTop = '0px';
    setTimeout(() => dialogoJugador.innerHTML = '', 500);

    if (vidaJ > 0 && vidaM > 0) {
        batalla();
    } else {
        if (vidaJ <= 0) {
            juegoPerdido();
        } else {
            juegoGanado();
        }
    }
}

// Fin Batalla
function juegoPerdido() {
    precargarElementos();
    agregarMensajePantalla('¡Has perdido!');
    battleSound.pause();
    battleSound.currentTime = 0;
}

function juegoGanado() {
    precargarElementos();
    agregarMensajePantalla('¡Has ganado!');
    battleSound.pause();
    battleSound.currentTime = 0;
}

function precargarElementos() {
    spriteJ.classList.add("hidden");
    spriteM.classList.add("hidden");
}

function agregarMensajePantalla(mensaje) {
    dialogM.innerHTML = mensaje;
    dialogJ.innerHTML = mensaje;
}

function quitarMensajePantalla() {
    dialogJ.innerHTML = "";
    dialogM.innerHTML = "";
}

function vovlerMenuPrincipal() {
    window.location.href = '../inicio/index.html';
}
